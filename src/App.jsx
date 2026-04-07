import React from 'react';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import GallerySection from './components/sections/GallerySection';
import UploadSection from './components/sections/UploadSection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';
import SmoothScroll from './components/layout/SmoothScroll';
import styles from './App.module.css';

const weddingModules = import.meta.glob('./assets/images/wedding/*.{jpeg,jpg,png,webp}', { eager: true, query: '?url', import: 'default' });
const fashionModules = import.meta.glob('./assets/images/fashion/*.{jpeg,jpg,png,webp}', { eager: true, query: '?url', import: 'default' });
const streetModules = import.meta.glob('./assets/images/street/*.{jpeg,jpg,png,webp}', { eager: true, query: '?url', import: 'default' });

const weddingImages = Object.values(weddingModules);
const fashionImages = Object.values(fashionModules);
const streetImages = Object.values(streetModules);

function App() {
  return (
    <SmoothScroll>
      <div className={styles.appContainer}>
        <Navbar />
        <main>
          <HeroSection />
          
          <GallerySection 
            id="gallery" 
            title="Wedding Photography" 
            subtext="Capturing timeless moments." 
            images={weddingImages} 
          />
          
          <GallerySection 
            id="fashion" 
            title="Fashion Photography" 
            subtext="Bold aesthetics and visionary styling." 
            images={fashionImages} 
          />
          
          <GallerySection 
            id="street" 
            title="Street Photography" 
            subtext="Raw emotions of the concrete jungle." 
            images={streetImages} 
          />
          
          <AboutSection />
          <UploadSection />
          <ContactSection />
        </main>
      </div>
    </SmoothScroll>
  );
}

export default App;
