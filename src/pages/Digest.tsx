import React, { useState, useEffect } from 'react';
import { jobs, Job } from '../data/jobs';
import { colors, spacing, radii } from '../designSystem';
import { calculateMatchScore } from '../utils/scoring';
import { Preferences } from '../types/preferences';
import { Copy, Mail, ExternalLink, Calendar, RefreshCcw, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

import { StatusUpdate } from '../types/status';

export const Digest: React.FC = () => {
    const [digest, setDigest] = useState<Job[]>([]);
    const [prefs, setPrefs] = useState<Preferences | null>(null);
    const [generatedDate, setGeneratedDate] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [statusUpdates, setStatusUpdates] = useState<StatusUpdate[]>([]);

    useEffect(() => {
        // 1. Load Preferences
        const storedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (storedPrefs) {
            setPrefs(JSON.parse(storedPrefs));
        }

        // 2. Check for Today's Digest
        const today = new Date().toISOString().split('T')[0];
        const storedDigest = localStorage.getItem(`jobTrackerDigest_${today}`);

        if (storedDigest) {
            setDigest(JSON.parse(storedDigest));
            setGeneratedDate(today);
        }

        // 3. Load Status Updates
        const updates = localStorage.getItem('kodnest_status_updates');
        if (updates) {
            setStatusUpdates(JSON.parse(updates));
        }
    }, []);

    const generateDigest = () => {
        if (!prefs) return;

        // 1. Score all jobs
        const scoredJobs = jobs.map(job => ({
            ...job,
            score: calculateMatchScore(job, prefs)
        }));

        // 2. Filter & Sort
        // Filter: Must match at least min score? Let's say yes for quality.
        // Spec says "Select top 10 jobs sorted by matchScore desc".
        // It doesn't explicitly say "filter by minMatchScore", but usually digest implies relevance.
        // We will stick to strictly sorting top 10.

        scoredJobs.sort((a, b) => {
            // Primary: Match Score DESC
            if (b.score !== a.score) return b.score - a.score;
            // Secondary: Posted Days Ago ASC (Fresher first)
            return a.postedDaysAgo - b.postedDaysAgo;
        });

        const top10 = scoredJobs.slice(0, 10);

        // Store
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem(`jobTrackerDigest_${today}`, JSON.stringify(top10));

        setDigest(top10);
        setGeneratedDate(today);
    };

    const getDigestText = () => {
        if (!generatedDate) return '';
        let text = `My 9AM Job Digest - ${generatedDate}\n\n`;
        digest.forEach((job, i) => {
            text += `${i + 1}. ${job.title} at ${job.company}\n`;
            text += `   Location: ${job.location} (${job.mode})\n`;
            text += `   Score: ${(job as any).score}/100\n`;
            text += `   Link: ${job.applyUrl}\n\n`;
        });
        return text;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(getDigestText());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleEmail = () => {
        const subject = encodeURIComponent("My 9AM Job Digest");
        const body = encodeURIComponent(getDigestText());
        window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
    };

    if (!prefs) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', gap: spacing.md }}>
                <div style={{ padding: spacing.lg, backgroundColor: '#FEF3C7', borderRadius: '50%', color: '#D97706' }}>
                    <Lock size={48} />
                </div>
                <h2 style={{ fontFamily: 'Georgia, serif', margin: 0, color: colors.text }}>Digest Locked</h2>
                <p style={{ maxWidth: 400, color: 'rgba(17,17,17,0.6)', lineHeight: 1.6 }}>
                    Set your preferences to unlock your personalized daily job digest.
                </p>
                <Link
                    to="/settings"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: colors.accent,
                        color: 'white',
                        borderRadius: radii.pill,
                        textDecoration: 'none',
                        fontWeight: 600,
                        marginTop: spacing.sm
                    }}
                >
                    Configure Preferences
                </Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', paddingBottom: 60 }}>
            {/* Header Area */}
            <div style={{ textAlign: 'center', marginBottom: spacing.xl }}>
                <h1
                    style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: 32,
                        fontWeight: 'normal',
                        color: colors.text,
                        marginBottom: spacing.xs
                    }}
                >
                    Your Daily Digest
                </h1>
                <p style={{ color: 'rgba(17,17,17,0.5)', margin: 0 }}>
                    {generatedDate ? `Generated for ${generatedDate}` : 'Ready to generate'}
                </p>
            </div>

            {!generatedDate ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                        onClick={generateDigest}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: colors.accent,
                            color: 'white',
                            border: 'none',
                            borderRadius: radii.pill,
                            fontSize: 16,
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            boxShadow: '0 4px 12px rgba(139,0,0,0.2)'
                        }}
                    >
                        <RefreshCcw size={18} />
                        Generate Today's 9AM Digest (Simulated)
                    </button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>

                    {/* Actions Toolbar */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: spacing.sm }}>
                        <button
                            onClick={handleCopy}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: 'white',
                                border: '1px solid rgba(17,17,17,0.1)',
                                borderRadius: radii.control,
                                cursor: 'pointer',
                                fontSize: 13,
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                color: copied ? '#059669' : colors.text
                            }}
                        >
                            <Copy size={16} />
                            {copied ? 'Copied!' : 'Copy to Clipboard'}
                        </button>
                        <button
                            onClick={handleEmail}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: 'white',
                                border: '1px solid rgba(17,17,17,0.1)',
                                borderRadius: radii.control,
                                cursor: 'pointer',
                                fontSize: 13,
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                color: colors.text
                            }}
                        >
                            <Mail size={16} />
                            Create Email Draft
                        </button>
                    </div>

                    {/* Email Content Container */}
                    <div
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 12,
                            border: '1px solid rgba(17,17,17,0.08)',
                            overflow: 'hidden',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
                        }}
                    >
                        {/* Email Header */}
                        <div style={{ padding: spacing.lg, borderBottom: '1px solid rgba(17,17,17,0.06)', backgroundColor: '#FAFAFA' }}>
                            <h2 style={{ fontSize: 20, margin: '0 0 4px 0', fontFamily: 'Georgia, serif' }}>
                                Top 10 Jobs For You — 9AM Digest
                            </h2>
                            <div style={{ fontSize: 13, color: 'rgba(17,17,17,0.5)', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Calendar size={13} /> {generatedDate}
                            </div>
                        </div>

                        {/* List */}
                        <div style={{ padding: 0 }}>
                            {digest.length === 0 ? (
                                <div style={{ padding: spacing.xl, textAlign: 'center', color: 'rgba(17,17,17,0.5)' }}>
                                    No jobs matched your criteria today. Try adjusting your preferences.
                                </div>
                            ) : (
                                digest.map((job, index) => {
                                    const score = (job as any).score || 0;
                                    let scoreColor = '#999';
                                    if (score >= 80) scoreColor = '#1F7A1F';
                                    else if (score >= 60) scoreColor = '#D97706';

                                    return (
                                        <div
                                            key={job.id}
                                            style={{
                                                padding: spacing.lg,
                                                borderBottom: index < digest.length - 1 ? '1px solid rgba(17,17,17,0.06)' : 'none',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start',
                                                gap: spacing.md
                                            }}
                                        >
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                                    <span style={{ fontSize: 12, color: 'rgba(17,17,17,0.4)', fontWeight: 500 }}>#{index + 1}</span>
                                                    {score > 0 && (
                                                        <span style={{ fontSize: 11, fontWeight: 700, color: scoreColor, backgroundColor: `${scoreColor}15`, padding: '2px 6px', borderRadius: 4 }}>
                                                            {score}% Match
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: colors.text }}>
                                                    {job.title}
                                                    <span style={{ fontWeight: 400, color: 'rgba(17,17,17,0.6)' }}> at {job.company}</span>
                                                </h3>
                                                <div style={{ fontSize: 14, color: 'rgba(17,17,17,0.6)', marginTop: 4 }}>
                                                    {job.location} • {job.experience} • {job.salaryRange}
                                                </div>
                                            </div>
                                            <a
                                                href={job.applyUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{
                                                    padding: '8px 16px',
                                                    backgroundColor: 'rgba(17,17,17,0.04)',
                                                    borderRadius: radii.control,
                                                    color: colors.text,
                                                    textDecoration: 'none',
                                                    fontSize: 13,
                                                    fontWeight: 500,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 4,
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                Apply <ExternalLink size={14} />
                                            </a>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Status Updates Section */}
                        {statusUpdates.length > 0 && (
                            <div style={{ padding: spacing.lg, borderTop: '1px solid rgba(17,17,17,0.06)', backgroundColor: '#FAFAFA' }}>
                                <h3 style={{ fontSize: 16, margin: '0 0 12px 0', fontFamily: 'Georgia, serif', color: colors.text }}>
                                    Recent Status Updates
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {statusUpdates.slice(0, 5).map((update, i) => (
                                        <div key={i} style={{ fontSize: 13, display: 'flex', justifyContent: 'space-between', color: 'rgba(17,17,17,0.7)' }}>
                                            <span>
                                                <strong style={{ fontWeight: 600 }}>{update.jobTitle}</strong> at {update.company}
                                            </span>
                                            <span style={{
                                                fontWeight: 600,
                                                color: update.status === 'Applied' ? '#0044cc' :
                                                    update.status === 'Selected' ? '#15803d' :
                                                        update.status === 'Rejected' ? '#b91c1c' : colors.text
                                            }}>
                                                {update.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Email Footer */}
                        <div style={{ padding: spacing.lg, backgroundColor: '#FAFAFA', borderTop: '1px solid rgba(17,17,17,0.06)', fontSize: 12, color: 'rgba(17,17,17,0.5)', textAlign: 'center' }}>
                            This digest was generated based on your preferences. <br />
                            <span style={{ fontStyle: 'italic', opacity: 0.7 }}>Demo Mode: Daily 9AM trigger simulated manually.</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
