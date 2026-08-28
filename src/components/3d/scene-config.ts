/** True geometric center of the vitrine object (used for bloom placement
 * and as the eventual close-up target once the camera dollies in). */
export const VITRINE_CENTER: [number, number, number] = [0, 1.55, 0]

/** Wide establishing framing for the hero on load — aimed a little above
 * the vitrine's true center so it settles in the lower half of the frame,
 * leaving headroom for the headline above it. */
export const HERO_LOOK_TARGET: [number, number, number] = [0, 2.5, 0]
export const HERO_CAMERA_START: [number, number, number] = [8.8, 7.3, 14.0]
