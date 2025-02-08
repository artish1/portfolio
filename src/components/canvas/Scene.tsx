'use client'

import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { r3f } from '@/helpers/global'
import * as THREE from 'three'

export default function Scene({ ...props }) {
  return (
    <Canvas
      {...props}
      shadows
      dpr={[0.8, 1.2]}
      onCreated={(state) => {
        state.gl.outputColorSpace = THREE.SRGBColorSpace
        state.gl.toneMapping = THREE.LinearToneMapping
      }}
    >
      {/* @ts-ignore */}
      <r3f.Out />
      <Preload all />
    </Canvas>
  )
}
