export interface Placement {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
}

const TAU = Math.PI * 2

function ring(count: number, radius: number, heightBase: number, heightVar: number): Placement[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * TAU + (i % 2 === 0 ? 0.15 : -0.1)
    const r = radius * (0.85 + 0.3 * Math.sin(i * 2.1))
    const height = heightBase + heightVar * Math.sin(i * 1.7 + 0.4)
    return {
      position: [Math.cos(angle) * r, height, Math.sin(angle) * r],
      rotation: [0, angle, Math.sin(i) * 0.12],
      scale: 0.9 + 0.2 * Math.cos(i * 1.3),
    }
  })
}

// Stems: tall, thin, fan outward from the vase mouth. Height is the stem's
// own length (the geometry is a unit cylinder scaled on Y).
export const stemPlacements: Placement[] = ring(6, 0.1, 0.78, 0.22)

// Greenery fronds cluster lower and wider than the stems, filling the
// silhouette before the focal blooms arrive.
export const frondPlacements: Placement[] = ring(7, 0.16, 0.5, 0.16)
export const leafPlacements: Placement[] = ring(5, 0.13, 0.62, 0.14)

// Focal blooms sit near the top of the tallest stems.
export const focalPlacements: Placement[] = [
  { position: [0, 1.42, 0.02], rotation: [0.1, 0.4, 0], scale: 1.15 },
  { position: [-0.16, 1.28, -0.08], rotation: [-0.2, 1.1, 0.1], scale: 0.9 },
  { position: [0.17, 1.22, 0.1], rotation: [0.15, -0.7, -0.1], scale: 0.85 },
]

// Small accent berries scattered through the gaps.
export const accentPlacements: Placement[] = ring(8, 0.14, 0.68, 0.28)

// A single brass tie ribbon wraps the stems just above the vase mouth.
export const tiePlacement: Placement = {
  position: [0, 0.22, 0],
  rotation: [Math.PI / 2, 0, 0],
  scale: 1,
}
