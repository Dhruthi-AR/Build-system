import React from 'react';
import { spacing } from '../designSystem';
import { Card, Button, FeedbackBlock } from './Primitives';

interface EmptyStateProps {
  title: string;
  body: string;
  actionLabel: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  body,
  actionLabel,
  onAction
}) => {
  return (
    <Card>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.sm
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 20,
              lineHeight: 1.3,
              marginBottom: spacing.xs
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: 'rgba(17,17,17,0.8)'
            }}
          >
            {body}
          </div>
        </div>
        <div>
          <Button variant="primary" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      </div>
    </Card>
  );
};

interface ErrorStateProps {
  title?: string;
  body: string;
  steps?: string[];
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "We couldn't complete this step.",
  body,
  steps,
  onRetry
}) => {
  return (
    <FeedbackBlock title={title} body={body} tone="warning">
      {steps && steps.length > 0 && (
        <ul
          style={{
            margin: 0,
            paddingLeft: spacing.md,
            marginBottom: onRetry ? spacing.sm : 0,
            fontSize: 14,
            lineHeight: 1.6
          }}
        >
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      )}
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Retry
        </Button>
      )}
    </FeedbackBlock>
  );
};

