// @ts-nocheck
'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState, useRef } from 'react'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import GroupedSpheres from '@/components/canvas/GroupedSpheres'
import Diamond from '@/components/decorative/Diamond'
import VerticalText from '@/components/decorative/VerticalText'
import SlideUp from '@/components/decorative/SlideUp'
import { useMotionValue, useSpring } from 'framer-motion'
import * as THREE from 'three'
import Navigation from '@/components/navigation/Navigation'
import { useTheme } from '@/theme/ThemeContext'
import { useToggled } from './contexts/ToggledContext'
import Accents from './components/Accents'
import Title from './components/Title'
import Content from './components/Content';
import FogComponent from './components/FogComponent'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <div className=' h-[1600px] w-full flex items-center justify-center'></div>,
})

const Background = () => {
  const { theme } = useTheme();
  const { toggled, setToggled } = useToggled();
  const [scrolled, setScrolled] = useState(false)
  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(entry.isIntersecting) // If the observed element is out of view, apply the background
      },
      { threshold: 0.1 }, // Trigger when 10% of the element is visible
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [observerRef.current])


  return (
    <div className='flex items-center justify-center flex-col h-[2600px]'>
      <Scene />

      <View>
        <Suspense fallback={null}>
          <FogComponent color={theme === 'dark' ? '#000000' : '#ffffff'} near={toggled ? 78 : 60} far={toggled ? 100 : 70} />
          <Environment files='/assets/brown-environment.hdr' />

          <PerspectiveCamera makeDefault fov={52} position={[58, 10, 70]} />

          <GroupedSpheres />

          {/* Ambient Light for soft illumination */}
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

      <Accents />
      <Title />
      <Content divRef={observerRef} />
    </div>
  )
}


export default Background
