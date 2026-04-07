import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="#" className={styles.logo}>
          <img 
            src="/logo.jpg" 
            alt="Pixelfino Logo" 
            style={{ 
              height: '80px', 
              width: '80px', 
              borderRadius: '50%', 
              objectFit: 'cover', 
              objectPosition: 'center' 
            }} 
          />
        </a>
        <nav className={styles.nav}>
          <a href="#gallery" className={styles.navLink}>Gallery</a>
          <a href="#about" className={styles.navLink}>About</a>
          <a href="#contact" className={styles.navLink}>Contact</a>
        </nav>
      </div>
    </header>
  );
}
