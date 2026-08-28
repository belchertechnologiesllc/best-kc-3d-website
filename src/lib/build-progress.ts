/**
 * Plain mutable object (not React state) shared between the GSAP
 * ScrollTrigger timeline and the R3F useFrame loop. GSAP tweens these
 * numbers directly; the 3D scene reads them every frame. Keeping this
 * outside React avoids a re-render on every scroll tick.
 */
export const buildProgress = {
  stem: 0,
  greenery: 0,
  focal: 0,
  accent: 0,
  tie: 0,
}

export const STAGE_KEYS = ['stem', 'greenery', 'focal', 'accent', 'tie'] as const
export type StageKey = (typeof STAGE_KEYS)[number]
