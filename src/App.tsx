import { useState } from 'react'
import MapCanvas from './components/Map/MapCanvas'
import RegionPanel from './components/Lore/RegionPanel'
import LoadingScreen from './components/UI/LoadingScreen'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="vignette relative h-full w-full overflow-hidden">
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <MapCanvas />

      {/* Title overlay */}
      <header className="pointer-events-none absolute left-0 top-0 z-[550] p-5">
        <h1 className="font-decorative text-2xl text-gold drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] md:text-3xl">
          El Mundo Conocido
        </h1>
        <p className="font-heading mt-1 text-[10px] uppercase tracking-[0.3em] text-parchment/55">
          Hielo y Fuego · Mapa Interactivo
        </p>
      </header>

      {/* Hint */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-[550] p-4">
        <p className="font-lore text-sm italic text-parchment/45">
          Toca una región para descubrir su historia…
        </p>
      </div>

      <RegionPanel />
    </div>
  )
}
