'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

const BirdsCube = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = async () => {
    if (audioRef.current) {
      try {
        setIsLoading(true);
        setError(null);
        
        if (isPlaying) {
          await audioRef.current.pause();
        } else {
          await audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } catch (err) {
        setError('Failed to play audio. Please try again.');
        console.error('Audio playback error:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Reset error when audio loads successfully
  const handleCanPlay = () => {
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="relative w-64 h-64 transform rotate-3 hover:rotate-0 transition-transform duration-300">
      <div className="absolute inset-0 bg-white rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform duration-300">
        {/* Image */}
        <div className="relative w-full h-32 mb-4">
          <Image
            src="/assets/props/birdshug.png"
            alt="Birds hugging"
            fill
            className="object-contain"
          />
        </div>

        {/* Text with arrow */}
        <div className="flex items-center mb-4">
          <p className="font-['Pacifico'] text-lg text-pink-600">this is us . you are the best</p>
          <svg className="w-12 h-8 ml-2" viewBox="0 0 100 50">
            <path
              d="M0,25 Q30,25 50,10 T100,25"
              fill="none"
              stroke="#db2777"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M90,20 L100,25 L90,30"
              fill="none"
              stroke="#db2777"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Audio controls */}
        <div className="flex flex-col items-center justify-center gap-2">
          <button
            onClick={toggleAudio}
            disabled={isLoading}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : isPlaying ? 'Pause' : 'Play'}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <audio
            ref={audioRef}
            src="/assets/props/birds.m4a"
            onEnded={() => setIsPlaying(false)}
            onCanPlay={handleCanPlay}
            onError={() => setError('Failed to load audio')}
          />
        </div>
      </div>
    </div>
  );
};

export default BirdsCube; 