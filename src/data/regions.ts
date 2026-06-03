import type { Region } from '../types'

/**
 * Mapa PLACEHOLDER — formas inventadas (sin IP), solo para validar la interacción.
 * Coordenadas en CRS.Simple: [y, x], plano 0–1000, el norte arriba (y alta).
 * El lore está basado en los libros de GRRM (fan-work tolerado).
 */
export const REGIONS: Region[] = [
  {
    id: 'the-north',
    name: 'El Norte',
    rulingHouse: 'Casa Stark',
    words: 'Se acerca el invierno',
    capital: 'Invernalia',
    geography:
      'La región más vasta de los Siete Reinos: bosques de centinelas, llanuras heladas y el Cuello pantanoso que la separa del sur. Sus inviernos pueden durar años.',
    houseColor: '#6e7681',
    polygon: [
      [1240, 480], [1140, 620], [1000, 640], [930, 560],
      [940, 420], [1040, 360], [1160, 380],
    ],
    labelAt: [1070, 500],
    characters: [
      {
        name: 'Eddard Stark',
        role: 'Señor de Invernalia · Guardián del Norte',
        description:
          'Hombre de honor inflexible, criado en los valores del Norte. Su sentido del deber lo lleva del frío de Invernalia a la corte de Desembarco del Rey.',
      },
      {
        name: 'Brandon el Constructor',
        role: 'Rey legendario del Invierno',
        description:
          'Figura mítica a quien se atribuye la construcción del Muro y de Invernalia, con ayuda —dicen— de gigantes y de los hijos del bosque.',
      },
    ],
    hiddenLore: [
      {
        title: 'Los Reyes del Invierno',
        content:
          'Mucho antes de la Conquista, los Stark gobernaron el Norte como reyes durante miles de años, sometiendo a rivales como los Bolton de Fuerte Terror —que en tiempos oscuros desollaban a sus enemigos.',
      },
    ],
  },
  {
    id: 'riverlands',
    name: 'Tierras de los Ríos',
    rulingHouse: 'Casa Tully',
    words: 'Familia, Deber, Honor',
    capital: 'Aguasdulces',
    geography:
      'Tierras fértiles regadas por el Tridente y sus afluentes. Su posición central las vuelve campo de batalla recurrente: quien controla los ríos controla el corazón de Poniente.',
    houseColor: '#2f6db0',
    polygon: [
      [860, 430], [840, 610], [740, 640], [680, 560],
      [700, 440], [790, 380],
    ],
    labelAt: [770, 510],
    characters: [
      {
        name: 'Hoster Tully',
        role: 'Señor de Aguasdulces',
        description:
          'Patriarca astuto que tejió alianzas mediante los matrimonios de sus hijas, situando a su casa en el centro de la política del reino.',
      },
      {
        name: 'Brynden «Pez Negro» Tully',
        role: 'Caballero y comandante',
        description:
          'Tío rebelde y soldado legendario. Renunció a casarse para fastidio de su hermano, y adoptó como sigil un pez negro en vez de la trucha plateada.',
      },
    ],
    hiddenLore: [
      {
        title: 'Una corona que nunca tuvieron',
        content:
          'Las Tierras de los Ríos jamás sostuvieron una dinastía estable: fueron conquistadas por tormenta, roca y ándalos. Los Tully ascendieron tarde, al apoyar a Aegon el Conquistador contra el cruel rey Harren el Negro.',
      },
    ],
  },
  {
    id: 'westerlands',
    name: 'El Occidente',
    rulingHouse: 'Casa Lannister',
    words: '¡Oíd mi rugido!',
    capital: 'Roca Casterly',
    geography:
      'Colinas verdes que esconden las minas de oro más ricas del mundo conocido. Su capital, Roca Casterly, es una fortaleza tallada en una montaña sobre el mar del Ocaso.',
    houseColor: '#b01c1c',
    polygon: [
      [760, 380], [640, 420], [540, 370], [530, 290],
      [620, 255], [730, 300],
    ],
    labelAt: [635, 335],
    characters: [
      {
        name: 'Tywin Lannister',
        role: 'Señor de Roca Casterly · Mano del Rey',
        description:
          'El hombre más temido de Poniente. Restauró el poder y el orgullo de su casa con una mezcla implacable de oro, cálculo y crueldad calculada.',
      },
      {
        name: 'Lann el Astuto',
        role: 'Fundador legendario',
        description:
          'Héroe embaucador de la Era de los Héroes. La leyenda dice que arrebató Roca Casterly a la Casa Casterly solo con ingenio y engaños.',
      },
    ],
    hiddenLore: [
      {
        title: 'El oro que mueve los hilos',
        content:
          'El célebre «Un Lannister siempre paga sus deudas» no es el lema oficial de la casa, sino un dicho que inspira tanto respeto como temor. Su poder real nace del oro inagotable de sus minas… que en los libros empieza, ominosamente, a agotarse.',
      },
    ],
  },
]

export const REGION_MAP: Record<string, Region> = Object.fromEntries(
  REGIONS.map((r) => [r.id, r]),
)

/** World bounds for CRS.Simple — matches the 1000×1400 map canvas (y up to 1400). */
export const WORLD_BOUNDS: [[number, number], [number, number]] = [
  [0, 0],
  [1400, 1000],
]

/** Path to the stylized base map (IP-safe, our own). */
export const WORLD_MAP_SRC = '/world-map.svg'
