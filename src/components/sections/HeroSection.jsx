import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

function AnimatedSphere() {
  const sphereRef = useRef();
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={sphereRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#00f3ff"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  );
}

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedSphere />
          <Environment preset="city" />
        </Canvas>
      </div>

      <div className={styles.overlayContainer}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Digital Artist & Photographer
          </motion.h2>
          
          <h1 className={styles.title}>
            Capturing the <br />
            <span className="text-gradient">Unseen Moments</span>
          </h1>
          
          <p className={styles.description}>
            A high-end cinematic experience exploring light, shadow, and geometry. 
          </p>

          <motion.div 
            className={styles.buttonGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <a href="#gallery" className={styles.primaryButton}>View Portfolio</a>
            <a href="#contact" className={styles.secondaryButton}>Get in touch</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
