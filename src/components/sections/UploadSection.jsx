import React from 'react';
import { UploadCloud } from 'lucide-react';
import styles from './UploadSection.module.css';

export default function UploadSection() {
  return (
    <section id="upload" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Upload Works</h2>
          <p>Add new pieces directly to your portfolio repository.</p>
        </div>

        <div className={styles.uploadArea}>
          <div className={styles.dashedBorder}>
            <UploadCloud className={styles.icon} />
            <h3>Drag & Drop your images here</h3>
            <p className={styles.hint}>or click to browse your files (JPEG, PNG, WebP)</p>
            <button className={styles.browseButton}>Browse Files</button>
          </div>
        </div>
      </div>
    </section>
  );
}
