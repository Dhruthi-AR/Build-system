import React, { useState, useEffect } from 'react';
import { colors, spacing, radii } from '../designSystem';
import { Lock, Rocket, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Ship: React.FC = () => {
    const [allPassed, setAllPassed] = useState(false);
    const [passedCount, setPassedCount] = useState(0);

    useEffect(() => {
        const stored = localStorage.getItem('jobTrackerTestChecklist');
        if (stored) {
            const checkedItems = JSON.parse(stored);
            // We know there are 10 items based on TestChecklist.tsx, 
            // but simply checking the count of true values vs 10 is safest if ids match.
            // For robustness, let's assume if 10 items are true, we are good.
            // Or better, import the list or just use the count from the object.
            const count = Object.values(checkedItems).filter(Boolean).length;
            setPassedCount(count);
            // Quick hardcode of 10 items
            setAllPassed(count >= 10);
        }
    }, []);

    if (!allPassed) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', gap: spacing.md }}>
                <div
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: '#FEF2F2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#DC2626',
                        marginBottom: spacing.md
                    }}
                >
                    <Lock size={40} />
                </div>
                <h1 style={{ fontFamily: 'Georgia, serif', margin: 0, color: colors.text }}>Shipping Locked</h1>
                <p style={{ maxWidth: 400, color: 'rgba(17,17,17,0.6)', lineHeight: 1.6, fontSize: 16 }}>
                    You have not completed the system verification checklist. <br />
                    <strong>{passedCount}/10</strong> tests passed.
                </p>
                <Link
                    to="/jt/07-test"
                    style={{
                        padding: '12px 24px',
                        backgroundColor: colors.text,
                        color: 'white',
                        borderRadius: radii.pill,
                        textDecoration: 'none',
                        fontWeight: 600,
                        marginTop: spacing.sm,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                    }}
                >
                    Go to Verification <CheckCircle2 size={16} />
                </Link>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', gap: spacing.md }}>
            <div
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    backgroundColor: '#F0FDF4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#166534',
                    marginBottom: spacing.md,
                    boxShadow: '0 10px 30px rgba(22, 101, 52, 0.2)'
                }}
            >
                <Rocket size={48} />
            </div>
            <h1 style={{ fontFamily: 'Georgia, serif', margin: 0, color: colors.text, fontSize: 42 }}>Ready for Takeoff</h1>
            <p style={{ maxWidth: 500, color: 'rgba(17,17,17,0.6)', lineHeight: 1.6, fontSize: 18 }}>
                All systems go. The Job Notification Tracker is verified and ready to be shipped to production.
            </p>
            <div style={{ display: 'flex', gap: 16, marginTop: spacing.lg }}>
                <button
                    style={{
                        padding: '12px 32px',
                        backgroundColor: colors.accent,
                        color: 'white',
                        border: 'none',
                        borderRadius: radii.pill,
                        fontSize: 16,
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(139,0,0,0.3)'
                    }}
                >
                    Deploy Now
                </button>
            </div>
        </div>
    );
};
