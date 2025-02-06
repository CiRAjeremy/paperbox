'use client'

import { motion } from 'framer-motion'

export default function FloatingHearts() {
  // Create an array of hearts with different positions and delays
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 15 + Math.random() * 10,
    scale: 0.5 + Math.random() * 0.5
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-200/30"
          initial={{ 
            left: `${heart.x}%`,
            top: '100%',
            scale: heart.scale
          }}
          animate={{
            top: '-20%',
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear'
          }}
          style={{ fontSize: '2rem' }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  )
} 