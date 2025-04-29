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

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <div className=' h-[1600px] w-full flex items-center justify-center'></div>,
})

const Background = () => {
  const [toggled, setToggled] = useState(false)
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
          <FogComponent color='#000000' near={toggled ? 78 : 60} far={toggled ? 100 : 70} />
          <Environment files='/assets/brown-environment.hdr' />

          <PerspectiveCamera makeDefault fov={52} position={[58, 10, 70]} />

          <GroupedSpheres />

          {/* Ambient Light for soft illumination */}
          <ambientLight intensity={0.45} />

          <directionalLight
            castShadow
            position={[0, 20, 40]}
            color='#ffffff'
            intensity={5.9}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-bottom={-10}
            shadow-camera-top={10}
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-bias={0.05}
          />

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

const Title = () => {
  return <div className="absolute right-[50%] bottom-[60%] translate-y-[50%] translate-x-[50%] mix-blend-difference ">
    <h3 className=" leading-[100%] text-center text-[9rem] filter invert font-extrabold uppercase">Creative <b/> Developer</h3>
  </div>
}

const Accents = () => {
  return (
    <div className='absolute bottom-0 translate-y-[-50%] left-10  '>
      <VerticalText text='2025.02.07' className='text-xs font-bold opacity-50' />
    </div>
  )
}

const Content = ({ divRef }) => {
  return (
    <div
      ref={divRef}
      className='absolute top-[100vh] z-7 left-[50%] translate-x-[-50%] max-w-5xl w-full h-[2500px] flex items-start justify-center '
    >
      <div className='w-[600px] h-[400px] bg-decorative-primary rounded-lg'></div>
    </div>
  )
}

const FogComponent = ({ color = '#17171b', near = 5, far = 15 }) => {
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

export default Background
