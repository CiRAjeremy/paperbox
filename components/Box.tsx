'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface BoxProps {
  onBoxClick: () => void
  isLocked: boolean
}

export default function Box({ onBoxClick, isLocked }: BoxProps) {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)

  const { scale, rotation } = useSpring({
    scale: active ? 4 : hovered ? 3.5 : 3,
    rotation: active && !isLocked ? [0, Math.PI, 0] as [number, number, number] : [0, 0, 0] as [number, number, number],
    config: { mass: 1, tension: 170, friction: 26 }
  })

  useFrame((state) => {
    if (!active) {
      mesh.current.rotation.x += 0.005
      mesh.current.rotation.y += 0.005
    }
  })

  // Load all textures for the box sides
  const textureLoader = new THREE.TextureLoader()
  const textures = [1, 2, 3, 4, 5, 6].map(num => {
    const texture = textureLoader.load(`/assets/${num}.jpg`)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    return texture
  })

  const handleClick = () => {
    if (isLocked) {
      onBoxClick()
    } else {
      setActive(!active)
    }
  }

  return (
    <animated.mesh
      ref={mesh}
      scale={scale}
      rotation={rotation as unknown as [number, number, number]}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      {[...Array(6)].map((_, index) => (
        <meshStandardMaterial
          key={index}
          attach={`material-${index}`}
          map={textures[index]}
          color="#ffffff"
          metalness={0.1}
          roughness={0.8}
        />
      ))}
      {isLocked && (
        <Text
          position={[0, 0, 0.6]}
          fontSize={0.15}
          color="#000000"
          anchorX="center"
          anchorY="middle"
        >
          🔒
        </Text>
      )}
      {active && !isLocked && (
        <Text
          position={[0, 0, 0.6]}
          fontSize={0.15}
          color="#000000"
          anchorX="center"
          anchorY="middle"
        >
          I Love You Mummy! ❤️
        </Text>
      )}
    </animated.mesh>
  )
} 