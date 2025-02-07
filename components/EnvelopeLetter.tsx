/* eslint-disable react/no-unescaped-entities */
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function EnvelopeLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [cutProgress, setCutProgress] = useState(0);
  const [containerHeight, setContainerHeight] = useState(500);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    R: false,
    E: false,
    N1: false,
    N2: false,
    Y: false,
  });
  const letterRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const letterY = useMotionValue(0);
  const scissorsScale = useMotionValue(0.35); // Increased initial size from 0.25 to 0.35

  // Transform the scissors position and animation
  const scissorsX = useTransform(dragX, [0, 150], [0, 150]);
  const scissorsOpen = useTransform(dragX, [0, 75, 150], [0, 30, 0]); // Increased opening angle
  const scissorsRotate = useTransform(dragX, [0, 150], [-15, -15]); // Constant tilt for better cutting angle
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  useEffect(() => {
    if (letterRef.current && isOpen) {
      const letterHeight = letterRef.current.scrollHeight;
      setContainerHeight(letterHeight + 300);
    }
  }, [isOpen, expandedSections]);

  const handleDrag = (event: any, info: any) => {
    const progress = Math.min(Math.max((info.point.x - info.point.x + info.offset.x) / 150, 0), 1);
    setCutProgress(progress);
    
    if (progress >= 0.8 && !isOpen) {
      setIsOpen(true);
      // Animate the letter falling out
      animate(letterY, 0, {
        type: "spring",
        stiffness: 100,
        damping: 15,
        onComplete: () => {
          // Add a slight swing animation after falling
          animate(letterY, [-10, 0], {
            type: "spring",
            stiffness: 300,
            damping: 10,
          });
        }
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-8 py-16">
      <div 
        className="relative flex flex-col items-center"
        style={{ height: containerHeight }}
      >
        {/* Center container */}
        <div className="relative w-48">
          {/* Instruction Text with Curved Arrow */}
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -top-32 w-full text-center z-40"
            >
              <div className="inline-block relative mb-8">
                <p className="text-deep-pink font-medium mb-2">
                  ✨ Drag the scissors to cut open the envelope! ✨
                </p>
                <svg
                  width="120"
                  height="100"
                  viewBox="0 0 120 100"
                  fill="none"
                  className="absolute -left-20 bottom-[-60px]"
                >
                  <path
                    d="M110 0 C 80 0, 20 0, 20 40 C 20 70, 30 80, 40 90"
                    stroke="rgb(236, 72, 153)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                  />
                  <path
                    d="M35 85 L 40 90 L 45 85"
                    stroke="rgb(236, 72, 153)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </motion.div>
          )}

          {/* Squiggly note */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 transform -rotate-3 z-50">
            <p className="font-indie text-deep-pink/60 text-sm max-w-[120px] leading-snug text-center">
              this was supposed to be an envelope.. lol
            </p>
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 40 40" 
              fill="none" 
              className="absolute left-1/2 -translate-x-1/2 bottom-[-24px]"
            >
              <path 
                d="M20 2 Q 20 20 20 38" 
                stroke="rgb(236, 72, 153, 0.6)" 
                strokeWidth="2" 
                fill="none"
                strokeLinecap="round"
                strokeDasharray="4 4"
              />
            </svg>
          </div>

          {/* Envelope SVG */}
          <motion.div
            className="w-48 h-32 relative overflow-hidden z-20"
            style={{
              clipPath: isOpen 
                ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                : 'polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)',
              filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
            }}
          >
            <Image
              src="/assets/props/envelope.svg"
              alt="Envelope"
              fill
              className="object-cover"
              style={{ 
                filter: 'brightness(1.1) contrast(1.1)',
                mixBlendMode: 'multiply'
              }}
            />
            
            {/* Envelope inner shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10" />
            
            {/* Cutting line visualization */}
            {isDragging && !isOpen && (
              <motion.div 
                className="absolute top-[40%] left-0 w-full h-0.5"
                style={{
                  scaleX: cutProgress,
                  transformOrigin: 'left',
                  background: 'linear-gradient(to right, transparent, #ff6b6b 20%, #ff6b6b 80%, transparent)'
                }}
              />
            )}

            {/* Cut piece animation */}
            {isOpen && (
              <motion.div
                initial={{ y: 0, rotate: 0 }}
                animate={{ y: 40, rotate: 15, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-[40%] left-0 w-full h-4 overflow-hidden"
              >
                <Image
                  src="/assets/props/envelope.svg"
                  alt="Cut piece"
                  fill
                  className="object-cover"
                  style={{ 
                    transform: 'translateY(-40%)',
                    filter: 'brightness(1.1) contrast(1.1)',
                    mixBlendMode: 'multiply'
                  }}
                />
              </motion.div>
            )}
          </motion.div>

          {/* Scissors SVG */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 150 }}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDrag={handleDrag}
            onDragEnd={() => setIsDragging(false)}
            style={{ 
              x: scissorsX,
              rotate: scissorsRotate,
              scale: scissorsScale,
              touchAction: "none",
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              pointerEvents: "auto",
            }}
            className="absolute top-[35%] -left-12 cursor-grab active:cursor-grabbing z-30 select-none touch-none"
            whileHover={{ scale: 0.37 }}
            animate={!isOpen && !isDragging ? 
              { x: [0, 10, 0], transition: { repeat: Infinity, duration: 1.5 }} : 
              undefined
            }
          >
            <motion.div 
              style={{ rotate: scissorsOpen }}
              className="filter drop-shadow-lg pointer-events-auto"
            >
              <Image
                src="/assets/props/scissors.svg"
                alt="Scissors"
                width={300}
                height={300}
                className="transform -rotate-90 pointer-events-none"
                style={{ 
                  filter: 'brightness(1.1) contrast(1.2) saturate(1.2)',
                  mixBlendMode: 'multiply'
                }}
                draggable="false"
              />
            </motion.div>
          </motion.div>

          {/* Letter with improved spacing and dynamic width */}
          {isOpen && (
            <motion.div
              ref={letterRef}
              initial={{ y: -280 }}
              style={{ y: letterY }}
              className="absolute top-[120px] left-0 right-0 mx-auto w-44 z-10"
            >
              <motion.div 
                className="relative rounded-b shadow-lg bg-white"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,245,247,1) 100%)',
                  minHeight: '500px',
                  height: '100%',
                  maxHeight: 'none',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Image
                  src="/assets/props/paper.svg"
                  alt="Paper texture"
                  fill
                  className="object-cover opacity-60 mix-blend-overlay"
                  style={{
                    filter: 'contrast(0.9) brightness(1.1)'
                  }}
                />
                
                <div className="relative flex-1 space-y-12 text-center font-pacifico text-deep-pink px-6 py-12">
                  <div className="space-y-2">
                    <p className="text-xl font-bold">R</p>
                    <p className="text-sm leading-relaxed">R is for Really really beautiful</p>
                    {!expandedSections.R ? (
                      <button 
                        onClick={() => toggleSection('R')} 
                        className="text-xs text-pink-400 hover:text-pink-600 mt-2"
                      >
                        ...read more
                      </button>
                    ) : (
                      <>
                        <p className="text-sm leading-relaxed mt-4">
                          No fr... lights me up every time I see you .
                          You soo pretty
                        </p>
                        <button 
                          onClick={() => toggleSection('R')} 
                          className="text-xs text-pink-400 hover:text-pink-600 mt-2"
                        >
                          show less
                        </button>
                      </>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-bold">E</p>
                    <p className="text-sm leading-relaxed">E is for everytime you kiss me its like the first time (I really really love it)</p>
                    {!expandedSections.E ? (
                      <button 
                        onClick={() => toggleSection('E')} 
                        className="text-xs text-pink-400 hover:text-pink-600 mt-2"
                      >
                        ...read more
                      </button>
                    ) : (
                      <>
                        <p className="text-sm leading-relaxed mt-4">
                          OOOh dont we look good together , theres a reasy they watch all night long... 
                          Our make out sessions be hittin (pardon my french)😂
                        </p>
                        <button 
                          onClick={() => toggleSection('E')} 
                          className="text-xs text-pink-400 hover:text-pink-600 mt-2"
                        >
                          show less
                        </button>
                      </>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-bold">N</p>
                    <p className="text-sm leading-relaxed">N is for Naturally, you&apos;re the only one I&apos;d want to be by me when I go to sleep and when I wake up. Why you ask?...</p>
                    {!expandedSections.N1 ? (
                      <button 
                        onClick={() => toggleSection('N1')} 
                        className="text-xs text-pink-400 hover:text-pink-600 mt-2"
                      >
                        ...read more
                      </button>
                    ) : (
                      <>
                        <p className="text-sm leading-relaxed mt-4">
                          You&apos;re okay I guess...😂 thought twas a safe space? dint ya...
                          But fr, I feel so good when I&apos;m with you and when you look at me with those eyes🤤... You have the prettiest eyes I&apos;ve ever seen.
                        </p>
                        <button 
                          onClick={() => toggleSection('N1')} 
                          className="text-xs text-pink-400 hover:text-pink-600 mt-2"
                        >
                          show less
                        </button>
                      </>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-bold">N</p>
                    <p className="text-sm leading-relaxed">N is for Nothing compares to the joy you bring to my life</p>
                    {!expandedSections.N2 ? (
                      <button 
                        onClick={() => toggleSection('N2')} 
                        className="text-xs text-pink-400 hover:text-pink-600 mt-2"
                      >
                        ...read more
                      </button>
                    ) : (
                      <>
                        <p className="text-sm leading-relaxed mt-4">
                          Tell yo mom I said wagwan😎
                        </p>
                        <button 
                          onClick={() => toggleSection('N2')} 
                          className="text-xs text-pink-400 hover:text-pink-600 mt-2"
                        >
                          show less
                        </button>
                      </>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-bold">Y</p>
                    <p className="text-sm leading-relaxed">Y is for You're my heart's true desire</p>
                    {!expandedSections.Y ? (
                      <button 
                        onClick={() => toggleSection('Y')} 
                        className="text-xs text-pink-400 hover:text-pink-600 mt-2"
                      >
                        ...read more
                      </button>
                    ) : (
                      <>
                        <p className="text-sm leading-relaxed mt-4">
                        I swear im not like the other guys😂
                        </p>
                        <button 
                          onClick={() => toggleSection('Y')} 
                          className="text-xs text-pink-400 hover:text-pink-600 mt-2"
                        >
                          show less
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Paper fold effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-pink-100/20 to-transparent" />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 