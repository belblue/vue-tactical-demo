# vue-tactical-demo

A weekend project demo: a dark tactical map with NATO military symbols, MGRS coordinate readout, and CoT (Cursor-on-Traget) XML parsing. Vue3 + TS + MapLibre GL.

## Stack

- Vue 3.5 (`<script setup>`, `useTemplateRef`, `defineModel`)
- TypeScript (strict)
- Vite + SCSS
- MapLibre GL, milsymbol, mgrs

## Quick start

\`\`\`bash
npm install
npm run dev # http://localhost:5173
npm run build
\`\`\`

## Standards

- **APP-6D** - NATO Joint Military Symbology (current)
- **MIL-std-2525C** US DoD military symbology
- **CoT** Cursor-on-Target XML interchange format
- **MGRS** Military Grid Reference system
