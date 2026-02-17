import React, { useState } from 'react';
import { Job } from '../data/jobs';
import { colors, spacing, radii } from '../designSystem';
import { Bookmark, BookmarkCheck, ExternalLink, Eye, MapPin, Building2, Clock } from 'lucide-react';

import { JobStatus } from '../types/status';

interface JobCardProps {
    job: Job;
    isSaved: boolean;
    matchScore?: number;
    status: JobStatus;
    onSave: (id: string) => void;
    onView: (job: Job) => void;
    onStatusChange: (id: string, status: JobStatus) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, isSaved, matchScore, status, onSave, onView, onStatusChange }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Determine score color
    let scoreColor = '#999999';
    if (matchScore !== undefined) {
        if (matchScore >= 80) scoreColor = '#1F7A1F'; // Green
        else if (matchScore >= 60) scoreColor = '#D97706'; // Amber
        else if (matchScore >= 40) scoreColor = '#4B5563'; // Neutral
        else scoreColor = '#9CA3AF'; // Grey
    }

    return (
        <div
            style={{
                backgroundColor: '#FFFFFF',
                borderRadius: radii.container,
                padding: spacing.md,
                border: '1px solid rgba(17,17,17,0.08)',
                boxShadow: isHovered
                    ? '0 8px 16px rgba(0,0,0,0.06)'
                    : '0 2px 4px rgba(0,0,0,0.02)',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.sm,
                position: 'relative'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: colors.text }}>
                        {job.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs, marginTop: 4, color: 'rgba(17,17,17,0.6)', fontSize: 14 }}>
                        <Building2 size={14} />
                        <span>{job.company}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {matchScore !== undefined && matchScore > 0 && (
                        <div
                            style={{
                                padding: '2px 8px',
                                borderRadius: radii.pill,
                                backgroundColor: scoreColor,
                                color: 'white',
                                fontSize: 12,
                                fontWeight: 700
                            }}
                        >
                            {matchScore}%
                        </div>
                    )}
                    <div
                        style={{
                            fontSize: 12,
                            color: 'rgba(17,17,17,0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4
                        }}
                    >
                        <Clock size={12} />
                        {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo}d ago`}
                    </div>
                </div>
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.xs, marginTop: 4 }}>
                <Badge icon={<MapPin size={12} />} text={`${job.location} (${job.mode})`} />
                <Badge text={job.experience} />
                <Badge text={job.salaryRange} tone="green" />
                <Badge text={job.source} tone="blue" />
            </div>

            {/* Description Preview (Optional) */}
            <p
                style={{
                    margin: 0,
                    fontSize: 14,
                    color: 'rgba(17,17,17,0.7)',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}
            >
                {job.description}
            </p>

            {/* Footer Actions */}
            <div style={{ marginTop: 'auto', paddingTop: spacing.sm, display: 'flex', gap: spacing.sm, alignItems: 'center' }}>
                <select
                    value={status}
                    onChange={(e) => onStatusChange(job.id, e.target.value as JobStatus)}
                    style={{
                        padding: '6px 8px',
                        borderRadius: 4,
                        border: '1px solid rgba(17,17,17,0.2)',
                        backgroundColor: status === 'Not Applied' ? 'white' :
                            status === 'Applied' ? '#EBF8FF' :
                                status === 'Selected' ? '#F0FDF4' : '#FEF2F2',
                        color: status === 'Not Applied' ? colors.text :
                            status === 'Applied' ? '#0044cc' :
                                status === 'Selected' ? '#15803d' : '#b91c1c',
                        fontSize: 12,
                        fontWeight: 600,
                        outline: 'none',
                        cursor: 'pointer'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <option value="Not Applied">Not Applied</option>
                    <option value="Applied">Applied</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                </select>

                <Button
                    variant="secondary"
                    onClick={() => onView(job)}
                    icon={<Eye size={16} />}
                >
                    View
                </Button>
                <Button
                    variant={isSaved ? "primary" : "secondary"} // Visual toggle
                    onClick={(e) => {
                        e.stopPropagation();
                        onSave(job.id);
                    }}
                    icon={isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                    style={isSaved ? { backgroundColor: colors.accent, borderColor: colors.accent, color: '#fff' } : {}}
                >
                    {isSaved ? 'Saved' : 'Save'}
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => {
                        if (status === 'Not Applied') onStatusChange(job.id, 'Applied');
                        window.open(job.applyUrl, '_blank');
                    }}
                    icon={<ExternalLink size={16} />}
                    style={{ marginLeft: 'auto' }}
                >
                    Apply
                </Button>
            </div>
        </div>
    );
};

// Helper Components

const Badge: React.FC<{ text: string; icon?: React.ReactNode; tone?: 'default' | 'green' | 'blue' }> = ({ text, icon, tone = 'default' }) => {
    let bg = 'rgba(17,17,17,0.04)';
    let color = 'rgba(17,17,17,0.7)';

    if (tone === 'green') {
        bg = 'rgba(76, 107, 79, 0.1)';
        color = '#2e5c35';
    } else if (tone === 'blue') {
        bg = 'rgba(0, 85, 255, 0.06)';
        color = '#0044cc';
    }

    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 8px',
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 500,
                backgroundColor: bg,
                color: color
            }}
        >
            {icon}
            {text}
        </span>
    );
};

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary', icon?: React.ReactNode }> = ({ children, variant = 'secondary', icon, style, ...props }) => {
    return (
        <button
            {...props}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 4,
                border: '1px solid',
                borderColor: variant === 'primary' ? 'transparent' : 'rgba(17,17,17,0.2)',
                backgroundColor: variant === 'primary' ? colors.accent : 'transparent',
                color: variant === 'primary' ? '#fff' : colors.text,
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.1s',
                ...style
            }}
            onMouseEnter={(e) => {
                if (variant === 'secondary') {
                    e.currentTarget.style.backgroundColor = 'rgba(17,17,17,0.03)';
                }
            }}
            onMouseLeave={(e) => {
                if (variant === 'secondary') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                }
            }}
        >
            {icon}
            {children}
        </button>
    );
};
