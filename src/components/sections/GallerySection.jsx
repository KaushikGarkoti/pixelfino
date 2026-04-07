import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import ParticleBackground from './ParticleBackground';
import styles from './GallerySection.module.css';

function SolidPhotograph({ url, position, rotation }) {
  const texture = useTexture(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  
  return (
    <group position={position} rotation={rotation}>
      {/* 3D Frame/Backing for the Photograph feel */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[3.8, 4.8, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* The photograph plane */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[3.5, 4.5]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </group>
  );
}

function CarouselScene({ scrollProgress, images }) {
  const groupRef = useRef();
  
  // Arrange firmly in a ring carousel
  const itemsCount = images.length;
  // Fallback to avoid divide by zero if images array is empty
  const angleStep = itemsCount > 0 ? (Math.PI * 2) / itemsCount : 0; 
  const radius = 7;

  useFrame(() => {
    const scroll = scrollProgress.get();
    
    if(groupRef.current) {
      // Complete exactly 1 or more full loops based on preference. 
      // Scrolling 0->1 will complete exactly 1.5 full carousel rotations providing continuous flow.
      groupRef.current.rotation.y = scroll * Math.PI * 3;
    }
  });

  if (itemsCount === 0) return null;

  return (
    <group>
      <ParticleBackground scrollProgress={scrollProgress} />
      {/* The Carousel */}
      <group ref={groupRef}>
        {images.map((url, i) => {
          const angle = -i * angleStep;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          
          return (
            <SolidPhotograph
              key={i}
              url={url}
              position={[x, 0, z]}
              // Rotate by an additional 180 degrees so the front always perfectly faces origin
              rotation={[0, angle + Math.PI, 0]}
            />
          );
        })}
      </group>
    </group>
  );
}

export default function GallerySection({ id = "gallery", title = "Selected Works", subtext = "A journey through fragmented moments.", images = [] }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} id={id} className={styles.sectionHeight}>
      <div className={styles.stickyContainer}>
        <div className={styles.overlayHeader}>
          <h2 className={styles.heading}>{title}</h2>
          <p className={styles.subtext}>{subtext}</p>
        </div>
        
        <div className={styles.canvasWrapper}>
          <Canvas camera={{ position: [0, 0, 0.5], fov: 60 }} gl={{ antialias: true, alpha: true }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <directionalLight position={[-10, 0, -5]} intensity={0.5} color="#9d4edd" />
            <React.Suspense fallback={null}>
              <CarouselScene scrollProgress={scrollYProgress} images={images} />
            </React.Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
}
