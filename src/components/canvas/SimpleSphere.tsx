import { MeshWobbleMaterial, Sphere } from '@react-three/drei'
import { Vector3 } from '@react-three/fiber'

interface SimpleSphereProps {
  color?: string
  position?: Vector3
  scale?: Vector3
  reflector?: boolean
  scale1D?: number
  glossy?: boolean
  clear?: boolean
  wobble?: boolean
}

export const SimpleSphere: React.FC<SimpleSphereProps> = ({
  color,
  position,
  scale,
  scale1D,
  glossy,
  clear,
  wobble,
}) => {
  const sphereColor = color || '#353540'
  const p = position || [0, 0, 0]

  const roughness = glossy ? 0.05 : 1
  const metalness = glossy ? 0.95 : 0.6
  return (
    <Sphere
      castShadow
      position={p}
      args={[1, 20, 20]}
      scale={scale1D ? [scale1D, scale1D, scale1D] : scale}
      receiveShadow
    >
      {!clear && !wobble && (
        <meshStandardMaterial roughness={roughness} metalness={metalness} color={sphereColor} reflectivity={1} />
      )}
      {wobble && <MeshWobbleMaterial color={sphereColor} factor={100} speed={3} />}
      {clear && (
        <meshPhysicalMaterial
          transparent
          envMapIntensity={0}
          opacity={0.5} // Makes it see-through
          transmission={0.95} // Full light passing through
          roughness={0} // No roughness for clean reflections
          thickness={0.2} // Simulates a thin surface
          clearcoat={1} // Reflective outer layer
          clearcoatRoughness={0} // Slightly rough for realism
          reflectivity={0.9} // Reflects surroundings
          iridescence={1} // Enables rainbow-like effect
          iridescenceIOR={5} // Controls color shifts
          iridescenceThicknessRange={[100, 400]} // Adjusts rainbow effect
          color={'white'} // Neutral base
        />
      )}

      {/* <meshLambertMaterial color={sphereColor} /> */}
      {/* <meshToonMaterial color={sphereColor} /> */}
    </Sphere>
  )
}
