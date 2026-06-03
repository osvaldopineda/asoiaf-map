import { useEffect, useRef } from 'react'
import { animate, createDrawable } from 'animejs'

/** Same coastline as the base map — drawn with ink on load. */
const COAST_D =
  'M480,120 C600,140 700,210 690,360 C684,470 642,520 660,620 ' +
  'C676,724 702,820 660,920 C642,1016 600,1124 520,1240 ' +
  'C470,1306 418,1250 400,1150 C382,1044 360,982 300,944 ' +
  'C238,902 250,820 300,762 C360,722 330,660 300,600 ' +
  'C270,520 300,420 360,340 C402,260 420,168 480,120 Z'

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const done = useRef(false)

  useEffect(() => {
    const finish = () => {
      if (done.current) return
      done.current = true
      onDone()
    }

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const t = setTimeout(finish, 300)
      return () => clearTimeout(t)
    }

    const [coast] = createDrawable('#load-coast')
    animate(coast, {
      draw: ['0 0', '0 1'],
      duration: 2200,
      ease: 'inOutSine',
      onComplete: () => {
        if (titleRef.current) {
          animate(titleRef.current, {
            opacity: [0, 1],
            translateY: [16, 0],
            duration: 850,
            ease: 'outExpo',
          })
        }
      },
    })

    const t = setTimeout(() => {
      if (rootRef.current) {
        animate(rootRef.current, {
          opacity: [1, 0],
          duration: 850,
          ease: 'inOutQuad',
          onComplete: finish,
        })
      } else finish()
    }, 3500)

    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      ref={rootRef}
      className="vignette fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-night"
    >
      <svg viewBox="0 0 1000 1400" className="h-[66vh] max-h-[600px] w-auto opacity-90">
        <path
          id="load-coast"
          d={COAST_D}
          fill="none"
          stroke="#c9a227"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      <div ref={titleRef} style={{ opacity: 0 }} className="absolute bottom-[12%] text-center">
        <h1 className="font-decorative text-3xl text-gold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] md:text-4xl">
          El Mundo Conocido
        </h1>
        <p className="font-heading mt-2 text-[11px] uppercase tracking-[0.35em] text-parchment/55">
          Hielo y Fuego
        </p>
      </div>
    </div>
  )
}
