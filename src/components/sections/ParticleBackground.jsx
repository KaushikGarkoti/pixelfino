import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleBackground({ scrollProgress }) {
  const pointsRef = useRef();
  
  const particleCount = 4000;
  
  const [positions] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount; i++) {
        const radius = 8 + Math.random() * 40; // Don't block the camera/images which are at r=6
        // Spread evenly in a cylinder
        const theta = 2 * Math.PI * Math.random();
        const y = (Math.random() - 0.5) * 80;
        
        pos[i*3] = radius * Math.cos(theta);
        pos[i*3+1] = y;
        pos[i*3+2] = radius * Math.sin(theta);
    }
    return [pos];
  }, []);

  const prevScroll = useRef(0);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    // Safety check on delta to prevent explosive jumps on resume
    if(delta > 0.1) delta = 0.1;
    
    const scroll = scrollProgress.get();
    const velocity = (scroll - prevScroll.current) / delta;
    prevScroll.current = scroll;
    
    const positionsAttr = pointsRef.current.geometry.attributes.position;
    const posArray = positionsAttr.array;
    
    const scatterStrength = Math.min(Math.abs(velocity) * 15, 80);
    const swirlDirection = Math.sign(velocity) !== 0 ? Math.sign(velocity) : 1;
    
    for(let i = 0; i < particleCount; i++) {
      const x = posArray[i*3];
      const y = posArray[i*3+1];
      const z = posArray[i*3+2];
      
      let angle = Math.atan2(z, x);
      let rad = Math.sqrt(x*x + z*z);
      
      // Scatter logic: Orbit faster and push outwards when scrolling
      angle += delta * 0.5 * swirlDirection * (1 + scatterStrength * 0.1);
      rad += delta * scatterStrength * 2;
      
      if (rad > 60) {
        rad = 8 + Math.random() * 5; // Re-spawn near the inner edge
      }
      
      posArray[i*3] = rad * Math.cos(angle);
      posArray[i*3+2] = rad * Math.sin(angle);
      
      // Vertical drift
      posArray[i*3+1] = y + delta * (scatterStrength + 0.5) * swirlDirection;
      if (posArray[i*3+1] > 40) posArray[i*3+1] = -40;
      if (posArray[i*3+1] < -40) posArray[i*3+1] = 40;
    }
    
    positionsAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.10} 
        color="#00f3ff" 
        transparent 
        opacity={0.6} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
