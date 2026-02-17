import React from 'react';
import { Job } from '../data/jobs';
import { colors, spacing, radii } from '../designSystem';
import { X, ExternalLink, MapPin, Building2, Calendar, Briefcase, Wallet, Globe } from 'lucide-react';

interface JobModalProps {
    job: Job | null;
    onClose: () => void;
}

export const JobModal: React.FC<JobModalProps> = ({ job, onClose }) => {
    if (!job) return null;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(2px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 50,
                padding: spacing.md
            }}
            onClick={onClose}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: 600,
                    maxHeight: '85vh',
                    backgroundColor: '#FFFFFF',
                    borderRadius: radii.container,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    animation: 'fadeIn 0.2s ease-out'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    style={{
                        padding: spacing.lg,
                        borderBottom: '1px solid rgba(17,17,17,0.08)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        backgroundColor: '#FAFAFA'
                    }}
                >
                    <div>
                        <h2 style={{ margin: 0, fontSize: 24, fontFamily: 'Georgia, serif', color: colors.text }}>
                            {job.title}
                        </h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, marginTop: 8, color: 'rgba(17,17,17,0.7)', fontSize: 15 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Building2 size={16} /> {job.company}</span>
                            <span>•</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={16} /> {job.location} ({job.mode})</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'rgba(17,17,17,0.5)',
                            padding: 4
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content Scrollable */}
                <div style={{ padding: spacing.lg, overflowY: 'auto' }}>

                    {/* Key Details Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.md, marginBottom: spacing.lg }}>
                        <DetailItem icon={<Briefcase size={18} />} label="Experience" value={job.experience} />
                        <DetailItem icon={<Wallet size={18} />} label="Salary" value={job.salaryRange} />
                        <DetailItem icon={<Globe size={18} />} label="Source" value={job.source} />
                        <DetailItem icon={<Calendar size={18} />} label="Posted" value={job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo} days ago`} />
                    </div>

                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: spacing.xs }}>Description</h3>
                    <p style={{ lineHeight: 1.6, color: 'rgba(17,17,17,0.8)', marginTop: 0, whiteSpace: 'pre-wrap' }}>
                        {job.description}
                    </p>

                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: spacing.xs, marginTop: spacing.md }}>Skills</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {job.skills.map(skill => (
                            <span
                                key={skill}
                                style={{
                                    padding: '4px 10px',
                                    backgroundColor: 'rgba(17,17,17,0.05)',
                                    borderRadius: 16,
                                    fontSize: 13,
                                    fontWeight: 500
                                }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div
                    style={{
                        padding: spacing.md,
                        borderTop: '1px solid rgba(17,17,17,0.08)',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: spacing.sm,
                        backgroundColor: '#FAFAFA'
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            padding: '10px 20px',
                            borderRadius: radii.control,
                            border: '1px solid rgba(17,17,17,0.2)',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            fontWeight: 500
                        }}
                    >
                        Close
                    </button>
                    <button
                        onClick={() => window.open(job.applyUrl, '_blank')}
                        style={{
                            padding: '10px 24px',
                            borderRadius: radii.control,
                            border: 'none',
                            backgroundColor: colors.accent,
                            color: 'white',
                            cursor: 'pointer',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            boxShadow: '0 2px 8px rgba(139,0,0,0.3)'
                        }}
                    >
                        Apply on {job.source} <ExternalLink size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ color: 'rgba(17,17,17,0.4)' }}>{icon}</div>
        <div>
            <div style={{ fontSize: 12, color: 'rgba(17,17,17,0.5)', fontWeight: 500 }}>{label}</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: colors.text }}>{value}</div>
        </div>
    </div>
);
