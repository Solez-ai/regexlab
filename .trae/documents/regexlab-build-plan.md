# RegexLab — Full App Build Plan

## Summary
Build a complete, production-ready **Regex Tester & Explainer** web application called **RegexLab** using Next.js 14 App Router, TypeScript (strict mode), Tailwind CSS (dark mode via class strategy), and Framer Motion. The application will be 100% client-side with native JS `RegExp` running in a Web Worker, `localStorage` for persistence, and a highly polished UI. Additionally, a fully static `/docs` page will be created matching the app's design system.

## Current State Analysis
The workspace is currently empty (only `.git` and a `Readme.md` exist). We need to initialize a new Next.js project and set up the specified file structure, components, hooks, utilities, and styling from scratch.

## Proposed Changes

### Phase 1: Project Initialization & Configuration
1. **Bootstrap Next.js**:
   - Run `npx create-next-app@latest regexlab --typescript --tailwind --app --src-dir=false --import-alias="@/*" --no-eslint`
   - Move into the `regexlab` directory.
   - Run `npm install framer-motion clsx tailwind-merge lucide-react` (adding `clsx`, `tailwind-merge`, and `lucide-react` for standard UI composition).
2. **Tailwind & CSS**:
   - Update `tailwind.config.ts` to include `darkMode: 'class'` and extend the `mono` font family to use `var(--font-geist-mono)`.
   - Update `app/globals.css` with the specified CSS variables for colors (`--bg`, `--bg2`, `--bg3`, `--border`, `--border2`, `--text`, `--muted`, `--accent`, `--accent-light`, `--match-a`, `--match-b`, `--error`, `--success`) and apply global styling.
3. **Fonts & Layout**:
   - Update `app/layout.tsx` to load `Geist Mono` and `Syne` from `next/font/google`. Apply them via CSS variables.

### Phase 2: Core Logic & Types
1. **Types**: Create `types/index.ts` with all the specified interfaces (`RegexMatch`, `RegexResult`, `SavedPattern`, `RegexToken`, `TokenType`).
2. **Utilities**: Create `lib/utils.ts` (`generateId`, `formatNumber`, `truncate`, `isMac`, plus `cn` for Tailwind class merging).
3. **Patterns**: Create `lib/patterns.ts` with the 10 `SEED_PATTERNS`.
4. **Export Logic**: Create `lib/exporter.ts` for JSON and CSV exports.
5. **Explainer Logic**: Create `lib/explainer.ts` with a character-by-character parser to generate `RegexToken[]`.

### Phase 3: Web Worker & Hooks
1. **Web Worker**: Create `public/regex-worker.js` to handle non-blocking `RegExp` execution.
2. **Hooks**:
   - `hooks/useDebounce.ts`: Generic debouncer.
   - `hooks/useTheme.ts`: Manages `regexlab:theme` in `localStorage` and `dark` class on `html`.
   - `hooks/useLocalStorage.ts`: SSR-safe state persistence.
   - `hooks/useRegex.ts`: Communicates with `regex-worker.js`, manages debouncing, and handles timeout/errors.
   - `hooks/useKeyboardShortcuts.ts`: Global `keydown` listeners for specified shortcuts.

### Phase 4: UI & Domain Components
*(Applying `vercel-composition-patterns` and `frontend-design` principles)*
1. **Base UI Components** (`components/ui/`):
   - `Button.tsx`, `Badge.tsx`, `Tooltip.tsx`, `Toggle.tsx`.
2. **Regex Components** (`components/regex/`):
   - `RegexInput.tsx`, `FlagToggle.tsx`, `ErrorBanner.tsx`.
3. **Testing Components** (`components/testing/`):
   - `TestTextarea.tsx` (with drag-and-drop support).
   - `MatchHighlighter.tsx` (Framer Motion animations for matched tokens).
4. **Results Components** (`components/results/`):
   - `MatchList.tsx`, `GroupsPanel.tsx`, `StatsBar.tsx`.
5. **Sidebar Components** (`components/sidebar/`):
   - `Explainer.tsx`, `SavedPatterns.tsx`, `ExportPanel.tsx`, `CheatSheet.tsx`.
6. **Layout Components** (`components/layout/`):
   - `TopBar.tsx`, `Sidebar.tsx`.

### Phase 5: Assembly & Documentation Page
1. **Main Page** (`app/page.tsx`):
   - Assemble all components into the responsive CSS grid layout (`[1fr_320px]` on desktop).
   - Wire up all state using the custom hooks.
2. **Documentation Page** (`app/docs/page.tsx`):
   - Create a static, client-side, two-column layout with a sticky sidebar and smooth scrolling.
   - Content includes: Getting Started, Core Features, Saving & Exporting (including Export as CSV/JSON).

## Assumptions & Decisions
- I will execute the bootstrap commands inside `/workspace/regexlab` but will write the Next.js files into the root `/workspace` directory or just build the app inside `/workspace/regexlab`. Actually, to keep things clean, I will run the bootstrap in `/workspace` by using `npx create-next-app@latest .` or move the files. Let's create it in `/workspace/regexlab` as instructed in the prompt.
- `lucide-react` will be used for icons since it's the standard, high-quality icon set for React apps.
- The "E" in the Docs sidebar structure implies "Export as CSV" to match the `ExportPanel` functionality.
- For `framer-motion`, I will add `use client` to all components that use it, and follow the `reduced-motion` guidelines.
- For `vercel-composition-patterns`, I will structure `Tooltip`, `Toggle`, etc., cleanly, avoiding boolean prop proliferation.
- For `frontend-design`, the app will feature a striking dark mode, meticulous spacing, and smooth staggered animations.

## Verification Steps
1. Run `npm run build` inside `regexlab` to ensure all TypeScript and ESLint checks pass.
2. Run `npm run dev` to start the development server.
3. Validate keyboard shortcuts, regex evaluation, highlighting, and the `/docs` page functionality.
