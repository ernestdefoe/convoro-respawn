# Respawn — a theme for Convoro

A gaming / esports theme. Deep navy-black, **neon cyan + magenta**, sharp
zero-radius corners, **JetBrains Mono** UI type, subtle CRT scanlines and a
neon glow on buttons and links.

## Features

- **Neon gaming palette** — cyan/magenta on near-black; ambient corner glow.
- **Sharp, angular** — zero border-radius across the UI for that terminal/HUD feel.
- **JetBrains Mono** chrome — headings, nav, buttons and metadata go mono; post
  bodies stay in a readable sans.
- **CRT scanlines** + neon glow on primary buttons and headings.
- **Light "daylight" mode** — when the forum is in light mode, Respawn becomes a
  clean blue-on-white variant. Follows your existing light/dark toggle.

## How it works

Respawn is a `type: theme` extension. Its `forum.js` (plain JS, no build step)
injects a stylesheet that remaps Convoro's `--c-*` design tokens to the Respawn
palette and font, so the whole forum restyles instantly, then layers on the
scanlines, glow and sharp corners.

Install from **Admin → Marketplace** (it downloads on demand — not bundled with
core). Disable to return to the default theme.
