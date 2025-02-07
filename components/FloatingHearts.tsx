'use client'

import { motion } from 'framer-motion'

interface FloatingHeartsProps {
  color?: string
}

export default function FloatingHearts({ color = 'text-pink-200' }: FloatingHeartsProps) {
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
          className={`absolute ${color}`}
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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
} 