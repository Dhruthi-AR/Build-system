import React from 'react';
import { colors, spacing, radii } from '../designSystem';

export const Dashboard: React.FC = () => {
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
                    marginBottom: spacing.sm
                }}
            >
                {/* Simple placeholder icon */}
                <div style={{ width: 24, height: 2, backgroundColor: 'currentColor', transform: 'rotate(45deg)' }} />
                <div style={{ width: 24, height: 2, backgroundColor: 'currentColor', transform: 'rotate(-45deg)', marginLeft: -24 }} />
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
                No jobs yet.
            </h2>
            <p style={{ margin: 0, maxWidth: 400, lineHeight: 1.5 }}>
                In the next step, you will load a realistic dataset.
            </p>
        </div>
    );
};
