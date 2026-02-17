import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { colors, spacing, radii } from '../designSystem';

export const Landing: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                gap: spacing.lg,
                textAlign: 'center',
                padding: spacing.xl
            }}
        >
            <h1
                style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: 56,
                    fontWeight: 'normal',
                    color: colors.text,
                    marginBottom: spacing.xs,
                    maxWidth: 800,
                    lineHeight: 1.1
                }}
            >
                Stop Missing The Right Jobs.
            </h1>
            <p
                style={{
                    fontSize: 20,
                    color: 'rgba(17,17,17,0.7)',
                    maxWidth: 600,
                    marginBottom: spacing.md,
                    lineHeight: 1.5
                }}
            >
                Precision-matched job discovery delivered daily at 9AM.
            </p>

            <button
                onClick={() => navigate('/settings')}
                style={{
                    backgroundColor: colors.accent,
                    color: '#FFFFFF',
                    padding: `${spacing.js}px ${spacing.lg}px`,
                    height: 48,
                    borderRadius: radii.pill,
                    border: 'none',
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(139, 0, 0, 0.2)',
                    transition: 'transform 0.1s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.backgroundColor = '#7a0000'; // Slightly darker
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = colors.accent;
                }}
            >
                Start Tracking
            </button>

            {/* Optional social proof or minimal footer could go here */}
        </div>
    );
};
