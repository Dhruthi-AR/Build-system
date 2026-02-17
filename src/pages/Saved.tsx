import React, { useState, useEffect } from 'react';
import { jobs, Job } from '../data/jobs';
import { JobCard } from '../components/JobCard';
import { JobModal } from '../components/JobModal';
import { colors, spacing } from '../designSystem';

import { JobStatus } from '../types/status';

export const Saved: React.FC = () => {
    const [savedIds, setSavedIds] = useState<string[]>([]);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [jobStatuses, setJobStatuses] = useState<Record<string, JobStatus>>(() => {
        const stored = localStorage.getItem('kodnest_job_statuses');
        return stored ? JSON.parse(stored) : {};
    });

    useEffect(() => {
        const saved = localStorage.getItem('kodnest_saved_jobs');
        if (saved) {
            setSavedIds(JSON.parse(saved));
        }
    }, []);

    const savedJobs = jobs.filter(job => savedIds.includes(job.id));

    const handleSave = (id: string) => {
        setSavedIds(prev => {
            const newSaved = prev.filter(item => item !== id); // Only removing makes sense here
            localStorage.setItem('kodnest_saved_jobs', JSON.stringify(newSaved));
            return newSaved;
        });
    };

    const handleStatusChange = (id: string, newStatus: JobStatus) => {
        setJobStatuses(prev => {
            const updated = { ...prev, [id]: newStatus };
            localStorage.setItem('kodnest_job_statuses', JSON.stringify(updated));
            return updated;
        });
    };

    if (savedJobs.length === 0) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '50vh',
                    gap: spacing.md,
                    textAlign: 'center',
                    color: 'rgba(17,17,17,0.6)'
                }}
            >
                <div
                    style={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(17,17,17,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: spacing.sm,
                        fontSize: 24,
                        color: 'rgba(17,17,17,0.3)'
                    }}
                >
                    ★
                </div>
                <h2
                    style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontSize: 24,
                        fontWeight: 'normal',
                        color: colors.text,
                        margin: 0
                    }}
                >
                    No saved jobs yet.
                </h2>
                <p style={{ margin: 0, maxWidth: 400, lineHeight: 1.5 }}>
                    Bookmark interesting opportunities from the Dashboard to view them here.
                </p>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h1
                style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: 32,
                    fontWeight: 'normal',
                    color: colors.text,
                    marginBottom: spacing.lg,
                    borderBottom: '1px solid rgba(17,17,17,0.08)',
                    paddingBottom: spacing.md
                }}
            >
                Saved Opportunities
            </h1>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                    gap: spacing.lg
                }}
            >
                {savedJobs.map(job => (
                    <JobCard
                        key={job.id}
                        job={job}
                        isSaved={true} // Always active here
                        status={jobStatuses[job.id] || 'Not Applied'}
                        onSave={handleSave}
                        onView={setSelectedJob}
                        onStatusChange={handleStatusChange}
                    />
                ))}
            </div>

            <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
        </div>
    );
};
