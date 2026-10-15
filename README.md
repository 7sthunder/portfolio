# Portfolio — Aadhi Narayanan R

Personal portfolio site: software engineer, full-stack developer, applied AI work.

Built with React 19, TypeScript, Vite and Tailwind CSS v4. Content lives in
[`src/data.ts`](src/data.ts) so projects, stack and stats can be updated without
touching components.

## Stack

- **React 19** + **TypeScript**
- **Vite 6** for dev server and builds
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **Motion** for entrance animations and count-ups
- **lucide-react** for icons

## Getting started

```bash
npm install
npm run dev     # start dev server
npm run build   # typecheck + production build to dist/
npm run preview # preview the production build
```

## Structure

```
src/
├── App.tsx     # page layout and sections
├── Mock.tsx    # mockup visuals (Window, Phone, Tilt)
├── data.ts     # all portfolio content
├── index.css   # theme tokens and base styles
└── main.tsx    # entry point
```