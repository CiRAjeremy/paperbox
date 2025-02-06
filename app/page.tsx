'use client'

import { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const Box = dynamic(() => import('@/components/Box'), { ssr: false })
const LoveNotes = dynamic(() => import('@/components/LoveNotes'), { ssr: false })
const PhotoAlbum = dynamic(() => import('@/components/PhotoAlbum'), { ssr: false })
const EnvelopeLetter = dynamic(() => import('@/components/EnvelopeLetter'), { ssr: false })
const BirdsCube = dynamic(() => import('@/components/BirdsCube'), { ssr: false })
const ValentineQuestion = dynamic(() => import('@/components/ValentineQuestion'), { ssr: false })
const SparkleEffect = dynamic(() => import('@/components/SparkleEffect'), { ssr: false })
const FloatingHearts = dynamic(() => import('@/components/FloatingHearts'), { ssr: false })

export default function Home() {
  const [password, setPassword] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showRealHint, setShowRealHint] = useState(false)
  const [unscrambledText, setUnscrambledText] = useState('')
  const [showNotes, setShowNotes] = useState(false)
  const [isBoxOpen, setIsBoxOpen] = useState(false)
  const scrambledPassword = 'veolui'
  const correctPassword = 'ILOVEU'

  const toggleBox = () => {
    setIsBoxOpen(prev => !prev)
  }

  const scrollToContent = () => {
    const contentSection = document.getElementById('content-section')
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const unscrambleAnimation = async () => {
    const finalText = 'I LOVE U'
    let currentText = scrambledPassword.toUpperCase()
    
    for (let i = 0; i < 10; i++) {
      await new Promise(resolve => setTimeout(resolve, 100))
      currentText = currentText.split('').sort(() => Math.random() - 0.5).join('')
      setUnscrambledText(currentText)
    }
    
    await new Promise(resolve => setTimeout(resolve, 500))
    setUnscrambledText(finalText)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsBoxOpen(true)
    
    // Delay the content reveal and scroll
    setTimeout(() => {
      setIsUnlocked(true)
      setTimeout(() => {
        setShowNotes(true)
        scrollToContent()
      }, 1000)
    }, 1500)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.toUpperCase() === scrambledPassword.toUpperCase()) {
      unscrambleAnimation()
    } else {
      setShowHint(true)
      setTimeout(() => {
        setShowHint(false)
        setShowRealHint(true)
      }, 3000)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center p-4 relative bg-gradient-radial from-pink-100 via-pink-50 to-white">
      {/* Background Hearts */}
      <FloatingHearts />

      {/* Box Toggle Button - Only show after unlocked */}
      {isUnlocked && (
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 left-4 z-20 bg-white/90 hover:bg-white px-6 py-2.5 rounded-full shadow-lg 
                     text-deep-pink font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
          onClick={toggleBox}
        >
          {isBoxOpen ? '📦 Close Box' : '🎁 Open Box'}
        </motion.button>
      )}

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

      {/* Box Section */}
      <div className={`w-full ${isUnlocked ? 'h-[50vh]' : 'h-[70vh]'} relative transition-all duration-1000`}>
        <Canvas camera={{ position: [0, 0, 6] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.7} />
            <pointLight position={[10, 10, 10]} />
            <Box 
              onBoxClick={() => !isUnlocked && setShowPasswordPrompt(true)} 
              isLocked={!isUnlocked}
              isOpening={isBoxOpen}
            />
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
        
        {!isUnlocked && !showPasswordPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center"
          >
            <div className="bg-white/80 px-6 py-3 rounded-full shadow-lg backdrop-blur-sm">
              <p className="text-deep-pink text-lg font-medium">Click the box to open your gift! 🎁</p>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {showPasswordPrompt && !isUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10"
            >
              <div className="bg-white/90 p-8 rounded-2xl shadow-xl max-w-md w-full mx-4 relative">
                {/* Close button */}
                <button
                  onClick={() => setShowPasswordPrompt(false)}
                  className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors"
                  aria-label="Close"
                >
                  <span className="text-3xl font-sans leading-none text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">X</span>
                </button>
                <h2 className="text-2xl mb-6 text-deep-pink font-pacifico text-center pt-4">
                  This box is locked with love! 🔒
                </h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter the password..."
                      className="w-full px-4 py-3 rounded-lg border-2 border-valentine-pink focus:border-deep-pink outline-none transition-all duration-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-deep-pink text-white py-3 rounded-lg hover:bg-pink-600 transition-colors font-medium"
                  >
                    Open with Love
                  </button>
                </form>
                <AnimatePresence>
                  {showHint && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-deep-pink mt-4 text-center"
                    >
                      Hint: The password is your boyfriend&apos;s birthday date
                    </motion.p>
                  )}
                  {showRealHint && !showHint && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="mt-6 text-center"
                    >
                      <span className="block text-lg mb-2 text-deep-pink">Real hint:</span>
                      <div className="bg-pink-50 py-4 px-6 rounded-lg shadow-inner border-2 border-pink-100">
                        <span className="block text-4xl font-bold font-mono tracking-[0.5em] text-deep-pink">
                          {scrambledPassword.toUpperCase()}
                        </span>
                      </div>
                    </motion.div>
                  )}
                  {unscrambledText && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-2xl text-deep-pink mt-4 font-bold text-center"
                    >
                      {unscrambledText}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip Button */}
      {!isUnlocked && (
        <motion.button
          initial={{ opacity: 1 }}
          animate={{ 
            width: ['220px', '80px', '220px']
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="fixed top-4 right-4 z-20 bg-white/90 hover:bg-white px-4 py-2.5 rounded-full shadow-lg overflow-hidden h-12"
          onClick={() => {
            setShowPasswordPrompt(false)
            unscrambleAnimation()
          }}
        >
          <motion.div
            animate={{
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            Skip these shenanigans 😂
          </motion.div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            Skip
          </motion.div>
        </motion.button>
      )}

      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
            id="content-section"
          >
            {/* Enhanced section transitions */}
            <div className="text-center mb-8 relative">
              <SparkleEffect color="#FFA5D2" count={15} />
              <motion.h2
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-3xl text-deep-pink mb-4 font-pacifico"
              >
                Scroll down for more love! ❤️
              </motion.h2>
            </div>
            
            {/* Enhanced image sections */}
            <motion.div 
              initial={{ opacity: 0, rotate: 5 }}
              animate={{ opacity: 1, rotate: 0 }}
              className="max-w-xs mx-auto my-12 transform hover:scale-105 transition-transform"
            >
              <Image
                src="/assets/randoms/20.png"
                alt="Random decoration"
                width={250}
                height={250}
                className="rounded-xl shadow-xl"
              />
            </motion.div>

            <LoveNotes />

            {/* First random image (previously second) */}
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
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
} 