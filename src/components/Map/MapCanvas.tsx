import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { REGIONS, WORLD_BOUNDS, WORLD_MAP_SRC } from '../../data/regions'
import { useAppStore } from '../../store/useAppStore'

const BASE_STYLE = { weight: 1.5, fillOpacity: 0.16 }
const HOVER_STYLE = { weight: 3, fillOpacity: 0.4 }
const ACTIVE_STYLE = { weight: 3.5, fillOpacity: 0.46 }

/**
 * Map engine, isolated behind this component (Leaflet + CRS.Simple).
 * Swapping to MapLibre/deck.gl later means rewriting only this file.
 */
export default function MapCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const layersRef = useRef<Record<string, L.Polygon>>({})
  const select = useAppStore((s) => s.select)
  const selectedRegionId = useAppStore((s) => s.selectedRegionId)

  // ── Init map once ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      crs: L.CRS.Simple,
      minZoom: -2,
      maxZoom: 2,
      zoomSnap: 0.25,
      zoomControl: false,
      attributionControl: false,
    })
    map.fitBounds(WORLD_BOUNDS)
    map.setMaxBounds(L.latLngBounds(WORLD_BOUNDS[0], WORLD_BOUNDS[1]).pad(0.4))
    L.control.zoom({ position: 'bottomright' }).addTo(map)
    mapRef.current = map

    // Stylized base map (our own SVG) under the interactive regions
    L.imageOverlay(WORLD_MAP_SRC, WORLD_BOUNDS).addTo(map)

    REGIONS.forEach((region) => {
      const poly = L.polygon(region.polygon, {
        color: region.houseColor,
        fillColor: region.houseColor,
        opacity: 0.85,
        className: 'region-shape',
        ...BASE_STYLE,
      }).addTo(map)

      poly.bindTooltip(region.name, {
        permanent: true,
        direction: 'center',
        className: 'region-label',
      })

      poly.on('mouseover', () => {
        if (useAppStore.getState().selectedRegionId !== region.id) poly.setStyle(HOVER_STYLE)
      })
      poly.on('mouseout', () => {
        if (useAppStore.getState().selectedRegionId !== region.id) poly.setStyle(BASE_STYLE)
      })
      poly.on('click', () => select(region.id))

      layersRef.current[region.id] = poly
    })

    return () => {
      map.remove()
      mapRef.current = null
      layersRef.current = {}
    }
  }, [select])

  // ── React to selection: highlight + fly ──────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    REGIONS.forEach((r) => layersRef.current[r.id]?.setStyle(BASE_STYLE))

    if (selectedRegionId) {
      const layer = layersRef.current[selectedRegionId]
      if (layer) {
        layer.setStyle(ACTIVE_STYLE)
        map.flyToBounds(layer.getBounds(), {
          paddingTopLeft: [40, 60],
          paddingBottomRight: [440, 60], // leave room for the lore panel
          duration: 1.1,
        })
      }
    } else {
      map.flyToBounds(WORLD_BOUNDS, { duration: 1.0 })
    }
  }, [selectedRegionId])

  return <div ref={containerRef} className="absolute inset-0" />
}
