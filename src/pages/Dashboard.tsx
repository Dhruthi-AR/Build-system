import React, { useState, useEffect } from 'react';
import { jobs, Job } from '../data/jobs';
import { JobCard } from '../components/JobCard';
import { JobModal } from '../components/JobModal';
import { colors, spacing, radii } from '../designSystem';
import { Search, SlidersHorizontal } from 'lucide-react';

// Filter Component
const FilterBar: React.FC<{
    onFilterChange: (filters: any) => void;
}> = ({ onFilterChange }) => {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const [mode, setMode] = useState('');
    const [experience, setExperience] = useState('');
    const [source, setSource] = useState('');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            onFilterChange({ keyword, location, mode, experience, source });
        }, 300);
        return () => clearTimeout(timer);
    }, [keyword, location, mode, experience, source, onFilterChange]);

    const selectStyle = {
        padding: '8px 12px',
        borderRadius: radii.control,
        border: '1px solid rgba(17,17,17,0.12)',
        fontSize: 14,
        backgroundColor: 'white',
        cursor: 'pointer',
        outline: 'none',
        color: 'rgba(17,17,17,0.8)'
    };

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: spacing.sm,
                padding: spacing.md,
                backgroundColor: '#fff',
                borderRadius: radii.container,
                border: '1px solid rgba(17,17,17,0.08)',
                marginBottom: spacing.lg,
                alignItems: 'center'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 200, position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: 12, color: 'rgba(17,17,17,0.4)' }} />
                <input
                    type="text"
                    placeholder="Search items..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px 12px 10px 40px',
                        borderRadius: radii.control,
                        border: '1px solid rgba(17,17,17,0.2)',
                        fontSize: 14,
                        outline: 'none'
                    }}
                />
            </div>

            <select style={selectStyle} value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="">All Locations</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Chennai">Chennai</option>
                <option value="Remote">Remote</option>
            </select>

            <select style={selectStyle} value={experience} onChange={(e) => setExperience(e.target.value)}>
                <option value="">All Experience</option>
                <option value="Fresher">Fresher</option>
                <option value="0-1 Years">0-1 Years</option>
                <option value="1-3 Years">1-3 Years</option>
                <option value="3-5 Years">3-5 Years</option>
            </select>

            <select style={selectStyle} value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="">All Modes</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Onsite">Onsite</option>
            </select>

            <select style={selectStyle} value={source} onChange={(e) => setSource(e.target.value)}>
                <option value="">All Sources</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Naukri">Naukri</option>
                <option value="Indeed">Indeed</option>
            </select>
        </div>
    );
};

export const Dashboard: React.FC = () => {
    const [savedIds, setSavedIds] = useState<string[]>(() => {
        const saved = localStorage.getItem('kodnest_saved_jobs');
        return saved ? JSON.parse(saved) : [];
    });

    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);

    const handleSave = (id: string) => {
        setSavedIds(prev => {
            const newSaved = prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id];
            localStorage.setItem('kodnest_saved_jobs', JSON.stringify(newSaved));
            return newSaved;
        });
    };

    const handleFilterChange = (filters: any) => {
        let result = [...jobs];

        if (filters.keyword) {
            const k = filters.keyword.toLowerCase();
            result = result.filter(j =>
                j.title.toLowerCase().includes(k) ||
                j.company.toLowerCase().includes(k) ||
                j.description.toLowerCase().includes(k)
            );
        }
        if (filters.location) {
            if (filters.location === 'Remote') {
                // If specifically selecting Remote location, it might overlap with Mode,
                // but user request implies Location dropdown.
                // Our "Remote" job location logic: sometimes location is listed as Remote.
                result = result.filter(j => j.location.includes('Remote') || j.mode === 'Remote');
            } else {
                result = result.filter(j => j.location.includes(filters.location));
            }
        }
        if (filters.mode) {
            result = result.filter(j => j.mode === filters.mode);
        }
        if (filters.experience) {
            result = result.filter(j => j.experience === filters.experience);
        }
        if (filters.source) {
            result = result.filter(j => j.source === filters.source);
        }

        setFilteredJobs(result);
    };

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ marginBottom: spacing.md, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <h1 style={{ fontFamily: 'Georgia, serif', margin: 0, fontSize: 32, color: colors.text }}>
                    Exploration Dashboard
                </h1>
                <span style={{ fontSize: 14, color: 'rgba(17,17,17,0.5)' }}>
                    {filteredJobs.length} jobs found
                </span>
            </div>

            <FilterBar onFilterChange={handleFilterChange} />

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                    gap: spacing.lg
                }}
            >
                {filteredJobs.map(job => (
                    <JobCard
                        key={job.id}
                        job={job}
                        isSaved={savedIds.includes(job.id)}
                        onSave={handleSave}
                        onView={setSelectedJob}
                    />
                ))}
            </div>

            {filteredJobs.length === 0 && (
                <div style={{ padding: 40, textAlign: 'center', color: 'rgba(17,17,17,0.4)' }}>
                    No jobs match your filters. Try adjusting them.
                </div>
            )}

            <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
        </div>
    );
};
