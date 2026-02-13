# KodNest Premium Build System – Design System Shell

This repository contains the **KodNest Premium Build System** design system shell. It is a serious, calm B2C SaaS UI foundation – **no product features**, only layout, tokens, and primitives.

## Stack

- React + TypeScript
- Vite

## Running locally

1. Install Node.js (LTS).
2. In the project root:

   ```bash
   npm install
   npm run dev
   ```

3. Open the URL Vite prints (usually `http://localhost:5173`).

## Architecture

- `designSystem.ts` – color tokens, spacing scale, radii, transitions.
- `components/Layout.tsx` – `AppShell` enforcing global structure:
  - Top Bar → Context Header → Primary Workspace (70%) + Secondary Panel (30%) → Proof Footer.
- `components/Primitives.tsx` – core components:
  - `Card`, `Button` (primary/secondary/tertiary), `TextInput`, `TextArea`, `Badge`, `FeedbackBlock`.
- `components/States.tsx` – standardized state patterns:
  - `EmptyState`, `ErrorState` with calm language and explicit next actions.
- `App.tsx` – example composition using the shell and primitives (no product-specific logic).

## Usage guidelines

- **Colors**: Use only the defined tokens (background, text, accent red, success green, warning amber). No extra hues or gradients.
- **Typography**:
  - Headings: serif, confident (see `Layout.tsx` and `App.tsx` usage).
  - Body: sans-serif 16–18px, line-height ~1.7, max 720px width.
- **Spacing**: Only `8, 16, 24, 40, 64` px – no off-scale spacing.
- **Components**:
  - Primary button: solid deep red; secondary: outlined; shared hover/active behavior.
  - Inputs: subtle borders, clear accent-red focus ring.
  - Cards: bordered, no shadows, balanced padding.
- **States**:
  - Errors: explain what went wrong + how to fix, never blame the user.
  - Empty: always provide a clear next action.

To add new screens or flows, always compose through `AppShell` and the primitives so everything feels like it was designed by one mind.

