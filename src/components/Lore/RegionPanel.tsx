import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { REGION_MAP, ERAS } from '../../data/regions'
import Sigil from './Sigil'

export default function RegionPanel() {
  const selectedRegionId = useAppStore((s) => s.selectedRegionId)
  const select = useAppStore((s) => s.select)
  const eraId = useAppStore((s) => s.eraId)
  const region = selectedRegionId ? REGION_MAP[selectedRegionId] : null
  const era = ERAS.find((e) => e.id === eraId)
  const eraInfo = region?.eras[eraId]

  return (
    <AnimatePresence>
      {region && (
        <motion.aside
          key={region.id}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 240, damping: 30 }}
          className="parchment-texture text-ink shadow-panel absolute top-0 right-0 z-[600] flex h-full w-full max-w-md flex-col overflow-y-auto"
          style={{ borderLeft: `5px solid ${region.houseColor}` }}
        >
          {/* House color crest bar */}
          <div className="h-2 w-full" style={{ backgroundColor: region.houseColor }} />

          <div className="px-7 py-6">
            {/* Close */}
            <button
              onClick={() => select(null)}
              className="absolute right-4 top-5 h-9 w-9 rounded-full border border-ink/20 text-ink/60 transition-colors hover:bg-ink/10 hover:text-ink"
              aria-label="Cerrar"
            >
              ✕
            </button>

            {/* Crest + Title */}
            <div className="flex items-start gap-4 pr-10">
              <Sigil regionId={region.id} color={region.houseColor} />
              <div className="min-w-0">
                <p
                  className="font-heading text-xs uppercase tracking-[0.25em]"
                  style={{ color: region.houseColor }}
                >
                  {region.rulingHouse}
                </p>
                <h2 className="font-decorative mt-1 text-3xl font-bold leading-tight text-ink">
                  {region.name}
                </h2>
              </div>
            </div>
            <p className="font-lore mt-3 text-lg italic text-ink/70">«{region.words}»</p>

            {/* Meta */}
            <div className="mt-5 flex gap-6 border-y border-ink/15 py-3">
              <Meta label="Capital" value={region.capital} />
              <Meta label="Casa" value={region.rulingHouse} />
            </div>

            {/* Era ruler (driven by the timeline) */}
            {era && eraInfo && (
              <div
                className="mt-5 rounded-lg p-3.5"
                style={{ backgroundColor: `${region.houseColor}14`, border: `1px solid ${region.houseColor}40` }}
              >
                <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-ink/50">
                  ⏳ En {era.name}
                </p>
                <p className="font-heading mt-1 text-base font-bold text-ink">{eraInfo.ruler}</p>
                <p className="font-lore mt-1 text-[0.98rem] leading-relaxed text-ink/75">{eraInfo.note}</p>
              </div>
            )}

            {/* Geography */}
            <p className="font-lore mt-5 text-[1.05rem] leading-relaxed text-ink/85">
              {region.geography}
            </p>

            {/* Characters */}
            <Section title="Figuras representativas" color={region.houseColor} />
            <div className="space-y-3">
              {region.characters.map((c) => (
                <div key={c.name} className="rounded-md border border-ink/15 bg-parchment-dark/40 p-3">
                  <p className="font-heading text-base font-semibold text-ink">{c.name}</p>
                  <p className="font-heading text-xs uppercase tracking-wide text-ink/50">{c.role}</p>
                  <p className="font-lore mt-1.5 text-[0.98rem] leading-relaxed text-ink/80">{c.description}</p>
                </div>
              ))}
            </div>

            {/* Hidden lore */}
            <Section title="Historia que quizá no sabías" color={region.houseColor} />
            <div className="space-y-3">
              {region.hiddenLore.map((h) => (
                <div key={h.title} className="border-l-2 pl-4" style={{ borderColor: region.houseColor }}>
                  <p className="font-heading text-sm font-semibold text-ink">✦ {h.title}</p>
                  <p className="font-lore mt-1 text-[0.98rem] leading-relaxed text-ink/80">{h.content}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-ink/45">{label}</p>
      <p className="font-heading text-sm font-semibold text-ink">{value}</p>
    </div>
  )
}

function Section({ title, color }: { title: string; color: string }) {
  return (
    <div className="mt-7 mb-3 flex items-center gap-3">
      <span className="h-px flex-1" style={{ backgroundColor: `${color}66` }} />
      <h3 className="font-heading text-xs uppercase tracking-[0.18em] text-ink/60">{title}</h3>
      <span className="h-px flex-1" style={{ backgroundColor: `${color}66` }} />
    </div>
  )
}
