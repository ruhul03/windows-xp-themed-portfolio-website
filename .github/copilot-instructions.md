<!-- Copilot instructions for this repository: concise, action-oriented guidance for AI coding agents -->

# Copilot / AI agent instructions

Purpose: Help an AI contributor become immediately productive in this Vite + React Windows‑XP themed portfolio project.

- **Entrypoint & run**: Dev server is started with `npm i` then `npm run dev` (Vite). Build with `npm run build`.
- **Main entry**: `src/main.tsx` mounts the app; top-level app is `src/app/App.tsx` (desktop/window manager).

Big picture
- Single-page React app (Vite) that simulates a Windows XP desktop. UI is componentized under `src/app/components`.
- `App.tsx` holds global state for windows (open/minimized/active) and desktop icons — use it to understand overall data flow for opening/closing windows.
- Visual/system primitives and design utilities live in `src/app/ui` and `src/styles` — prefer changing primitives there rather than per-component style edits.

Key files to inspect (examples):
- App orchestration: [src/app/App.tsx](src/app/App.tsx)
- Window component and props: [src/app/components/XPWindow.tsx](src/app/components/XPWindow.tsx)
- Taskbar / Start menu: [src/app/components/Taskbar.tsx](src/app/components/Taskbar.tsx) and [src/app/components/StartMenu.tsx](src/app/components/StartMenu.tsx)
- Desktop icons: [src/app/components/DesktopIcon.tsx](src/app/components/DesktopIcon.tsx)
- Entry + styles: [src/main.tsx](src/main.tsx), [src/styles/tailwind.css](src/styles/tailwind.css)

Patterns & conventions
- State lives in `App.tsx` for windows. Windows are objects with `{ id, title, content, isMinimized }` and are manipulated via `openWindow`, `closeWindow`, `minimizeWindow`.
- Components expect props for lifecycle actions: `onClose`, `onMinimize`, `onFocus`, `isActive`, and `defaultPosition` (see `XPWindow`).
- Desktop items are defined as an array in `App.tsx` (see `desktopIcons`) — modify this array to add/remove icons or wire new content IDs.
- Visual tokens and small utilities live in `src/app/ui` — follow existing hooks/utilities when adding components (e.g., accessible Radix primitives are used across components).

Tooling & build notes
- Vite is configured in `vite.config.ts`. Tailwind is used (`tailwindcss`, `@tailwindcss/vite`). If you change Tailwind config or PostCSS, run a full restart of `npm run dev`.
- No test runner is present. Changes should be validated by running the dev server and exercising the desktop flows.

Dependencies & integrations
- UI libs used: Radix primitives (`@radix-ui/*`), `lucide-react` for icons, `@mui` packages appear but the project primarily uses custom components in `src/app/ui`.
- Image/backgrounds: some components use external image URLs; prefer local assets under `src/styles` or `public` if bundling.

What to do when editing
- To add a new desktop app: add a `content` component under `src/app/components` and add an entry in `desktopIcons` in `App.tsx` that calls `openWindow(id, title)`.
- When changing window behavior, update `XPWindow` first — this propagates to all windows.
- Update or extend style tokens in `src/styles/index.css` and `src/styles/tailwind.css` rather than scattering style edits.

Examples (use these exact places as reference):
- Window open/restore logic: `openWindow` in [src/app/App.tsx](src/app/App.tsx) — follow its pattern for id-based uniqueness.
- Taskbar click handling: `handleTaskClick` in [src/app/App.tsx](src/app/App.tsx) — toggles minimized state and sets `activeWindowId`.

Notes for AI reviewers
- Avoid adding global state outside of `App.tsx` unless adding a clear new store (explain migration in PR). Small component state is fine inside components.
- There are no automated tests — include steps in PR descriptions for manual verification (open each desktop icon, minimize, close, reorder windows if applicable).
- Keep changes small and scoped; this project is a visual demo and regressions are easy to spot by running `npm run dev`.

If anything here is unclear or you'd like a different level of detail (e.g., more file links, example diffs), tell me which area to expand.
