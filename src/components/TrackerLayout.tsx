import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { colors, spacing } from '../designSystem';

const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/saved', label: 'Saved' },
    { path: '/digest', label: 'Digest' },
    { path: '/settings', label: 'Settings' },
    { path: '/proof', label: 'Proof' }
];

export const TrackerLayout: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: colors.background,
                color: colors.text
            }}
        >
            <nav
                style={{
                    borderBottom: '1px solid rgba(17,17,17,0.08)',
                    backgroundColor: '#F7F6F3',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10
                }}
            >
                <div
                    style={{
                        maxWidth: 1200,
                        margin: '0 auto',
                        padding: `0 ${spacing.md}px`,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    {/* Logo / Brand */}
                    <NavLink
                        to="/"
                        style={{
                            fontWeight: 600,
                            fontSize: 18,
                            letterSpacing: '-0.02em',
                            textDecoration: 'none',
                            color: colors.text
                        }}
                    >
                        Job Tracker
                    </NavLink>
                    {/* Desktop Navigation */}
                    <div
                        className="desktop-nav"
                        style={{ display: 'none', gap: spacing.lg, height: '100%' }}
                    >
                        <style>
                            {`
                @media (min-width: 768px) {
                  .desktop-nav { display: flex !important; }
                  .mobile-menu-btn { display: none !important; }
                }
              `}
                        </style>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                style={({ isActive }) => ({
                                    textDecoration: 'none',
                                    color: isActive ? colors.accent : colors.text,
                                    fontWeight: 500,
                                    fontSize: 14,
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '100%',
                                    borderBottom: isActive
                                        ? `2px solid ${colors.accent}`
                                        : '2px solid transparent',
                                    transition: 'color 0.2s, border-color 0.2s'
                                })}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: spacing.xs,
                            color: colors.text
                        }}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation Dropdown */}
                {isMobileMenuOpen && (
                    <div
                        style={{
                            borderTop: '1px solid rgba(17,17,17,0.08)',
                            backgroundColor: '#F7F6F3',
                            padding: spacing.md,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: spacing.sm
                        }}
                    >
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={({ isActive }) => ({
                                    textDecoration: 'none',
                                    color: isActive ? colors.accent : colors.text,
                                    fontWeight: 500,
                                    fontSize: 16,
                                    padding: `${spacing.sm}px 0`,
                                    borderBottom: isActive ? `1px solid ${colors.accent}` : 'none'
                                })}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                )}
            </nav>

            <main style={{ padding: spacing.lg }}>
                <Outlet />
            </main>
        </div>
    );
};
