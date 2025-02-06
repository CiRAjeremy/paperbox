'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Note {
  id: number
  content: string
  color: string
  rotation: number
  revealed: boolean
}

const initialNotes: Note[] = [
  {
    id: 1,
    content: "You are the best girlfriend I've ever had. ❤️",
    color: "bg-pink-100",
    rotation: -2,
    revealed: false
  },
  {
    id: 2,
    content: "You are super pretty and I wanna lick your face lol 🌟",
    color: "bg-rose-100",
    rotation: 1,
    revealed: false
  },
  {
    id: 3,
    content: "I'm proud of you and know you'll be great at all you'll ever set your mind on 💝",
    color: "bg-red-50",
    rotation: -1,
    revealed: false
  },
  {
    id: 4,
    content: "Respectfully Billie has nothing on you 💖",
    color: "bg-pink-50",
    rotation: 2,
    revealed: false
  },
  {
    id: 5,
    content: "You're perfect 💫",
    color: "bg-rose-50",
    rotation: -3,
    revealed: false
  },
  {
    id: 6,
    content: "I think about you everyday 🌹",
    color: "bg-pink-100",
    rotation: 1,
    revealed: false
  },
  {
    id: 7,
    content: "I love you soooooooooooooo much 💕",
    color: "bg-rose-100",
    rotation: -2,
    revealed: false
  },
  {
    id: 8,
    content: "Every time I talk to you it makes me feel good regardless of how my day had been up to that point ✨",
    color: "bg-red-50",
    rotation: 2,
    revealed: false
  },
  {
    id: 9,
    content: "Thank you for always being there 🌹",
    color: "bg-pink-50",
    rotation: -1,
    revealed: false
  },
  {
    id: 10,
    content: "I'm so glad I met you 💖",
    color: "bg-rose-50",
    rotation: 3,
    revealed: false
  },
  {
    id: 11,
    content: "Yooh... ii page inaanza kua mrefu sana sasa😂",
    color: "bg-rose-50",
    rotation: 3,
    revealed: false
  }
]

const trinkets = [
  { emoji: "🎀", name: "ribbon" },
  { emoji: "💝", name: "heart" },
  { emoji: "🌸", name: "flower" },
  { emoji: "✨", name: "sparkle" },
  { emoji: "💌", name: "love letter" }
]

export default function LoveNotes() {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [showTrinket, setShowTrinket] = useState(false)
  const [activeTrinket, setActiveTrinket] = useState("")

  const revealNote = (id: number) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, revealed: true } : note
    ))
  }

  const handleTrinketClick = (trinket: string) => {
    setActiveTrinket(trinket)
    setShowTrinket(true)
    setTimeout(() => setShowTrinket(false), 2000)
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-pacifico text-deep-pink text-center mb-12"
      >
      Love Notes💝
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notes.map((note) => (
          <motion.div
            key={note.id}
            className={`note sticker ${note.color} p-6 rounded-lg shadow-lg cursor-pointer`}
            style={{ 
              transform: `rotate(${note.rotation}deg)`,
              opacity: 0,
              animationDelay: `${note.id * 0.2}s`
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ 
              scale: 1.05,
              rotate: note.rotation + Math.random() * 5 - 2.5,
              transition: { type: "spring", stiffness: 300, damping: 10 }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => revealNote(note.id)}
          >
            <AnimatePresence mode="wait">
              {note.revealed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotateY: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 10
                    }
                  }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  className="relative"
                >
                  <motion.p
                    className="text-deep-pink text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {note.content}
                  </motion.p>
                  <motion.div
                    className="absolute -bottom-4 -right-4 text-4xl"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  >
                    ❤️
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                    className="text-2xl mb-2"
                  >
                    💌
                  </motion.div>
                  <p className="text-deep-pink font-medium">Click to reveal!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 