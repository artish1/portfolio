import * as THREE from 'three'
import { useMotionValue, useSpring } from 'framer-motion'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { useToggled } from '@/contexts/ToggledContext'
import { useTheme } from '@/theme/ThemeContext'

const FogComponent = ({ color = '#17171b' }) => {
  const { toggled } = useToggled();
  const { theme } = useTheme();

  const near = toggled ? 78 : 60
  const far = toggled ? theme === 'light' ? 110 : 100 : 70

  const { scene } = useThree() // Get access to the scene
  const nearMotion = useMotionValue(near)
  const farMotion = useMotionValue(far)
  const animatedNear = useSpring(nearMotion, { stiffness: 100, damping: 37 })
  const animatedFar = useSpring(farMotion, { stiffness: 100, damping: 37 })

  useEffect(() => {
    nearMotion.set(near)
    farMotion.set(far)
  }, [near, far])

  useFrame(() => {
    scene.fog = new THREE.Fog(color, animatedNear.get(), animatedFar.get())
  })

  return null
}

export default FogComponent;