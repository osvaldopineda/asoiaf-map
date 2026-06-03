# CLAUDE.md — asoiaf-map

Mapa interactivo e inmersivo del mundo de *Hielo y Fuego* (Westeros): regiones clicables, lore por casa, línea de tiempo por eras, sigils animados y audio ambiental procedural. **Todo el contenido/UI está en español.**

## Stack
- **React 18 + TypeScript + Vite 5** (SPA, sin router; estado de vista en Zustand).
- **Leaflet 1.9** con `CRS.Simple` (plano abstracto 0–1000, no geográfico).
- **anime.js v4** (draw de SVG/sigils) + **Framer Motion 11** (UI/paneles).
- **Web Audio API** para audio procedural (sin archivos de audio).
- **Tailwind CSS 3** (tema medieval) + PostCSS/autoprefixer.
- **Cloudflare Pages** para hosting (https://asoiaf-map.pages.dev).

## Comandos
```bash
npm install
npm run dev      # vite dev en http://localhost:5174 (puerto fijo en vite.config.ts)
npm run build    # tsc && vite build → dist/   (tsc corre primero: errores de tipos rompen el build)
npm run preview  # sirve dist/ localmente
```
No hay tests ni linter configurados.

## Estructura (`src/`)
- `App.tsx` — composición raíz: MapCanvas + overlays absolutos (título, EraSelector, SoundToggle, RegionPanel).
- `components/Map/MapCanvas.tsx` — **único** lugar que toca Leaflet (motor aislado a propósito; cambiar a MapLibre/deck.gl = reescribir solo este archivo).
- `components/Lore/` — `RegionPanel.tsx` (panel pergamino), `Sigil.tsx` (sigil que se traza con anime.js).
- `components/Timeline/EraSelector.tsx`, `components/UI/` — `LoadingScreen`, `SoundToggle`.
- `data/regions.ts` — fuente de verdad: `REGIONS`, `ERAS`, `WORLD_BOUNDS`, `WORLD_MAP_SRC`. Toda región/era/lore se añade aquí.
- `types/index.ts` — `Region`, `Era`, `EraInfo`, `Character`, `HiddenLore`, `Point`.
- `store/useAppStore.ts` — Zustand: `selectedRegionId`, `eraId` (default `'five-kings'`), `soundOn`.
- `audio/ambient.ts` (`AmbientEngine`) + `hooks/useAmbientSound.ts`.
- `public/world-map.svg` — mapa base propio dibujado a mano (overlay bajo las regiones).

## Despliegue (Cloudflare Pages)
- **No hay `wrangler.toml`** ni script de deploy en package.json. El deploy es vía Pages.
- Build command: `npm run build`; output dir: `dist/`. `.wrangler/` es solo caché local (gitignored).
- Manual: `npx wrangler pages deploy dist` tras `npm run build`.

## Convenciones y gotchas
- **Coordenadas Leaflet = `[y, x]`** (lat=y, lng=x), plano 0–1000, norte = y alta. `Point = [number, number]`. No invertir.
- El estado de "región seleccionada" vive en el store; `MapCanvas` lee `useAppStore.getState()` dentro de los handlers de Leaflet (evita stale closures en hover/click).
- `houseColor` (hex) alimenta tanto el fill como el glow de hover de cada polígono.
- z-index: overlays usan `z-[550]` por encima de Leaflet.
- Los datos del mapa (`polygon`, `labelAt`) son **placeholder inventado, sin IP** — formas no fieles al canon; el lore sí se basa en los libros (fan-work). Mantener assets 100% propios (sin material de HBO ni mapas oficiales).
- Audio: solo unas regiones tienen scape propio (`the-north`, `riverlands`, `westerlands`); el resto usa `'base'`. Requiere gesto del usuario para iniciar el AudioContext.
- tsconfig estricto: `noUnusedLocals`/`noUnusedParameters` activos → imports/vars sin usar rompen el build.
