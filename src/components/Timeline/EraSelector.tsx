import { useAppStore } from '../../store/useAppStore'
import { ERAS } from '../../data/regions'

const SHORT: Record<string, string> = {
  'age-of-heroes': 'Héroes',
  conquest: 'Conquista',
  'five-kings': 'Cinco Reyes',
}

export default function EraSelector() {
  const eraId = useAppStore((s) => s.eraId)
  const setEra = useAppStore((s) => s.setEra)
  const active = ERAS.find((e) => e.id === eraId) ?? ERAS[0]

  return (
    <div
      className="pointer-events-auto parchment-texture rounded-2xl border border-ink/25 px-5 py-3 shadow-2xl"
      style={{ minWidth: 300 }}
    >
      <div className="mb-2 text-center">
        <p className="font-heading text-sm font-bold leading-none text-ink">{active.name}</p>
        <p className="font-lore mt-0.5 text-xs italic text-ink/55">{active.hint}</p>
      </div>

      <div className="relative flex items-end justify-between px-1">
        <div className="absolute left-3 right-3 top-[7px] h-px bg-ink/25" />
        {ERAS.map((e) => {
          const on = e.id === eraId
          return (
            <button
              key={e.id}
              onClick={() => setEra(e.id)}
              className="group relative z-10 flex flex-col items-center gap-1.5"
            >
              <span
                className={`h-3.5 w-3.5 rounded-full border-2 transition-all ${
                  on
                    ? 'scale-125 border-gold bg-gold'
                    : 'border-ink/40 bg-parchment group-hover:border-gold'
                }`}
              />
              <span
                className={`font-heading text-[9px] uppercase tracking-wide transition-colors ${
                  on ? 'text-ink' : 'text-ink/45 group-hover:text-ink/70'
                }`}
              >
                {SHORT[e.id] ?? e.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
