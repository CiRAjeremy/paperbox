'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const ValentineQuestion = () => {
  const [selectedOption, setSelectedOption] = useState<'left' | 'right' | null>(null)
  const [isLeftYes, setIsLeftYes] = useState(true)

  const handleOptionClick = (option: 'left' | 'right') => {
    setSelectedOption(option)
    if (option === 'right') {
      setIsLeftYes(false)
    } else {
      setIsLeftYes(true)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto my-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl text-deep-pink font-pacifico text-center mb-8">
          Will you be my forever Valentine? 💝
        </h2>
        
        <div className="flex justify-center items-center space-x-16">
          <div 
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => handleOptionClick('left')}
          >
            <div className={`w-8 h-8 rounded-full border-2 border-deep-pink flex items-center justify-center
              ${selectedOption === 'left' ? 'bg-deep-pink' : 'hover:bg-pink-50'} transition-colors`}
            >
              {selectedOption === 'left' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-white text-xl"
                >
                  ✓
                </motion.div>
              )}
            </div>
            <span className="mt-2 text-lg font-medium text-deep-pink">
              {isLeftYes ? 'Yes' : 'No'}
            </span>
          </div>

          <div 
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => handleOptionClick('right')}
          >
            <div className={`w-8 h-8 rounded-full border-2 border-deep-pink flex items-center justify-center
              ${selectedOption === 'right' ? 'bg-deep-pink' : 'hover:bg-pink-50'} transition-colors`}
            >
              {selectedOption === 'right' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-white text-xl"
                >
                  ✓
                </motion.div>
              )}
            </div>
            <span className="mt-2 text-lg font-medium text-deep-pink">
              {isLeftYes ? 'No' : 'Yes'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ValentineQuestion 