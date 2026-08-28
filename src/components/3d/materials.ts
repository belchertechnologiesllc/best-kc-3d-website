import * as THREE from 'three'

export function createBrassMaterial(roughness = 0.35) {
  const material = new THREE.MeshPhysicalMaterial({
    color: '#b08d57',
    metalness: 1,
    roughness,
    envMapIntensity: 1.3,
    clearcoat: 0.15,
    clearcoatRoughness: 0.4,
  })
  // Anisotropic brushed-metal highlight along the vertical grain.
  material.anisotropy = 0.45
  material.anisotropyRotation = Math.PI / 2
  return material
}
