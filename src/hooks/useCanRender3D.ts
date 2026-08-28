import { useEffect, useState } from 'react'

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function isLowPower(): boolean {
  const nav = navigator as Navigator & { deviceMemory?: number }
  return typeof nav.deviceMemory === 'number' && nav.deviceMemory < 4
}

function evaluateCanRender3D(): boolean {
  if (typeof window === 'undefined') return false
  const mobile = window.matchMedia('(max-width: 767px)').matches
  return detectWebGL() && !mobile && !isLowPower()
}

/**
 * Gates the live hero/process WebGL canvases. Mobile viewports and
 * detected low-power or no-WebGL devices fall back to the static
 * pre-rendered frame sequence per the mobile 3D budget. Computed
 * synchronously on first render (not in an effect) so a mobile visitor
 * never triggers the lazy three.js chunk download even momentarily.
 */
export function useCanRender3D() {
  const [canRender, setCanRender] = useState(evaluateCanRender3D)

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)')
    const evaluate = () => setCanRender(evaluateCanRender3D())
    mobileQuery.addEventListener('change', evaluate)
    return () => mobileQuery.removeEventListener('change', evaluate)
  }, [])

  return canRender
}
