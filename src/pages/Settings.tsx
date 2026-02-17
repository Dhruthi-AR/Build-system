import React, { useState, useEffect } from 'react';
import { colors, spacing, radii } from '../designSystem';
import { Preferences, defaultPreferences } from '../types/preferences';
import { Save } from 'lucide-react';

const InputField: React.FC<{
    label: string;
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    helperText?: string;
}> = ({ label, value, onChange, placeholder, helperText }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
        <label style={{ fontSize: 13, fontWeight: 500, color: 'rgba(17,17,17,0.8)' }}>{label}</label>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{
                padding: spacing.sm,
                borderRadius: radii.control,
                border: '1px solid rgba(17,17,17,0.12)',
                backgroundColor: '#FFFFFF',
                fontSize: 14,
                outline: 'none',
                color: colors.text
            }}
        />
        {helperText && <span style={{ fontSize: 11, color: 'rgba(17,17,17,0.5)' }}>{helperText}</span>}
    </div>
);

const SelectField: React.FC<{
    label: string;
    value: string;
    onChange: (val: string) => void;
    options: string[];
}> = ({ label, value, onChange, options }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
        <label style={{ fontSize: 13, fontWeight: 500, color: 'rgba(17,17,17,0.8)' }}>{label}</label>
        <div style={{ position: 'relative' }}>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    width: '100%',
                    padding: spacing.sm,
                    paddingRight: spacing.xl,
                    borderRadius: radii.control,
                    border: '1px solid rgba(17,17,17,0.12)',
                    backgroundColor: '#FFFFFF',
                    fontSize: 14,
                    outline: 'none',
                    color: colors.text,
                    appearance: 'none',
                    cursor: 'pointer'
                }}
            >
                <option value="">Select...</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <div
                style={{
                    position: 'absolute',
                    right: spacing.sm,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: 'rgba(17,17,17,0.4)',
                    fontSize: 10
                }}
            >
                ▼
            </div>
        </div>
    </div>
);

const MultiSelect: React.FC<{
    label: string;
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
}> = ({ label, options, selected, onChange }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: 'rgba(17,17,17,0.8)' }}>{label}</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {options.map(opt => {
                    const isSelected = selected.includes(opt);
                    return (
                        <button
                            key={opt}
                            onClick={() => {
                                if (isSelected) onChange(selected.filter(s => s !== opt));
                                else onChange([...selected, opt]);
                            }}
                            style={{
                                padding: '6px 12px',
                                borderRadius: radii.pill,
                                border: `1px solid ${isSelected ? colors.accent : 'rgba(17,17,17,0.2)'}`,
                                backgroundColor: isSelected ? 'rgba(139,0,0,0.08)' : 'transparent',
                                color: isSelected ? colors.accent : colors.text,
                                fontSize: 13,
                                cursor: 'pointer'
                            }}
                        >
                            {opt}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

const CheckboxGroup: React.FC<{
    label: string;
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
}> = ({ label, options, selected, onChange }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
        <label style={{ fontSize: 13, fontWeight: 500, color: 'rgba(17,17,17,0.8)' }}>{label}</label>
        <div style={{ display: 'flex', gap: spacing.md }}>
            {options.map(opt => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
                    <input
                        type="checkbox"
                        checked={selected.includes(opt)}
                        onChange={(e) => {
                            if (e.target.checked) onChange([...selected, opt]);
                            else onChange(selected.filter(s => s !== opt));
                        }}
                        style={{ accentColor: colors.accent }}
                    />
                    {opt}
                </label>
            ))}
        </div>
    </div>
);


export const Settings: React.FC = () => {
    const [prefs, setPrefs] = useState<Preferences>(defaultPreferences);
    const [savedMessage, setSavedMessage] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('jobTrackerPreferences');
        if (stored) {
            setPrefs(JSON.parse(stored));
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(prefs));
        setSavedMessage('Preferences saved successfully!');
        setTimeout(() => setSavedMessage(''), 3000);
    };

    return (
        <div style={{ maxWidth: 640, margin: '0 auto', paddingBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg, borderBottom: '1px solid rgba(17,17,17,0.08)', paddingBottom: spacing.md }}>
                <h1
                    style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: 32,
                        fontWeight: 'normal',
                        color: colors.text,
                        margin: 0
                    }}
                >
                    Tracking Preferences
                </h1>
                <button
                    onClick={handleSave}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: colors.accent,
                        color: 'white',
                        border: 'none',
                        borderRadius: radii.control,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6
                    }}
                >
                    <Save size={16} /> Save Changes
                </button>
            </div>

            {savedMessage && (
                <div style={{ padding: spacing.sm, backgroundColor: '#E6F4EA', color: '#1E4620', borderRadius: radii.control, marginBottom: spacing.md, textAlign: 'center' }}>
                    {savedMessage}
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>

                <section>
                    <h3 style={{ fontSize: 16, borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: 8, marginBottom: 16 }}>Core Criteria</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
                        <InputField
                            label="Role Keywords"
                            value={prefs.roleKeywords.join(', ')}
                            onChange={(val) => setPrefs({ ...prefs, roleKeywords: val.split(',').map(s => s.trim()) })}
                            placeholder="e.g. Frontend, React, Data Scientist"
                            helperText="+25 match score for Title match, +15 for Description match"
                        />

                        <MultiSelect
                            label="Preferred Locations"
                            selected={prefs.preferredLocations}
                            options={['Bangalore', 'Hyderabad', 'Pune', 'Gurgaon', 'Mumbai', 'Chennai', 'Remote']}
                            onChange={(val) => setPrefs({ ...prefs, preferredLocations: val })}
                        />

                        <CheckboxGroup
                            label="Work Mode"
                            options={['Remote', 'Hybrid', 'Onsite']}
                            selected={prefs.preferredModes}
                            onChange={(val) => setPrefs({ ...prefs, preferredModes: val })}
                        />
                    </div>
                </section>

                <section>
                    <h3 style={{ fontSize: 16, borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: 8, marginBottom: 16 }}>Targeting</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
                        <SelectField
                            label="Experience Level"
                            value={prefs.experienceLevel}
                            options={['Fresher', '0-1 Years', '1-3 Years', '3-5 Years']}
                            onChange={(val) => setPrefs({ ...prefs, experienceLevel: val })}
                        />
                        <InputField
                            label="Skills"
                            value={prefs.skills.join(', ')}
                            onChange={(val) => setPrefs({ ...prefs, skills: val.split(',').map(s => s.trim()) })}
                            placeholder="e.g. React, Python, AWS"
                            helperText="+15 match score for overlap"
                        />
                    </div>
                </section>

                <section>
                    <h3 style={{ fontSize: 16, borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: 8, marginBottom: 16 }}>Threshold</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
                        <label style={{ fontSize: 13, fontWeight: 500, color: 'rgba(17,17,17,0.8)', display: 'flex', justifyContent: 'space-between' }}>
                            Minimum Match Score
                            <span style={{ fontWeight: 700, color: colors.accent }}>{prefs.minMatchScore}%</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={prefs.minMatchScore}
                            onChange={(e) => setPrefs({ ...prefs, minMatchScore: parseInt(e.target.value) })}
                            style={{ accentColor: colors.accent, width: '100%', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: 11, color: 'rgba(17,17,17,0.5)' }}>Jobs below this score can be hidden on the dashboard.</span>
                    </div>
                </section>

            </div>
        </div>
    );
};
