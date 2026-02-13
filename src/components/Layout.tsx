import React from 'react';
import { colors, spacing, radii } from '../designSystem';

type Status = 'not_started' | 'in_progress' | 'shipped';

interface AppShellProps {
  projectName: string;
  stepLabel: string;
  status: Status;
  contextTitle: string;
  contextSubtitle: string;
  primary: React.ReactNode;
  secondary: React.ReactNode;
  proofFooter: React.ReactNode;
}

const layoutStyles: React.CSSProperties = {
  minHeight: '100vh',
  backgroundColor: colors.background,
  color: colors.text,
  fontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  display: 'flex',
  flexDirection: 'column'
};

const contentContainer: React.CSSProperties = {
  maxWidth: 1280,
  margin: '0 auto',
  padding: `${spacing.lg}px ${spacing.lg}px`,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.lg
};

const topBar: React.CSSProperties = {
  borderBottom: '1px solid rgba(17,17,17,0.12)',
  padding: `0 ${spacing.lg}px`
};

const topBarInner: React.CSSProperties = {
  maxWidth: 1280,
  margin: '0 auto',
  height: 64,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing.lg
};

const contextHeader: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
  maxWidth: 720
};

const h1Style: React.CSSProperties = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: 36,
  lineHeight: 1.25,
  letterSpacing: '0.02em',
  margin: 0
};

const bodyText: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.7,
  margin: 0,
  color: 'rgba(17,17,17,0.8)'
};

const workspaceRow: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: spacing.md
};

const primaryWorkspace: React.CSSProperties = {
  flexBasis: '70%',
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md
};

const secondaryPanel: React.CSSProperties = {
  flexBasis: '30%',
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md
};

const proofFooterStyles: React.CSSProperties = {
  borderTop: '1px solid rgba(17,17,17,0.12)',
  marginTop: 'auto',
  padding: `${spacing.sm}px ${spacing.lg}px`
};

const proofFooterInner: React.CSSProperties = {
  maxWidth: 1280,
  margin: '0 auto'
};

const statusBadgeBase: React.CSSProperties = {
  padding: `${spacing.xs}px ${spacing.sm}px`,
  borderRadius: radii.pill,
  fontSize: 12,
  letterSpacing: '0.08em',
  textTransform: 'uppercase'
};

function statusStyles(status: Status): React.CSSProperties {
  if (status === 'in_progress') {
    return {
      ...statusBadgeBase,
      backgroundColor: 'rgba(139,0,0,0.08)',
      color: colors.accent,
      border: 'none'
    };
  }
  if (status === 'shipped') {
    return {
      ...statusBadgeBase,
      backgroundColor: 'rgba(76,107,79,0.09)',
      color: colors.success,
      border: 'none'
    };
  }
  return {
    ...statusBadgeBase,
    border: '1px solid rgba(17,17,17,0.12)',
    color: 'rgba(17,17,17,0.7)'
  };
}

function statusLabel(status: Status): string {
  if (status === 'in_progress') return 'In Progress';
  if (status === 'shipped') return 'Shipped';
  return 'Not Started';
}

export const AppShell: React.FC<AppShellProps> = ({
  projectName,
  stepLabel,
  status,
  contextTitle,
  contextSubtitle,
  primary,
  secondary,
  proofFooter
}) => {
  return (
    <div style={layoutStyles}>
      <header style={topBar}>
        <div style={topBarInner}>
          <div
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 18,
              fontWeight: 500
            }}
          >
            {projectName}
          </div>
          <div
            style={{
              fontSize: 14,
              color: 'rgba(17,17,17,0.7)'
            }}
          >
            {stepLabel}
          </div>
          <div style={statusStyles(status)}>{statusLabel(status)}</div>
        </div>
      </header>

      <main style={contentContainer}>
        <section style={contextHeader}>
          <h1 style={h1Style}>{contextTitle}</h1>
          <p style={bodyText}>{contextSubtitle}</p>
        </section>

        <section style={workspaceRow}>
          <section style={primaryWorkspace}>{primary}</section>
          <aside style={secondaryPanel}>{secondary}</aside>
        </section>
      </main>

      <footer style={proofFooterStyles}>
        <div style={proofFooterInner}>{proofFooter}</div>
      </footer>
    </div>
  );
};

