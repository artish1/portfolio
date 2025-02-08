import { colors } from '@/theme/colors'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

import { SimpleSphere } from './SimpleSphere'

const GroupedSpheres = () => {
  const groupRef = useRef<any>(null)
  const { camera } = useThree()

  useEffect(() => {
    if (groupRef.current && camera) {
      const { x, y, z } = groupRef.current.position
      camera.lookAt(x, y - 30, z)
    }
  }, [groupRef?.current, camera])

  useFrame((state, delta) => {
    const rotationSpeed = 0.25
    groupRef.current.rotation.y += rotationSpeed * delta
  })

  return (
    <>
      <group ref={groupRef} position={[0, 3.5, 0]}>
        <SimpleSphere color={colors.primary} scale1D={3.3} position={[0, -1, 2.1]} />
        <SimpleSphere color={colors.accent2} scale1D={2.8} position={[0, 2.8, -2.8]} />
        <SimpleSphere color={colors.light} scale1D={2} position={[-2, 5, 3.5]} />
        <SimpleSphere color={colors.accent3} scale1D={2.65} position={[2.8, 3.9, 3]} />
        <SimpleSphere color={colors.secondary} scale1D={2.5} position={[0, -4, -3]} />
        <SimpleSphere color={colors.light} scale1D={2.1} position={[-2.5, -3.2, 6]} />
        <SimpleSphere color={colors.accent2} scale1D={2.7} position={[5, -3, -0]} />

        <SimpleSphere color={colors.secondary} position={[-2.3, 2.8, 1]} scale1D={1.3} />

        <SimpleSphere glossy color={colors.primary} position={[-4, 1.5, -0.7]} scale1D={1.4} />
        <SimpleSphere glossy color={colors.accent3} position={[3, -4, 3.3]} scale1D={1.3} />
        <SimpleSphere color={colors.light} position={[3.5, 1, 0]} scale1D={1.3} />
        <SimpleSphere color={colors.accent2} position={[-1.5, -4.4, 0.2]} scale1D={1} />
        <SimpleSphere glossy color={colors.accent2} position={[-1.5, -6.5, 3]} scale1D={2.3} />
        <SimpleSphere color={colors.accent1} position={[-3.5, -10.5, 0]} scale1D={2.3} />
        <SimpleSphere glossy color={colors.light} position={[1.8, -6.7, 0.3]} scale1D={2.1} />
        <SimpleSphere color={colors.primary} clear position={[2.5, -11.9, -2.5]} scale1D={3.8} />
        <SimpleSphere color={colors.secondary} position={[4.5, -8.7, 1.8]} scale1D={1.7} />
        <SimpleSphere color={colors.accent1} position={[4.8, 0, 4]} scale1D={1.9} />
        <SimpleSphere color={colors.dark1} position={[-5.6, -3, 0]} scale1D={3} />
        {/* <SimpleSphere glossy color={colors.light} position={[1.8, -7.5, 0]} scale1D={2.1} /> */}
      </group>
    </>
  )
}

export default GroupedSpheres
