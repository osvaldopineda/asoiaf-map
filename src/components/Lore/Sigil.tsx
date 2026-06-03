import { useEffect, useRef } from 'react'
import { animate, createDrawable, stagger } from 'animejs'

/**
 * Emblemas heráldicos ORIGINALES (formas propias, sin IP) por región.
 * Cada trazo lleva la clase `sigil-stroke` para dibujarse con anime.js.
 */
const EMBLEMS: Record<string, JSX.Element> = {
  // El Norte — estrella de invierno (copo de nieve estilizado)
  'the-north': (
    <>
      <line className="sigil-stroke" x1="50" y1="22" x2="50" y2="78" />
      <line className="sigil-stroke" x1="26" y1="36" x2="74" y2="64" />
      <line className="sigil-stroke" x1="74" y1="36" x2="26" y2="64" />
      <path className="sigil-stroke" d="M50,24 l-6,8 M50,24 l6,8" />
      <path className="sigil-stroke" d="M50,76 l-6,-8 M50,76 l6,-8" />
      <path className="sigil-stroke" d="M28,37 l1,10 M28,37 l9,-2" />
      <path className="sigil-stroke" d="M72,63 l-1,-10 M72,63 l-9,2" />
      <path className="sigil-stroke" d="M72,37 l-9,-2 M72,37 l1,10" />
      <path className="sigil-stroke" d="M28,63 l9,2 M28,63 l-1,-10" />
    </>
  ),
  // Tierras de los Ríos — pez saltando
  riverlands: (
    <>
      <path className="sigil-stroke" d="M30,52 C42,38 64,38 76,52 C64,66 42,66 30,52 Z" />
      <path className="sigil-stroke" d="M30,52 L17,43 L22,52 L17,61 Z" />
      <circle className="sigil-stroke" cx="64" cy="48" r="2.6" fill="none" />
    </>
  ),
  // El Occidente — sol/moneda (riqueza)
  westerlands: (
    <>
      <circle className="sigil-stroke" cx="50" cy="50" r="11" fill="none" />
      <line className="sigil-stroke" x1="64" y1="50" x2="80" y2="50" />
      <line className="sigil-stroke" x1="60" y1="60" x2="71" y2="71" />
      <line className="sigil-stroke" x1="50" y1="64" x2="50" y2="80" />
      <line className="sigil-stroke" x1="40" y1="60" x2="29" y2="71" />
      <line className="sigil-stroke" x1="36" y1="50" x2="20" y2="50" />
      <line className="sigil-stroke" x1="40" y1="40" x2="29" y2="29" />
      <line className="sigil-stroke" x1="50" y1="36" x2="50" y2="20" />
      <line className="sigil-stroke" x1="60" y1="40" x2="71" y2="29" />
    </>
  ),
}

export default function Sigil({ regionId, color }: { regionId: string; color: string }) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const strokes = Array.from(root.querySelectorAll<SVGElement>('.sigil-stroke'))
    const drawables = createDrawable(strokes)

    animate(root, { opacity: [0, 1], scale: [0.8, 1], duration: 600, ease: 'outExpo' })
    animate(drawables, {
      draw: ['0 0', '0 1'],
      duration: 1100,
      delay: stagger(70),
      ease: 'inOutSine',
    })
  }, [regionId])

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      className="h-16 w-16 shrink-0"
      style={{ color, opacity: 0 }}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle className="sigil-stroke" cx="50" cy="50" r="44" />
      {EMBLEMS[regionId]}
    </svg>
  )
}
