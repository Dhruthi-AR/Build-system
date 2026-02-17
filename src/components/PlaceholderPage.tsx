import React from 'react';
import { colors, spacing } from '../designSystem';

interface PlaceholderPageProps {
  title: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.sm,
        maxWidth: 800,
        margin: '0 auto',
        padding: `${spacing.xl}px ${spacing.md}px`,
        textAlign: 'center'
      }}
    >
      <h1
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 48,
          fontWeight: 'normal',
          color: colors.text,
          margin: 0
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: 18,
          color: 'rgba(17,17,17,0.6)',
          margin: 0
        }}
      >
        This section will be built in the next step.
      </p>
    </div>
  );
};
