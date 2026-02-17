import React from 'react';
import { colors, spacing, radii } from '../designSystem';

const InputField: React.FC<{ label: string; placeholder?: string }> = ({ label, placeholder }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
        <label style={{ fontSize: 13, fontWeight: 500, color: 'rgba(17,17,17,0.8)' }}>{label}</label>
        <input
            type="text"
            placeholder={placeholder}
            readOnly
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
    </div>
);

const SelectField: React.FC<{ label: string; options: string[] }> = ({ label, options }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
        <label style={{ fontSize: 13, fontWeight: 500, color: 'rgba(17,17,17,0.8)' }}>{label}</label>
        <div style={{ position: 'relative' }}>
            <select
                readOnly
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
                {options.map(opt => <option key={opt}>{opt}</option>)}
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

export const Settings: React.FC = () => {
    return (
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
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
                Tracking Preferences
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
                <InputField
                    label="Role Keywords"
                    placeholder="e.g. Senior Frontend Engineer, React Developer"
                />

                <InputField
                    label="Preferred Locations"
                    placeholder="e.g. San Francisco, New York, London"
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.md }}>
                    <SelectField
                        label="Work Mode"
                        options={['Remote', 'Hybrid', 'Onsite']}
                    />
                    <SelectField
                        label="Experience Level"
                        options={['Mid-Senior', 'Entry', 'Executive']}
                    />
                </div>

                <div style={{ marginTop: spacing.md, padding: spacing.md, backgroundColor: 'rgba(17,17,17,0.03)', borderRadius: radii.container }}>
                    <p style={{ fontSize: 13, color: 'rgba(17,17,17,0.6)', margin: 0, lineHeight: 1.5 }}>
                        These settings will control your daily notification feed. Logic will be implemented in future steps.
                    </p>
                </div>
            </div>
        </div>
    );
};
