/** True geometric center of the vitrine object (used for bloom placement
 * and as the eventual close-up target once the camera dollies in). */
export const VITRINE_CENTER: [number, number, number] = [0, 1.55, 0]

/** Wide establishing framing for the hero on load — aimed a little above
 * the vitrine's true center so it settles in the lower half of the frame,
 * leaving headroom for the headline above it. */
export const HERO_LOOK_TARGET: [number, number, number] = [0, 2.5, 0]
export const HERO_CAMERA_START: [number, number, number] = [8.8, 7.3, 14.0]

/** Tight framing the camera dollies into across the five build stages,
 * holding on the finished bouquet inside the glass. */
export const HERO_LOOK_CLOSE: [number, number, number] = [0, 1.75, 0]
export const HERO_CAMERA_CLOSE: [number, number, number] = [2.1, 2.15, 3.4]

/** Anchor point (roughly the vase mouth) that every stem, bloom, and tie
 * element in the build sequence is positioned relative to. */
export const VASE_MOUTH: [number, number, number] = [0, 1.0, 0]
