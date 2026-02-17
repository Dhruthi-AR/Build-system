import React from 'react';
import { colors, spacing } from '../designSystem';

export const Saved: React.FC = () => {
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
                Your Shortlist
            </h2>
            <p style={{ margin: 0, maxWidth: 400, lineHeight: 1.5 }}>
                Jobs you save from your daily digest will appear here for review.
            </p>
        </div>
    );
};
