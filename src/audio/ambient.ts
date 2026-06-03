/**
 * Procedural ambient soundscapes via the Web Audio API.
 * No audio files, no licensing — every texture is synthesised from filtered
 * noise + LFOs (+ a drone for the goldmines). Swappable for real tracks later.
 */

type ScapeKey = 'base' | 'the-north' | 'riverlands' | 'westerlands'

interface Scape {
  key: ScapeKey
  gain: GainNode
  stop: () => void
}

const FADE = 1.4 // seconds

function scapeForRegion(regionId: string | null): ScapeKey {
  if (regionId === 'the-north' || regionId === 'riverlands' || regionId === 'westerlands') {
    return regionId
  }
  return 'base'
}

export class AmbientEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private noise: AudioBuffer | null = null
  private active: Scape | null = null
  private enabled = false

  private ensure() {
    if (this.ctx) return
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctor()
    const master = ctx.createGain()
    master.gain.value = 0.0001
    master.connect(ctx.destination)

    const len = Math.floor(ctx.sampleRate * 2)
    const buf = ctx.createBuffer(1, len, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1

    this.ctx = ctx
    this.master = master
    this.noise = buf
  }

  async setEnabled(on: boolean) {
    this.enabled = on
    if (on) {
      this.ensure()
      await this.ctx!.resume()
      const t = this.ctx!.currentTime
      this.master!.gain.cancelScheduledValues(t)
      this.master!.gain.setValueAtTime(Math.max(0.0001, this.master!.gain.value), t)
      this.master!.gain.linearRampToValueAtTime(0.85, t + 0.8)
    } else if (this.ctx && this.master) {
      const t = this.ctx.currentTime
      this.master.gain.cancelScheduledValues(t)
      this.master.gain.linearRampToValueAtTime(0.0001, t + 0.6)
    }
  }

  transitionTo(regionId: string | null) {
    if (!this.enabled) return
    this.ensure()
    const key = scapeForRegion(regionId)
    if (this.active?.key === key) return

    const old = this.active
    this.active = this.build(key)

    const t = this.ctx!.currentTime
    this.active.gain.gain.setValueAtTime(0.0001, t)
    this.active.gain.gain.linearRampToValueAtTime(1, t + FADE)
    old?.stop()
  }

  dispose() {
    this.active?.stop()
    this.active = null
    if (this.ctx) {
      this.ctx.close().catch(() => {})
      this.ctx = null
    }
  }

  // ── Soundscape factory ───────────────────────────────────────────────────
  private build(key: ScapeKey): Scape {
    const ctx = this.ctx!
    const g = ctx.createGain()
    g.gain.value = 0.0001
    g.connect(this.master!)

    const stoppers: Array<() => void> = []

    const noiseLayer = (
      type: BiquadFilterType, freq: number, q: number, level: number,
      modFreq?: number, modDepth?: number,
    ) => {
      const src = ctx.createBufferSource()
      src.buffer = this.noise
      src.loop = true
      const filter = ctx.createBiquadFilter()
      filter.type = type
      filter.frequency.value = freq
      filter.Q.value = q
      const lvl = ctx.createGain()
      lvl.gain.value = level
      src.connect(filter); filter.connect(lvl); lvl.connect(g)
      src.start()
      stoppers.push(() => { try { src.stop() } catch { /* already stopped */ } })

      if (modFreq && modDepth) {
        const lfo = ctx.createOscillator()
        lfo.frequency.value = modFreq
        const depth = ctx.createGain()
        depth.gain.value = modDepth
        lfo.connect(depth); depth.connect(filter.frequency)
        lfo.start()
        stoppers.push(() => { try { lfo.stop() } catch { /* noop */ } })
      }
      return { filter, lvl }
    }

    const droneLayer = (freq: number, level: number, detune: number) => {
      ;[0, detune].forEach((d) => {
        const osc = ctx.createOscillator()
        osc.type = 'sine'
        osc.frequency.value = freq
        osc.detune.value = d
        const lvl = ctx.createGain()
        lvl.gain.value = level
        osc.connect(lvl); lvl.connect(g)
        osc.start()
        stoppers.push(() => { try { osc.stop() } catch { /* noop */ } })
      })
    }

    switch (key) {
      case 'the-north': // cold gusting wind — bright, moving
        noiseLayer('lowpass', 820, 0.6, 0.20, 0.13, 360)
        noiseLayer('highpass', 500, 0.4, 0.05, 0.07, 200)
        break
      case 'riverlands': // flowing water — mid band, gentle ripple
        noiseLayer('bandpass', 640, 0.8, 0.20, 0.5, 220)
        noiseLayer('lowpass', 300, 0.5, 0.10, 0.2, 80)
        break
      case 'westerlands': // cavernous goldmines — low drone + rumble
        droneLayer(55, 0.10, 8)
        noiseLayer('lowpass', 180, 0.7, 0.07, 0.06, 40)
        break
      default: // base — calm distant sea breeze
        noiseLayer('lowpass', 420, 0.5, 0.16, 0.08, 120)
        break
    }

    const stop = () => {
      const t = ctx.currentTime
      g.gain.cancelScheduledValues(t)
      g.gain.setValueAtTime(g.gain.value, t)
      g.gain.linearRampToValueAtTime(0.0001, t + FADE)
      window.setTimeout(() => {
        stoppers.forEach((s) => s())
        g.disconnect()
      }, FADE * 1000 + 100)
    }

    return { key, gain: g, stop }
  }
}
