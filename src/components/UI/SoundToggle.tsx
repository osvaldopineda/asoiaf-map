import { useAppStore } from '../../store/useAppStore'

export default function SoundToggle() {
  const soundOn = useAppStore((s) => s.soundOn)
  const toggle = useAppStore((s) => s.toggleSound)

  return (
    <button
      onClick={toggle}
      aria-label={soundOn ? 'Silenciar' : 'Activar sonido ambiental'}
      className="pointer-events-auto flex items-center gap-2 rounded-full border border-gold/40 bg-night/70 px-3.5 py-2 text-gold backdrop-blur-sm transition-all hover:bg-night/90 active:scale-95"
    >
      <svg
        width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M11 5 6 9H2v6h4l5 4V5Z" />
        {soundOn ? (
          <>
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </>
        ) : (
          <path d="M22 9l-6 6M16 9l6 6" />
        )}
      </svg>
      <span className="font-heading text-[10px] uppercase tracking-[0.2em]">
        {soundOn ? 'Sonido' : 'Mudo'}
      </span>
    </button>
  )
}
