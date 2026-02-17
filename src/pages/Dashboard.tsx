import React, { useState, useEffect } from 'react';
import { jobs, Job } from '../data/jobs';
import { JobCard } from '../components/JobCard';
import { JobModal } from '../components/JobModal';
import { colors, spacing, radii } from '../designSystem';
import { Search, SlidersHorizontal, ArrowUpDown, Filter } from 'lucide-react';
import { Preferences } from '../types/preferences';
import { calculateMatchScore, extractSalary } from '../utils/scoring';
import { NavLink } from 'react-router-dom';

// Filter Component
const FilterBar: React.FC<{
    onFilterChange: (filters: any) => void;
}> = ({ onFilterChange }) => {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const [mode, setMode] = useState('');
    const [experience, setExperience] = useState('');
    const [source, setSource] = useState('');
    const [sortBy, setSortBy] = useState('Latest');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            onFilterChange({ keyword, location, mode, experience, source, sortBy });
        }, 300);
        return () => clearTimeout(timer);
    }, [keyword, location, mode, experience, source, sortBy, onFilterChange]);

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

            <div style={{ borderLeft: '1px solid rgba(0,0,0,0.1)', paddingLeft: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <ArrowUpDown size={16} color="rgba(0,0,0,0.5)" />
                <select style={{ ...selectStyle, border: 'none', paddingLeft: 0, fontWeight: 500 }} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="Latest">Latest</option>
                    <option value="Match Score">Match Score</option>
                    <option value="Salary">Salary (High to Low)</option>
                </select>
            </div>
        </div>
    );
};

export const Dashboard: React.FC = () => {
    const [savedIds, setSavedIds] = useState<string[]>(() => {
        const saved = localStorage.getItem('kodnest_saved_jobs');
        return saved ? JSON.parse(saved) : [];
    });

    const [prefs, setPrefs] = useState<Preferences | null>(null);
    const [showOnlyMatches, setShowOnlyMatches] = useState(false);

    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    // State for filtering
    const [activeFilters, setActiveFilters] = useState({
        keyword: '', location: '', mode: '', experience: '', source: '', sortBy: 'Latest'
    });

    // Load preferences
    useEffect(() => {
        const stored = localStorage.getItem('jobTrackerPreferences');
        if (stored) {
            setPrefs(JSON.parse(stored));
        }
    }, []);

    const handleSave = (id: string) => {
        setSavedIds(prev => {
            const newSaved = prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id];
            localStorage.setItem('kodnest_saved_jobs', JSON.stringify(newSaved));
            return newSaved;
        });
    };

    // Derive display list
    let displayJobs = jobs.map(job => {
        // Calculate score if prefs exist
        const score = prefs ? calculateMatchScore(job, prefs) : 0;
        return { ...job, score };
    });

    // 1. Filter by "Show Only Matches"
    if (showOnlyMatches && prefs) {
        displayJobs = displayJobs.filter(j => j.score >= prefs.minMatchScore);
    }

    // 2. Apply Filters (AND logic)
    if (activeFilters.keyword) {
        const k = activeFilters.keyword.toLowerCase();
        displayJobs = displayJobs.filter(j =>
            j.title.toLowerCase().includes(k) ||
            j.company.toLowerCase().includes(k) ||
            j.description.toLowerCase().includes(k)
        );
    }
    if (activeFilters.location) {
        if (activeFilters.location === 'Remote') {
            displayJobs = displayJobs.filter(j => j.location.includes('Remote') || j.mode === 'Remote');
        } else {
            displayJobs = displayJobs.filter(j => j.location.includes(activeFilters.location));
        }
    }
    if (activeFilters.mode) {
        displayJobs = displayJobs.filter(j => j.mode === activeFilters.mode);
    }
    if (activeFilters.experience) {
        displayJobs = displayJobs.filter(j => j.experience === activeFilters.experience);
    }
    if (activeFilters.source) {
        displayJobs = displayJobs.filter(j => j.source === activeFilters.source);
    }

    // 3. Sort
    displayJobs.sort((a, b) => {
        if (activeFilters.sortBy === 'Match Score') {
            return b.score - a.score;
        }
        if (activeFilters.sortBy === 'Salary') {
            return extractSalary(b.salaryRange) - extractSalary(a.salaryRange);
        }
        // Default: Latest
        return a.postedDaysAgo - b.postedDaysAgo;
    });


    return (
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ marginBottom: spacing.md, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
                <div>
                    <h1 style={{ fontFamily: 'Georgia, serif', margin: 0, fontSize: 32, color: colors.text }}>
                        Exploration Dashboard
                    </h1>
                    <span style={{ fontSize: 14, color: 'rgba(17,17,17,0.5)' }}>
                        {displayJobs.length} jobs found
                    </span>
                </div>

                {/* Match Toggle & Preferences Link */}
                <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
                    {prefs ? (
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
                            <div
                                style={{
                                    width: 36,
                                    height: 20,
                                    backgroundColor: showOnlyMatches ? colors.accent : '#ccc',
                                    borderRadius: 20,
                                    position: 'relative',
                                    transition: 'background-color 0.2s'
                                }}
                            >
                                <div
                                    style={{
                                        width: 16,
                                        height: 16,
                                        backgroundColor: 'white',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        top: 2,
                                        left: showOnlyMatches ? 18 : 2,
                                        transition: 'left 0.2s'
                                    }}
                                />
                            </div>
                            <input
                                type="checkbox"
                                checked={showOnlyMatches}
                                onChange={(e) => setShowOnlyMatches(e.target.checked)}
                                style={{ display: 'none' }}
                            />
                            Show only matches ({'>'}{prefs.minMatchScore}%)
                        </label>
                    ) : (
                        <NavLink to="/settings" style={{ fontSize: 14, textDecoration: 'none', color: colors.accent, fontWeight: 500 }}>
                            Set preferences to enable matching →
                        </NavLink>
                    )}
                </div>
            </div>

            {!prefs && (
                <div style={{ padding: spacing.md, backgroundColor: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: radii.container, marginBottom: spacing.lg, color: '#92400E' }}>
                    <strong>Tip:</strong> Set your preferences in the Settings page to activate intelligent matching and scoring.
                </div>
            )}

            <FilterBar onFilterChange={setActiveFilters} />

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                    gap: spacing.lg
                }}
            >
                {displayJobs.map(job => (
                    <JobCard
                        key={job.id}
                        job={job}
                        isSaved={savedIds.includes(job.id)}
                        matchScore={prefs ? job.score : undefined}
                        onSave={handleSave}
                        onView={setSelectedJob}
                    />
                ))}
            </div>

            {displayJobs.length === 0 && (
                <div style={{ padding: 60, textAlign: 'center', color: 'rgba(17,17,17,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                    <Filter size={48} style={{ opacity: 0.2 }} />
                    <div>
                        <h3 style={{ margin: 0, fontSize: 18, color: colors.text }}>No roles match your criteria.</h3>
                        <p style={{ margin: '8px 0 0 0' }}>Adjust filters or lower your match threshold.</p>
                    </div>
                </div>
            )}

            <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
        </div>
    );
};
