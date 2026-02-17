import React from 'react';
import { colors, spacing, radii } from '../designSystem';

export const Proof: React.FC = () => {
    return (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
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
                Artifacts & Proof
            </h1>

            <div
                style={{
                    padding: spacing.xl,
                    backgroundColor: '#FFFFFF',
                    border: '1px dashed rgba(17,17,17,0.2)',
                    borderRadius: radii.container,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 200,
                    color: 'rgba(17,17,17,0.5)'
                }}
            >
                <p style={{ margin: 0, fontStyle: 'italic' }}>
                    Artifact collection placeholder. Verification screenshots and logs will be stored here.
                </p>
            </div>
        </div>
    );
};
