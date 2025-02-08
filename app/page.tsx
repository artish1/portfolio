// @ts-nocheck

'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState } from 'react'
import { Environment, PerspectiveCamera, Stats } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import GroupedSpheres from '@/components/canvas/GroupedSpheres'
import Diamond from '@/components/decorative/Diamond'
import VerticalText from '@/components/decorative/VerticalText'
import SlideUp from '@/components/decorative/SlideUp'
import { useMotionValue, useSpring } from 'framer-motion'
import * as THREE from 'three'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <div className=' h-[1600px] w-full flex items-center justify-center'></div>,
})

const Background = () => {
  const [toggled, setToggled] = useState(false)

  return (
    <div className='flex items-center justify-center flex-col h-[2600px]'>
      <Scene />

      <View>
        <Suspense fallback={null}>
          <Stats />
          <FogComponent color='#17171b' near={toggled ? 78 : 60} far={toggled ? 100 : 70} />
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
            shadow-mapSize-width={512} // Increase to 2048 or 4096 for better quality
            shadow-mapSize-height={512}
            shadow-bias={0.05} // Adjust the bias to refine shadows
          />

          <directionalLight castShadow position={[13, 6, 8]} intensity={1.2} />
        </Suspense>
      </View>

      <UI
        onAnimationComplete={() => {
          setToggled(true)
        }}
      />
      <Accents />

      <Content />
    </div>
  )
}

const headerAnimationOffset = 0.6
const staggerDelay = 0.2

const Header = ({ onAnimationComplete }) => {
  return (
    <div className='flex items-center justify-between text-main-1 text-xs font-bold space-x-6 w-full mx-12'>
      <SlideUp delay={staggerDelay * 3 + headerAnimationOffset} onComplete={onAnimationComplete}>
        <p className='font-bold'>ABOUT</p>
      </SlideUp>

      <SlideUp delay={staggerDelay * 2 + headerAnimationOffset}>
        <Diamond />
      </SlideUp>

      <SlideUp delay={staggerDelay + headerAnimationOffset}>
        <p className='font-bold'>SKILLS</p>
      </SlideUp>

      <SlideUp delay={headerAnimationOffset}>
        <h1 className='text-white text-2xl text-center w-60'>MARK ARTISHUK</h1>
      </SlideUp>

      <SlideUp delay={staggerDelay + headerAnimationOffset}>
        <p className='font-bold'>PROJECTS</p>
      </SlideUp>

      <SlideUp delay={staggerDelay * 2 + headerAnimationOffset}>
        <Diamond />
      </SlideUp>

      <SlideUp delay={staggerDelay * 3 + headerAnimationOffset}>
        <p className='font-bold'>RESUME</p>
      </SlideUp>
    </div>
  )
}

const Accents = () => {
  return (
    <div className='absolute bottom-0 translate-y-[-50%] left-10  '>
      <VerticalText text='2025.02.07' className='text-xs font-bold opacity-50' />
    </div>
  )
}

const Content = () => {
  return (
    <div className='absolute top-[100vh] z-7 left-[50%] translate-x-[-50%] max-w-5xl w-full h-[2500px] flex items-start justify-center '>
      <div className='w-[600px] h-[400px] bg-decorative-primary rounded-lg'></div>
    </div>
  )
}

const UI = ({ onAnimationComplete }) => {
  return (
    <div className='absolute z-5 top-0 left-[50%] translate-x-[-50%] max-w-4xl w-full h-full flex items-start justify-center'>
      <div className='flex items-center justify-center mt-8 w-full '>
        <Header onAnimationComplete={onAnimationComplete} />
      </div>
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
