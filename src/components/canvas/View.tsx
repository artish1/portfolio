'use client'

import { ReactNode } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'

interface ViewProps {
  children: ReactNode
  orbit?: boolean
}

const View: React.FC<ViewProps> = ({ children, orbit }) => {
  return (
    <Three>
      {children}
      {orbit && <OrbitControls />}
    </Three>
  )
}
View.displayName = 'View'

export { View }
