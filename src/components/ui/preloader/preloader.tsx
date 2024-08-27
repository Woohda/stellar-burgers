import React from 'react';
import styles from './preloader.module.css';

export const Preloader = () => (
  <div className={styles.preloader}>
    <div className={`${styles.circle_big} ${styles.preloader_circle}`} />
  </div>
);

export const PreloaderMini = () => (
  <div className={`${styles.preloader} mb-5`}>
  <div className={`${styles.circle_small} ${styles.preloader_circle}`} />
</div>
)
