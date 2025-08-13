# React Skeleton Recorder (`@recorder/core`)

<!-- Badges (fill after publish) -->
<!--
[![npm version](https://img.shields.io/npm/v/@recorder/core.svg)](https://www.npmjs.com/package/@recorder/core)
[![license: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../../LICENSE)
-->

Turn any rendered UI into a faithful skeleton loader automatically. Wrap your content once and get a pixel-accurate skeleton while data is loading — no hand-crafted placeholder trees.

## Features

- Automatic DOM-to-skeleton generation (flex/grid aware)
- Text-aware ragged line blocks with pulse animation
- Respects border radius, spacing, and layout
- Works with absolutely/fixed/sticky positioned elements
- Light/Dark theming via a single CSS variable
- Zero CSS dependencies; adds a tiny keyframes helper at runtime

## Installation

```bash
pnpm add @recorder/core
# or
npm i @recorder/core
# or
yarn add @recorder/core
```

## Quickstart

```tsx
import { useState } from "react";
import { SkeletonRecorder } from "@recorder/core";

export function ProfileCard() {
  const [loading, setLoading] = useState(true);

  return (
    <SkeletonRecorder isLoading={loading}>
      <article className="card">
        <img className="avatar" />
        <h2>Jane Doe</h2>
        <p>Senior Frontend Engineer</p>
      </article>
    </SkeletonRecorder>
  );
}
```

When `isLoading` is true, the original content remains mounted (hidden for measurement) and an auto-generated skeleton is rendered in its place.

## API

```ts
type Props = {
  children: React.ReactNode;
  isLoading?: boolean;      // Show the generated skeleton when true
  devMode?: boolean;        // Adds a floating "📸 Capture Skeleton" button
  onCapture?: (jsx: React.ReactNode) => void; // Receive captured JSX when clicking the button
};
```

```tsx
<SkeletonRecorder
  isLoading={isLoading}
  devMode
  onCapture={(node) => console.log(node)}
>
  {content}
</SkeletonRecorder>
```

## Theming (Light/Dark)

Skeleton color is controlled by the CSS variable `--skeleton-base-color` and defaults to a light neutral. You can set it globally and/or per theme.

```css
:root { --skeleton-base-color: #e5e7eb; }
@media (prefers-color-scheme: dark) {
  :root { --skeleton-base-color: rgba(255,255,255,.14); }
}

:root[data-theme="light"] { --skeleton-base-color: #e5e7eb; }
:root[data-theme="dark"]  { --skeleton-base-color: #374151; }
```

To toggle themes in-app, set `data-theme` on `document.documentElement`.

```ts
document.documentElement.setAttribute("data-theme", "dark");
```

The component respects `prefers-reduced-motion` and will disable the pulse animation automatically when users prefer reduced motion.

## How it works

- The component renders your children (optionally hidden when loading) so it can measure real DOM boxes and computed styles.
- It walks the DOM tree and synthesizes a parallel tree of lightweight `div`s mirroring layout (flex/grid, padding, gaps, radius).
- Leaf nodes with text become a stack of ragged lines; media-like nodes (e.g. images) become blocks or circles respecting border radius.
- A tiny `@keyframes pulse` is injected once per document for the shimmer effect.

## Project structure

Monorepo managed with workspaces:

```
.
├─ packages/
│  └─ recorder/            # This package
│     ├─ src/
│     │  ├─ components/
│     │  │  ├─ SkeletonRecorder.tsx
│     │  │  └─ SkeletonRenderer.tsx (dev preview)
│     │  └─ utils/
│     │     ├─ generateSkeleton.tsx
│     │     └─ injectPulseAnimation.ts
│     ├─ dist/              # Build output
│     └─ package.json
└─ apps/
   └─ example/              # Next.js demo + docs site
```

## Local development

```bash
# From repo root
pnpm i
pnpm -w build           # builds the package
pnpm -C apps/example dev # runs the Next.js demo site at http://localhost:3000
```

During development you can open `/dev` in the demo app and use `devMode` to capture and preview the generated skeleton for arbitrary content.

## Contribution guidelines

- Use TypeScript and keep code self-documenting with descriptive names.
- Prefer small, focused functions; avoid deep nesting and broad catch-all blocks.
- Ensure no linter errors; match existing formatting.
- Add examples to the demo app when introducing features/edge cases.
- Accessibility: do not remove ARIA attributes; ensure motion is disabled when users prefer reduced motion.

Workflow:

1. Create a feature branch
2. Implement changes in `packages/recorder` and (if relevant) update `apps/example`
3. Build and test locally
4. Open a PR with a clear description and before/after screenshots of skeletons when applicable

## Publishing

This package is configured to build to `dist/`. To publish:

```bash
pnpm -C packages/recorder build
cd packages/recorder
npm publish --access public
```

Ensure `peerDependencies` match the intended React version.

---

Made with ❤️ to save you from hand-crafting skeleton UIs.


