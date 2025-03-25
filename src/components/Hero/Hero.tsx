'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        {/* Текстовый блок */}
        <motion.div
          className={styles.textBlock}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <h1 className={styles.title}>
            Премиальная <br /> Красная Икра
          </h1>
          <p className={styles.subtitle}>
            Самая свежая украинская икра высочайшего качества.
            Наслаждайтесь истинным вкусом морских деликатесов.
          </p>
          <motion.button
            className={styles.ctaButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Заказать сейчас
          </motion.button>
        </motion.div>

        {/* Блок с изображением */}
        <div className={styles.imageBlock}>
          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <img
              src="/image/hero.webp"
              alt="Премиальная красная икра"
              className={styles.heroImage}
            />
          </motion.div>

          {/* Плавающие карточки */}
          <motion.div
            className={styles.statsCard}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2К+</span>
              <span className={styles.statLabel}>Довольных клиентов</span>
            </div>
          </motion.div>

          <motion.div
            className={styles.ratingCard}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className={styles.ratingContent}>
              <span className={styles.ratingNumber}>4.8</span>
              <div className={styles.ratingStars}>★★★★☆</div>
              <span className={styles.ratingLabel}>Средняя оценка</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
