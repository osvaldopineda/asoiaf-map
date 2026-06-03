// ─── Domain types ────────────────────────────────────────────────────────────

export interface Character {
  name: string
  role: string
  description: string
}

export interface HiddenLore {
  title: string
  content: string
}

/** A historical era on the timeline. */
export interface Era {
  id: string
  name: string
  hint: string
}

/** Who ruled a region during a given era, and the context. */
export interface EraInfo {
  ruler: string
  note: string
}

/** Coordinates use Leaflet CRS.Simple: [y, x] in an abstract 0–1000 plane. */
export type Point = [number, number]

export interface Region {
  id: string
  name: string
  rulingHouse: string
  words: string          // house motto
  capital: string
  geography: string
  houseColor: string     // hex — used for fill + hover glow
  polygon: Point[]
  labelAt: Point
  characters: Character[]
  hiddenLore: HiddenLore[]
  /** Ruler + context per era id (see ERAS). */
  eras: Record<string, EraInfo>
}
