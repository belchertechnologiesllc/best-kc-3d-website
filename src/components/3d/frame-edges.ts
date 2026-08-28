export interface EdgeBar {
  position: [number, number, number]
  size: [number, number, number]
}

/** Twelve brass bars describing the wireframe edges of a box, so the
 * vitrine reads as a brass-framed case rather than a solid block. */
export function buildFrameEdges(
  width: number,
  depth: number,
  height: number,
  yBase: number,
  thickness: number,
): EdgeBar[] {
  const hw = width / 2
  const hd = depth / 2
  const yTop = yBase + height
  const yMid = yBase + height / 2
  const bars: EdgeBar[] = []

  // Vertical corner posts.
  for (const x of [-hw, hw]) {
    for (const z of [-hd, hd]) {
      bars.push({ position: [x, yMid, z], size: [thickness, height, thickness] })
    }
  }

  // Top and bottom rectangles.
  for (const y of [yBase, yTop]) {
    for (const z of [-hd, hd]) {
      bars.push({ position: [0, y, z], size: [width, thickness, thickness] })
    }
    for (const x of [-hw, hw]) {
      bars.push({ position: [x, y, 0], size: [thickness, thickness, depth] })
    }
  }

  return bars
}
