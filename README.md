# React Skeleton Recorder Monorepo

This repo contains the package `@recorder/core` and a Next.js example app that serves as a landing page, demo, and documentation.

## Packages

- `packages/recorder` — the library. See its README for usage and API.
- `apps/example` — Next.js app for the landing page, live demos, and docs.

## Quick start (local)

```bash
pnpm i
pnpm -w build
pnpm -C apps/example dev
```

Open `http://localhost:3000` for the landing page, `/docs` for docs, and `/dev` for the playground.

## Publish

```bash
pnpm -C packages/recorder build
cd packages/recorder
npm publish --access public
```

License: MIT


