import React from 'react';
import { Send } from 'lucide-react';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h2>Let's Create Together</h2>
            <p>Available for freelance opportunities and collaborations.</p>
          </div>
          
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputGroup}>
              <input type="text" className={styles.input} placeholder="Name" required />
              <div className={styles.bottomBorder}></div>
            </div>
            
            <div className={styles.inputGroup}>
              <input type="email" className={styles.input} placeholder="Email" required />
              <div className={styles.bottomBorder}></div>
            </div>
            
            <div className={styles.inputGroup}>
              <textarea className={styles.textarea} placeholder="Message" rows="4" required></textarea>
              <div className={styles.bottomBorder}></div>
            </div>
            
            <button className={styles.submitButton} type="submit">
              <span>Send Message</span>
              <Send className={styles.icon} size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
