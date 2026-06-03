# El Mundo Conocido — Mapa Interactivo

> Mapa interactivo e inmersivo del mundo de *Hielo y Fuego* (Westeros). Explora regiones, descubre el lore de cada casa y viaja por las eras históricas.

**🔗 Demo en vivo:** [asoiaf-map.pages.dev](https://asoiaf-map.pages.dev)

![Estado](https://img.shields.io/badge/estado-demo-c9a227) ![Licencia de assets](https://img.shields.io/badge/assets-100%25%20propios-0d7d46)

---

## ✨ Características

- **🗺️ Mapa cartográfico propio** — continente con costa orgánica (SVG + filtros `feTurbulence`), líneas de rumbo estilo portolano, rosa de los vientos, barra de escala y relieve dibujado a mano. Sin assets con copyright.
- **🏰 Regiones interactivas** — click para abrir un panel pergamino con lema, capital, geografía, figuras y "historia que quizá no sabías".
- **⏳ Línea de tiempo** — cambia entre eras (Era de los Héroes · La Conquista · Guerra de los Cinco Reyes) y mira cómo cambia el gobernante de cada región.
- **⚜️ Sigils heráldicos** — emblemas originales que se trazan solos al abrir cada región (`anime.js`).
- **🎬 Intro animada** — la costa se dibuja con tinta dorada al cargar.
- **🔊 Sonido ambiental procedural** — texturas por región sintetizadas con la Web Audio API (viento, agua, drone cavernoso), sin archivos de audio.
- **🎨 Pulido** — cursor custom, glow al hover, controles tematizados, animaciones de entrada.

## 🛠️ Stack

| Capa | Herramienta |
|------|-------------|
| Framework | React 18 + TypeScript + Vite |
| Mapa | Leaflet (`CRS.Simple`, motor aislado para swap futuro) |
| Animación | anime.js (SVG draw) + Framer Motion (UI) |
| Audio | Web Audio API (síntesis procedural) |
| Estado | Zustand |
| Estilos | Tailwind CSS + tema medieval (Cinzel / IM Fell English) |
| Hosting | Cloudflare Pages |

## 🚀 Desarrollo

```bash
npm install
npm run dev      # http://localhost:5174
npm run build    # build de producción → dist/
```

## ⚖️ Notas legales

Proyecto **fan-made** basado en los libros de G.R.R. Martin. Todos los assets (mapa, sigils, audio) son **originales/propios** — no se usa material con copyright de HBO ni mapas oficiales. El lore se basa en la obra publicada.

---

Hecho por [Osvaldo Pineda](https://github.com/osvaldopineda) · [pinedawebstudio.com](https://pinedawebstudio.com)
