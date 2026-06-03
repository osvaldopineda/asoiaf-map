import { useEffect, useRef } from 'react'
import { AmbientEngine } from '../audio/ambient'
import { useAppStore } from '../store/useAppStore'

/** Drives the procedural ambient engine from store state. Mount once. */
export function useAmbientSound() {
  const regionId = useAppStore((s) => s.selectedRegionId)
  const soundOn = useAppStore((s) => s.soundOn)
  const engineRef = useRef<AmbientEngine | null>(null)

  useEffect(() => {
    const engine = new AmbientEngine()
    engineRef.current = engine
    return () => engine.dispose()
  }, [])

  // Enable/disable on toggle (resume() runs from the click gesture)
  useEffect(() => {
    engineRef.current?.setEnabled(soundOn)
  }, [soundOn])

  // Crossfade to the selected region's scape (base when none)
  useEffect(() => {
    if (soundOn) engineRef.current?.transitionTo(regionId)
  }, [regionId, soundOn])
}
