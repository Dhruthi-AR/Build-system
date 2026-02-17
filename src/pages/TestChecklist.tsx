import React, { useState, useEffect } from 'react';
import { colors, spacing, radii } from '../designSystem';
import { CheckSquare, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

const TEST_ITEMS = [
    { id: 'prefs_persist', label: 'Preferences persist after refresh' },
    { id: 'match_score', label: 'Match score calculates correctly' },
    { id: 'matches_toggle', label: '"Show only matches" toggle works' },
    { id: 'save_persist', label: 'Save job persists after refresh' },
    { id: 'apply_tab', label: 'Apply opens in new tab' },
    { id: 'status_persist', label: 'Status update persists after refresh' },
    { id: 'status_filter', label: 'Status filter works correctly' },
    { id: 'digest_top10', label: 'Digest generates top 10 by score' },
    { id: 'digest_persist', label: 'Digest persists for the day' },
    { id: 'no_console_errors', label: 'No console errors on main pages' }
];

export const TestChecklist: React.FC = () => {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const stored = localStorage.getItem('jobTrackerTestChecklist');
        if (stored) {
            setCheckedItems(JSON.parse(stored));
        }
    }, []);

    const toggleItem = (id: string) => {
        setCheckedItems(prev => {
            const newState = { ...prev, [id]: !prev[id] };
            localStorage.setItem('jobTrackerTestChecklist', JSON.stringify(newState));
            return newState;
        });
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all test progress?')) {
            setCheckedItems({});
            localStorage.removeItem('jobTrackerTestChecklist');
        }
    };

    const passedCount = TEST_ITEMS.filter(item => checkedItems[item.id]).length;
    const allPassed = passedCount === TEST_ITEMS.length;

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', paddingBottom: 60 }}>
            {/* Header */}
            <div style={{ marginBottom: spacing.xl, borderBottom: '1px solid rgba(17,17,17,0.08)', paddingBottom: spacing.md, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 32, margin: 0, color: colors.text }}>
                        System Verification
                    </h1>
                    <p style={{ margin: '8px 0 0 0', color: 'rgba(17,17,17,0.5)' }}>
                        Verify all core functionalities before shipping.
                    </p>
                </div>
                <button
                    onClick={handleReset}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: 'white',
                        border: '1px solid rgba(17,17,17,0.2)',
                        borderRadius: radii.control,
                        color: colors.text,
                        cursor: 'pointer',
                        fontSize: 13,
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6
                    }}
                >
                    <RefreshCw size={14} /> Reset Test Status
                </button>
            </div>

            {/* Status Card */}
            <div
                style={{
                    padding: spacing.lg,
                    backgroundColor: allPassed ? '#F0FDF4' : '#FFFBEB',
                    borderRadius: radii.container,
                    marginBottom: spacing.lg,
                    border: `1px solid ${allPassed ? '#BBF7D0' : '#FDE68A'}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: allPassed ? '#166534' : '#B45309', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                        Test Status
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: allPassed ? '#15803d' : '#D97706' }}>
                        Tests Passed: {passedCount} / {TEST_ITEMS.length}
                    </div>
                </div>
                {!allPassed && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#92400E', fontSize: 14, fontWeight: 500 }}>
                        <AlertCircle size={20} />
                        Resolve all issues before shipping.
                    </div>
                )}
                {allPassed && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#166534', fontSize: 14, fontWeight: 700 }}>
                        <CheckCircle2 size={24} />
                        Ready to Ship
                    </div>
                )}
            </div>

            {/* Checklist */}
            <div style={{ backgroundColor: 'white', borderRadius: radii.container, border: '1px solid rgba(17,17,17,0.08)', overflow: 'hidden' }}>
                {TEST_ITEMS.map((item, index) => {
                    const isChecked = !!checkedItems[item.id];
                    return (
                        <label
                            key={item.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: spacing.md,
                                padding: spacing.lg,
                                borderBottom: index < TEST_ITEMS.length - 1 ? '1px solid rgba(17,17,17,0.06)' : 'none',
                                cursor: 'pointer',
                                transition: 'background-color 0.1s',
                                backgroundColor: isChecked ? 'rgba(139,0,0,0.02)' : 'white'
                            }}
                        >
                            <div style={{ position: 'relative', width: 24, height: 24 }}>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => toggleItem(item.id)}
                                    style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer' }}
                                />
                                <div
                                    style={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: 6,
                                        border: `2px solid ${isChecked ? colors.accent : '#D1D5DB'}`,
                                        backgroundColor: isChecked ? colors.accent : 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {isChecked && <CheckSquare size={16} />}
                                </div>
                            </div>
                            <span style={{ fontSize: 16, color: isChecked ? colors.text : 'rgba(17,17,17,0.8)', textDecoration: isChecked ? 'none' : 'none', fontWeight: isChecked ? 500 : 400 }}>
                                {item.label}
                            </span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};
