'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'

const Box = dynamic(() => import('@/components/Box'), { ssr: false })
const PhotoAlbum = dynamic(() => import('@/components/PhotoAlbum'), { ssr: false })
const FloatingHearts = dynamic(() => import('@/components/FloatingHearts'), { ssr: false })

export default function PaperBox() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 relative bg-gradient-radial from-blue-200 via-blue-50 to-white">
      {/* Blue Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <FloatingHearts color="text-blue-300" />
      </div>

      {/* Back Button */}
      <Link
        href="/"
        className="fixed top-4 left-4 z-20 bg-white/90 hover:bg-white px-6 py-2.5 rounded-full shadow-lg 
                 text-blue-600 font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
      >
        ← Back to Main
      </Link>

      {/* Box Section */}
      <div className="w-full h-[70vh] relative mt-8">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.7} />
            <pointLight position={[10, 10, 10]} />
            <Box isLocked={false} isOpening={false} />
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* Box Photos Section */}
      <div className="w-full max-w-4xl mx-auto mt-12">
        <h2 className="text-3xl text-blue-600 text-center mb-8 font-pacifico">
          In case the box&apos;s side pictures aren&apos;t visible...
        </h2>
        <div className="w-full">
          <PhotoAlbum directory="box" />
        </div>
      </div>
    </main>
  )
} 