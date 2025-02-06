'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  color: string
}

interface SparkleEffectProps {
  color?: string
  minSize?: number
  maxSize?: number
  count?: number
}

export default function SparkleEffect({ 
  color = '#FFC0CB',
  minSize = 10,
  maxSize = 20,
  count = 15
}: SparkleEffectProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles(currentSparkles => {
        const newSparkles = [...currentSparkles]
        
        // Remove old sparkles
        while (newSparkles.length >= count) {
          newSparkles.shift()
        }

        // Add new sparkle
        newSparkles.push({
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * (maxSize - minSize) + minSize,
          color: color
        })

        return newSparkles
      })
    }, 150)

    return () => clearInterval(interval)
  }, [color, minSize, maxSize, count])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.div
            key={sparkle.id}
            initial={{ 
              opacity: 0,
              scale: 0,
              x: `${sparkle.x}%`,
              y: `${sparkle.y}%`
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180]
            }}
            transition={{ 
              duration: 1,
              ease: "easeOut"
            }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              position: 'absolute',
              width: sparkle.size,
              height: sparkle.size
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              style={{ width: '100%', height: '100%' }}
            >
              <path
                d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
                fill={sparkle.color}
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
} 