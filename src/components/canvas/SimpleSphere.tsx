import { useTheme } from '@/theme/ThemeContext'
import { Sphere } from '@react-three/drei'
import { Vector3 } from '@react-three/fiber'

interface SimpleSphereProps {
  color?: string
  position?: Vector3
  scale?: Vector3
  scale1D?: number
  glossy?: boolean
  clear?: boolean
  wobble?: boolean
}

export const SimpleSphere: React.FC<SimpleSphereProps> = ({ position, scale, scale1D }) => {
  const { theme } = useTheme()

  const sphereColor = theme === 'dark' ? '#ffffff' : '#000000'
  const p = position || [0, 0, 0]

  return (
    <Sphere
      castShadow
      position={p}
      args={[1, 32, 32]}
      scale={scale1D ? [scale1D, scale1D, scale1D] : scale}
      receiveShadow
    >
      {/* @ts-expect-error - R3F material props */}
      <meshStandardMaterial roughness={1} metalness={0.6} color={sphereColor} reflectivity={1} />
    </Sphere>
  )
}
