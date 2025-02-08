'use client'

import { forwardRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'

const View = forwardRef(({ children, orbit, ...props }, ref) => {
  return (
    <Three>
      {children}
      {orbit && <OrbitControls />}
    </Three>
  )
})
View.displayName = 'View'

export { View }
