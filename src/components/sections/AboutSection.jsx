import React from 'react';
import founderImg from '../../assets/images/founder.jpg';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            <img src={founderImg} alt="Photographer portrait" className={styles.image} />
            <div className={styles.glow}></div>
          </div>
        </div>
        <div className={styles.textColumn}>
          <h2 className={styles.heading}>The Visionary Behind the Lens</h2>
          <p className={styles.paragraph}>
            Based in a world of contrasts, my work explores the delicate balance between profound darkness and vibrant neon elements. I craft visual poems that speak through geometry, lighting, and pure digital artistry.
          </p>
          <p className={styles.paragraph}>
            Every collection challenges the conventions of traditional photography by blending it seamlessly with immersive 3D landscapes.
          </p>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <h3>150+</h3>
              <span>Projects</span>
            </div>
            <div className={styles.statItem}>
              <h3>12</h3>
              <span>Exhibitions</span>
            </div>
            <div className={styles.statItem}>
              <h3>5</h3>
              <span>Awards</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
