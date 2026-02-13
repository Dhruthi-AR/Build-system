import React from 'react';
import { spacing, radii } from './designSystem';
import { AppShell } from './components/Layout';
import {
  Card,
  Button,
  TextArea,
  TextInput,
  FeedbackBlock
} from './components/Primitives';

export const App: React.FC = () => {
  return (
    <AppShell
      projectName="KodNest Premium Build System"
      stepLabel="Step 1 / 4"
      status="not_started"
      contextTitle="Define your build blueprint."
      contextSubtitle="Establish the structure and expectations for this build so every step is deliberate, verifiable, and repeatable."
      primary={
        <Card>
          <h2
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 24,
              lineHeight: 1.3,
              margin: 0,
              marginBottom: spacing.sm
            }}
          >
            Primary workspace
          </h2>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              margin: 0,
              color: 'rgba(17,17,17,0.8)',
              maxWidth: 720
            }}
          >
            This area will host the main product interaction for this step. It
            remains intentionally minimal in this design system stage so new
            flows can plug in without visual drift.
          </p>
        </Card>
      }
      secondary={
        <>
          <Card>
            <h3
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 18,
                lineHeight: 1.3,
                margin: 0,
                marginBottom: spacing.sm
              }}
            >
              This step
            </h3>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                margin: 0,
                color: 'rgba(17,17,17,0.8)',
                maxWidth: 720
              }}
            >
              Use this panel to clarify what this step should achieve and the
              evidence you will capture in the proof footer.
            </p>
          </Card>
          <Card>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.sm
              }}
            >
              <TextArea
                label="Copyable prompt"
                readOnly
                value="Describe the exact UI, logic, and proof required for this step in clear, verifiable terms."
              />
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: spacing.xs
                }}
              >
                <Button variant="secondary">Copy</Button>
                <Button variant="primary">Build in Lovable</Button>
                <Button variant="secondary">It Worked</Button>
                <Button variant="secondary">Error</Button>
                <Button variant="secondary">Add Screenshot</Button>
              </div>
            </div>
          </Card>
        </>
      }
      proofFooter={
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: spacing.sm
          }}
        >
          <div
            style={{
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'rgba(17,17,17,0.7)'
            }}
          >
            Proof of completion
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: spacing.sm
            }}
          >
            {['UI Built', 'Logic Working', 'Test Passed', 'Deployed'].map(
              (label) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: spacing.xs
                  }}
                >
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing.xs
                    }}
                  >
                    <input type="checkbox" />
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 500
                      }}
                    >
                      {label}
                    </span>
                  </label>
                  <TextInput
                    placeholder="Add link, note, or reference"
                    style={{
                      borderRadius: radii.control
                    }}
                  />
                </div>
              )
            )}
          </div>

          <FeedbackBlock
            title="Everything validated successfully."
            body="Use this pattern when the step has passed its checks and is ready to move forward."
            tone="success"
          />
          <FeedbackBlock
            title="Need to show an error?"
            body="Use this pattern to explain what went wrong and how to fix it. Keep the tone calm and practical."
            tone="warning"
          />
        </div>
      }
    />
  );
};

