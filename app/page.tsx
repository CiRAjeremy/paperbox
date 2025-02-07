'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

const LoveNotes = dynamic(() => import('@/components/LoveNotes'), { ssr: false })
const PhotoAlbum = dynamic(() => import('@/components/PhotoAlbum'), { ssr: false })
const EnvelopeLetter = dynamic(() => import('@/components/EnvelopeLetter'), { ssr: false })
const BirdsCube = dynamic(() => import('@/components/BirdsCube'), { ssr: false })
const ValentineQuestion = dynamic(() => import('@/components/ValentineQuestion'), { ssr: false })
const SparkleEffect = dynamic(() => import('@/components/SparkleEffect'), { ssr: false })
const FloatingHearts = dynamic(() => import('@/components/FloatingHearts'), { ssr: false })

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 relative bg-gradient-radial from-pink-100 via-pink-50 to-white">
      {/* Background Hearts */}
      <FloatingHearts />

      {/* Title with Sparkles */}
      <div className="relative">
        <SparkleEffect color="#FF69B4" count={20} />
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-pacifico text-deep-pink mb-8 mt-4"
        >
          To My Baby ❤️
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <LoveNotes />

        {/* First random image */}
        <motion.div 
          initial={{ opacity: 0, rotate: -5 }}
          animate={{ opacity: 1, rotate: 0 }}
          whileHover={{ 
            scale: 1.05,
            transition: { type: "spring", stiffness: 300, damping: 15 }
          }}
          className="max-w-xs mx-auto mb-12 relative"
        >
          <SparkleEffect color="#FFB6C1" count={10} />
          <Image
            src="/assets/randoms/10.jpg"
            alt="Random decoration"
            width={200}
            height={200}
            className="rounded-xl shadow-xl"
          />
        </motion.div>

        <EnvelopeLetter />
        <ValentineQuestion />

        {/* Third random image */}
        <motion.div 
          initial={{ opacity: 0, rotate: -3 }}
          animate={{ opacity: 1, rotate: 0 }}
          className="max-w-xs mx-auto my-12 transform hover:scale-105 transition-transform"
        >
          <Image
            src="/assets/randoms/30.png"
            alt="Random decoration"
            width={200}
            height={200}
            className="rounded-xl shadow-xl"
          />
        </motion.div>

        <PhotoAlbum />
        
        <div className="flex justify-center my-8">
          <BirdsCube />
        </div>

        {/* Paperbox Button */}
        <motion.div 
          className="flex justify-center mt-12 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/paperbox"
            className="bg-deep-pink hover:bg-pink-600 text-white px-8 py-4 rounded-full 
                     shadow-lg transition-all duration-300 hover:scale-105 font-medium text-lg
                     flex items-center gap-2"
          >
            I made you a paperbox click to open 🎁
          </Link>
        </motion.div>
      </motion.div>
    </main>
  )
} 