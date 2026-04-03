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
            color={theme === 'dark' ? '#28231F' : '#ffffff'}
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
      <SocialLinks visible={toggled} />
      <ScrollIndicator visible={toggled} />
      <Content divRef={observerRef} />
    </div>
  )
}

const SocialLinks = ({ visible }: { visible: boolean }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: visible ? 1 : 0 }}
    transition={{ duration: 0.6, delay: 1.2 }}
    className='fixed bottom-0 left-8 z-40 hidden md:flex flex-col items-center gap-5'
  >
    <a
      href='https://github.com/artish1'
      target='_blank'
      rel='noopener noreferrer'
      className='text-white/30 hover:text-accent transition-colors duration-200'
      aria-label='GitHub'
    >
      <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
        <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
      </svg>
    </a>
    <a
      href='https://linkedin.com/in/mark-artishuk'
      target='_blank'
      rel='noopener noreferrer'
      className='text-white/30 hover:text-accent transition-colors duration-200'
      aria-label='LinkedIn'
    >
      <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
        <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
      </svg>
    </a>
    <div className='w-px h-20 bg-white/15' />
  </motion.div>
)

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
        stroke='#C8A47E'
        strokeWidth='1.5'
        strokeLinecap='round'
        opacity='0.4'
      >
        <rect x='1' y='1' width='18' height='26' rx='9' />
        <line x1='10' y1='7' x2='10' y2='12' />
      </svg>
    </motion.div>
  </motion.div>
)

export default Background
