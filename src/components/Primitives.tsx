import React, { useState } from 'react';
import { colors, spacing, radii, transitions } from '../designSystem';

export const Card: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div
      style={{
        border: '1px solid rgba(17,17,17,0.12)',
        borderRadius: radii.container,
        padding: spacing.md,
        backgroundColor: colors.background
      }}
    >
      {children}
    </div>
  );
};

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  children,
  ...rest
}) => {
  const [isHover, setIsHover] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const base: React.CSSProperties = {
    height: 40,
    padding: `0 ${spacing.sm}px`,
    borderRadius: radii.control,
    border: '1px solid transparent',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: colors.text,
    transition: `background-color ${transitions.default}, border-color ${transitions.default}, color ${transitions.default}`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs
  };

  let style: React.CSSProperties = base;

  if (variant === 'primary') {
    style = {
      ...base,
      backgroundColor: colors.accent,
      borderColor: colors.accent,
      color: colors.background
    };
  } else if (variant === 'secondary') {
    style = {
      ...base,
      borderColor: 'rgba(17,17,17,0.24)'
    };
  } else {
    style = {
      ...base,
      border: 'none',
      color: colors.accent,
      paddingInline: 0,
      height: 'auto'
    };
  }

  if (variant === 'primary' && isHover) {
    style = {
      ...style,
      backgroundColor: 'rgba(139,0,0,0.9)'
    };
  }

  if (variant === 'secondary' && isHover) {
    style = {
      ...style,
      backgroundColor: 'rgba(17,17,17,0.03)',
      borderColor: 'rgba(17,17,17,0.4)'
    };
  }

  if (isActive) {
    style = {
      ...style,
      backgroundColor:
        variant === 'primary'
          ? 'rgba(139,0,0,0.85)'
          : 'rgba(17,17,17,0.06)'
    };
  }

  return (
    <button
      {...rest}
      style={{
        ...style
      }}
      onMouseEnter={(event) => {
        rest.onMouseEnter?.(event);
        setIsHover(true);
      }}
      onMouseLeave={(event) => {
        rest.onMouseLeave?.(event);
        setIsHover(false);
        setIsActive(false);
      }}
      onMouseDown={(event) => {
        rest.onMouseDown?.(event);
        setIsActive(true);
      }}
      onMouseUp={(event) => {
        rest.onMouseUp?.(event);
        setIsActive(false);
      }}
    >
      {children}
    </button>
  );
};

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const TextInput: React.FC<InputProps> = ({ label, ...rest }) => {
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <label
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.xs
      }}
    >
      {label && (
        <span
          style={{
            fontSize: 13,
            fontWeight: 500
          }}
        >
          {label}
        </span>
      )}
      <input
        {...rest}
        style={{
          border: hasFocus
            ? `1px solid ${colors.accent}`
            : '1px solid rgba(17,17,17,0.16)',
          borderRadius: radii.control,
          padding: spacing.xs,
          fontSize: 14,
          backgroundColor: colors.background,
          outline: hasFocus
            ? `2px solid rgba(139,0,0,0.16)`
            : 'none'
        }}
        onFocus={(event) => {
          rest.onFocus?.(event);
          setHasFocus(true);
        }}
        onBlur={(event) => {
          rest.onBlur?.(event);
          setHasFocus(false);
        }}
      />
    </label>
  );
};

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, ...rest }) => {
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <label
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.xs
      }}
    >
      {label && (
        <span
          style={{
            fontSize: 13,
            fontWeight: 500
          }}
        >
          {label}
        </span>
      )}
      <textarea
        {...rest}
        style={{
          border: hasFocus
            ? `1px solid ${colors.accent}`
            : '1px solid rgba(17,17,17,0.16)',
          borderRadius: radii.control,
          padding: spacing.xs,
          fontSize: 14,
          backgroundColor: colors.background,
          resize: 'vertical',
          minHeight: 96,
          outline: hasFocus
            ? `2px solid rgba(139,0,0,0.16)`
            : 'none'
        }}
        onFocus={(event) => {
          rest.onFocus?.(event);
          setHasFocus(true);
        }}
        onBlur={(event) => {
          rest.onBlur?.(event);
          setHasFocus(false);
        }}
      />
    </label>
  );
};

interface BadgeProps {
  tone: 'neutral' | 'accent' | 'success' | 'warning';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ tone, children }) => {
  let style: React.CSSProperties = {
    padding: `${spacing.xs}px ${spacing.sm}px`,
    borderRadius: radii.pill,
    fontSize: 12,
    letterSpacing: '0.08em',
    textTransform: 'uppercase'
  };

  if (tone === 'accent') {
    style = {
      ...style,
      backgroundColor: 'rgba(139,0,0,0.08)',
      color: colors.accent
    };
  } else if (tone === 'success') {
    style = {
      ...style,
      backgroundColor: 'rgba(76,107,79,0.09)',
      color: colors.success
    };
  } else if (tone === 'warning') {
    style = {
      ...style,
      backgroundColor: 'rgba(177,134,50,0.08)',
      color: colors.warning
    };
  } else {
    style = {
      ...style,
      border: '1px solid rgba(17,17,17,0.12)',
      color: 'rgba(17,17,17,0.7)'
    };
  }

  return <span style={style}>{children}</span>;
};

interface FeedbackProps {
  title: string;
  body: string;
  tone: 'success' | 'warning';
  children?: React.ReactNode;
}

export const FeedbackBlock: React.FC<FeedbackProps> = ({
  title,
  body,
  tone,
  children
}) => {
  const isSuccess = tone === 'success';
  return (
    <div
      style={{
        borderRadius: radii.container,
        padding: spacing.md,
        borderLeft: `4px solid ${
          isSuccess ? colors.success : colors.warning
        }`,
        backgroundColor: isSuccess
          ? 'rgba(76,107,79,0.08)'
          : 'rgba(177,134,50,0.08)'
      }}
    >
      <div
        style={{
          fontWeight: 500,
          marginBottom: spacing.xs / 2
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 14,
          lineHeight: 1.6,
          marginBottom: children ? spacing.xs : 0
        }}
      >
        {body}
      </div>
      {children}
    </div>
  );
};

