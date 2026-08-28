import * as THREE from 'three'

/**
 * 7 stylized, low-poly geometries shared across every instance of each
 * type (created once at module scope — never re-created per bloom).
 */
export const geometries = {
  stem: new THREE.CylinderGeometry(0.012, 0.016, 1, 5, 1),
  leaf: new THREE.ConeGeometry(0.05, 0.22, 4, 1),
  frond: new THREE.ConeGeometry(0.035, 0.42, 3, 1),
  focalBloom: new THREE.IcosahedronGeometry(0.11, 0),
  focalCenter: new THREE.IcosahedronGeometry(0.045, 0),
  accentBerry: new THREE.IcosahedronGeometry(0.035, 0),
  tieRibbon: new THREE.TorusGeometry(0.09, 0.02, 6, 16),
}

export function disposeGeometries() {
  Object.values(geometries).forEach((g) => g.dispose())
}
