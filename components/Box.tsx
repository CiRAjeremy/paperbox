'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface BoxProps {
  isLocked: boolean
  isOpening: boolean
  onBoxClick?: () => void  // Make onBoxClick optional
}

export default function Box({ isLocked, isOpening, onBoxClick }: BoxProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)

  // Spring animations for the box
  const { scale } = useSpring({
    scale: hovered ? 3.5 : 3,
    config: { mass: 1, tension: 170, friction: 26 }
  })

  // Enhanced spring configuration for smoother animation
  const springConfig = {
    mass: 2,
    tension: 50,  // Reduced for smoother motion
    friction: 15,  // Reduced for smoother motion
    duration: 1000 // Ensure consistent duration
  }

  // Separate springs for each face's unfolding animation with precise positioning
  const { 
    topRotation,
    frontRotation,
    backRotation,
    leftRotation,
    rightRotation,
    boxPosition
  } = useSpring({
    topRotation: isOpening ? -Math.PI : 0,
    frontRotation: isOpening ? Math.PI / 2 : 0,
    backRotation: isOpening ? -Math.PI / 2 : 0,
    leftRotation: isOpening ? -Math.PI / 2 : 0,
    rightRotation: isOpening ? Math.PI / 2 : 0,
    boxPosition: isOpening ? [0, -0.5, 0] : [0, 0, 0],
    config: springConfig
  })

  useFrame(() => {
    if (!isOpening) {
      groupRef.current.rotation.x += 0.005
      groupRef.current.rotation.y += 0.005
    }
  })

  // Load all textures for the box sides with no color modification
  const textureLoader = new THREE.TextureLoader()
  const textures = [1, 2, 3, 4, 5, 6].map(num => {
    const texture = textureLoader.load(`/assets/images/box/${num}.jpg`)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.encoding = THREE.sRGBEncoding // Ensure correct color reproduction
    return texture
  })

  const handleClick = () => {
    if (isLocked) {
      onBoxClick?.()
    }
  }

  // Material with no color tinting
  const createMaterial = (texture: THREE.Texture) => (
    <meshStandardMaterial
      map={texture}
      transparent={true}
      metalness={0}
      roughness={0.5}
      envMapIntensity={1}
    />
  )

  return (
    <animated.group
      ref={groupRef}
      scale={scale}
      position={boxPosition as unknown as [number, number, number]}
      onClick={handleClick}
      onPointerOver={() => !isOpening && setHovered(true)}
      onPointerOut={() => !isOpening && setHovered(false)}
    >
      {!isOpening ? (
        // Closed box state
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          {textures.map((texture, index) => (
            <meshStandardMaterial
              key={index}
              attach={`material-${index}`}
              map={texture}
              transparent={true}
              metalness={0}
              roughness={0.5}
              envMapIntensity={1}
            />
          ))}
        </mesh>
      ) : (
        // Unfolded state - precise positioning for flat layout
        <>
          {/* Bottom (center) */}
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1, 1]} />
            {createMaterial(textures[1])}
          </mesh>

          {/* Top - aligned with bottom edge */}
          <animated.mesh
            position={[0, 1, 0]}
            rotation-x={topRotation}
          >
            <planeGeometry args={[1, 1]} />
            {createMaterial(textures[0])}
          </animated.mesh>

          {/* Front - aligned with bottom edge */}
          <animated.mesh
            position={[0, 0, 0.5]}
            rotation-x={frontRotation}
          >
            <planeGeometry args={[1, 1]} />
            {createMaterial(textures[2])}
          </animated.mesh>

          {/* Back - aligned with bottom edge */}
          <animated.mesh
            position={[0, 0, -0.5]}
            rotation-x={backRotation}
          >
            <planeGeometry args={[1, 1]} />
            {createMaterial(textures[3])}
          </animated.mesh>

          {/* Left - aligned with bottom edge */}
          <animated.mesh
            position={[-0.5, 0, 0]}
            rotation-z={leftRotation}
          >
            <planeGeometry args={[1, 1]} />
            {createMaterial(textures[4])}
          </animated.mesh>

          {/* Right - aligned with bottom edge */}
          <animated.mesh
            position={[0.5, 0, 0]}
            rotation-z={rightRotation}
          >
            <planeGeometry args={[1, 1]} />
            {createMaterial(textures[5])}
          </animated.mesh>
        </>
      )}

      {isLocked && !isOpening && (
        <Text
          position={[0, 0, 0.6]}
          fontSize={0.15}
          color="#FF69B4"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.004}
          outlineColor="#ffffff"
        >
          🔒
        </Text>
      )}
    </animated.group>
  )
} 