// @ts-nocheck
'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState, useRef } from 'react'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import GroupedSpheres from '@/components/canvas/GroupedSpheres'
import Navigation from '@/components/navigation/Navigation'
import { useTheme } from '@/theme/ThemeContext'
import { useToggled } from './contexts/ToggledContext'
import Title from './components/Title'
import Content from './components/Content'
import FogComponent from './components/FogComponent'
import { motion } from 'motion/react'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <div className='h-[1600px] w-full flex items-center justify-center'></div>,
})

const Background = () => {
  const { theme } = useTheme()
  const { toggled, setToggled } = useToggled()
  const [scrolled, setScrolled] = useState(false)
  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const current = observerRef.current
    if (!current) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    observer.observe(current)

    return () => {
      observer.unobserve(current)
    }
  }, [])

  return (
    <div className='flex items-center justify-center flex-col h-[2600px]'>
      <Scene />

      <View>
        <Suspense fallback={null}>
          <FogComponent
            color={theme === 'dark' ? '#000000' : '#ffffff'}
            near={toggled ? 78 : 60}
            far={toggled ? 100 : 70}
          />
          <Environment files='/assets/brown-environment.hdr' />

          <PerspectiveCamera makeDefault fov={52} position={[58, 10, 70]} />

          <GroupedSpheres />

          <ambientLight intensity={0.7} />
          <directionalLight castShadow position={[13, 6, 8]} intensity={1.2} />
        </Suspense>
      </View>

      <Navigation
        scrolled={scrolled}
        onAnimationComplete={() => {
          setToggled(true)
        }}
      />

      <Title />
      <ScrollIndicator visible={toggled} />
      <Content divRef={observerRef} />
    </div>
  )
}

const ScrollIndicator = ({ visible }: { visible: boolean }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: visible ? 1 : 0 }}
    transition={{ duration: 0.6, delay: 1 }}
    className='absolute bottom-8 left-[50%] translate-x-[-50%] flex flex-col items-center gap-2'
  >
    <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
      <svg
        width='20'
        height='28'
        viewBox='0 0 20 28'
        fill='none'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        opacity='0.35'
      >
        <rect x='1' y='1' width='18' height='26' rx='9' />
        <line x1='10' y1='7' x2='10' y2='12' />
      </svg>
    </motion.div>
  </motion.div>
)

export default Background
