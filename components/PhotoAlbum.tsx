'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface PhotoAlbumProps {
  directory?: string
}

export default function PhotoAlbum({ directory = 'memories' }: PhotoAlbumProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    // Load images based on directory
    const loadImages = async () => {
      try {
        // Use box images if directory is 'box', otherwise use memories
        const imageList = directory === 'box'
          ? Array.from({ length: 6 }, (_, i) => `/assets/images/box/${i + 1}.jpg`)
          : Array.from({ length: 5 }, (_, i) => `/assets/images/album/${i + 1}.jpg`)
        setImages(imageList)
      } catch (error) {
        console.error('Error loading images:', error)
      }
    }

    loadImages()
  }, [directory])

  const nextPhoto = () => {
    setIsFlipped(true)
    setTimeout(() => {
      setCurrentPhoto((prev) => (prev + 1) % images.length)
      setIsFlipped(false)
    }, 300)
  }

  const prevPhoto = () => {
    setIsFlipped(true)
    setTimeout(() => {
      setCurrentPhoto((prev) => (prev - 1 + images.length) % images.length)
      setIsFlipped(false)
    }, 300)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-pacifico text-deep-pink text-center mb-8"
      >
         📸
      </motion.h2>

      <div className="relative w-full max-w-2xl mx-auto mb-8 bg-white/50 rounded-xl p-4">
        <div className={`relative w-full aspect-[4/3] ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
          <motion.div
            className="relative w-full h-full"
            animate={{
              rotateY: isFlipped ? 90 : 0,
              scale: isZoomed ? 1.5 : 1,
              zIndex: isZoomed ? 50 : 0
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100
            }}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <div className="relative w-full h-full flex items-center justify-center bg-white/30 rounded-lg">
              <Image
                src={images[currentPhoto]}
                alt={`Photo ${currentPhoto + 1}`}
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>

            {/* Photo frame decoration */}
            <motion.div
              className="absolute inset-0 border-8 border-white rounded-lg pointer-events-none"
              animate={{
                boxShadow: isZoomed 
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                  : '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
              }}
            />

            {/* Corner decorations */}
            {[0, 1, 2, 3].map((corner) => (
              <motion.div
                key={corner}
                className="absolute w-8 h-8 border-2 border-deep-pink"
                style={{
                  top: corner < 2 ? -4 : 'auto',
                  bottom: corner >= 2 ? -4 : 'auto',
                  left: corner % 2 === 0 ? -4 : 'auto',
                  right: corner % 2 === 1 ? -4 : 'auto',
                  borderTopWidth: corner < 2 ? 2 : 0,
                  borderBottomWidth: corner >= 2 ? 2 : 0,
                  borderLeftWidth: corner % 2 === 0 ? 2 : 0,
                  borderRightWidth: corner % 2 === 1 ? 2 : 0,
                  borderRadius: 4
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: corner * 0.5
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Navigation buttons */}
        <AnimatePresence>
          {!isZoomed && (
            <>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors z-10"
                aria-label="Previous photo"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ◀️
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors z-10"
                aria-label="Next photo"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ▶️
              </motion.button>
            </>
          )}
        </AnimatePresence>

        {/* Page number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 px-4 py-2 rounded-full text-deep-pink font-medium shadow-lg backdrop-blur-sm"
        >
          {currentPhoto + 1} / {images.length}
        </motion.div>
      </div>

      {/* Thumbnails */}
      <div className="mt-8 flex gap-2 overflow-x-auto pb-4 justify-center">
        {images.map((photo, index) => (
          <motion.button
            key={photo}
            onClick={() => {
              setIsFlipped(true)
              setTimeout(() => {
                setCurrentPhoto(index)
                setIsFlipped(false)
              }, 300)
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ${
              currentPhoto === index ? 'ring-2 ring-deep-pink' : ''
            }`}
          >
            <div className="relative w-full h-full bg-white/30">
              <Image
                src={photo}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-contain"
                sizes="64px"
              />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
} 