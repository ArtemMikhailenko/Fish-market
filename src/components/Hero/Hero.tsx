'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Hero.module.css';
import OrderModal from '../OrderModal/OrderModal';

// Custom hook for parallax effect
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
};

const Hero: React.FC = () => {
  const { x, y } = useMousePosition();
  const [isLoaded, setIsLoaded] = useState(false);
  const [testimonials, setTestimonials] = useState([
    { id: 1, text: "Лучшая икра, которую я когда-либо пробовал!", author: "Иван К." },
    { id: 2, text: "Невероятно свежий вкус и отличное качество!", author: "Мария Л." },
    { id: 3, text: "Теперь только ваша икра на нашем столе!", author: "Алексей П." }
  ]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className={styles.heroSection}>
      <motion.div 
        className={styles.backgroundCircle1}
        animate={{
          x: x * 30 - 15,
          y: y * 30 - 15,
        }}
        transition={{ type: 'spring', damping: 50 }}
      />
      <motion.div 
        className={styles.backgroundCircle2}
        animate={{
          x: x * -40 + 20,
          y: y * -40 + 20,
        }}
        transition={{ type: 'spring', damping: 50 }}
      />

      <div className={styles.heroContent}>
        <motion.div
          className={styles.textBlock}
          initial={{ opacity: 0, x: -50 }}
          animate={isLoaded ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <div className={styles.label}>Высочайшее качество</div>
          <h1 className={styles.title}>
            Премиальная <span className={styles.highlight}>Красная</span> Икра
          </h1>
          <p className={styles.subtitle}>
            Самая свежая икра высочайшего качества.
            Наслаждайтесь истинным вкусом морских деликатесов из экологически чистых регионов.
          </p>
          
          {/* Testimonial slider */}
          <div className={styles.testimonialContainer}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={styles.testimonial}
              >
                <div className={styles.testimonialText}>"{testimonials[activeTestimonial].text}"</div>
                <div className={styles.testimonialAuthor}>— {testimonials[activeTestimonial].author}</div>
              </motion.div>
            </AnimatePresence>
            <div className={styles.testimonialDots}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.testimonialDot} ${index === activeTestimonial ? styles.activeDot : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>

          <div className={styles.ctaContainer}>
            <motion.a
              className={styles.ctaButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://t.me/ikorny_magnat"
            >
              Заказать сейчас
            </motion.a>
            <motion.a 
              href="#assortment" 
              className={styles.secondaryLink}
              whileHover={{ x: 5 }}
            >
              Смотреть каталог <span className={styles.arrow}>→</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Image block */}
        <div className={styles.imageBlock}>
          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={isLoaded ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            style={{
              x: x * -20,
              y: y * -20,
            }}
          >
            <div className={styles.imageShadow}></div>
            <img
              src="/image/hero.webp"
              alt="Премиальная красная икра"
              className={styles.heroImage}
            />
            <div className={styles.imageAccent}></div>
          </motion.div>

          {/* Floating cards */}
          <motion.div
            className={styles.statsCard}
            initial={{ opacity: 0, y: 30, x: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.8 }}
            style={{
              x: x * 15 + 'px',
              y: y * 15 + 'px',
            }}
          >
            <div className={styles.statsContent}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>2К+</span>
                <span className={styles.statLabel}>Довольных клиентов</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>24ч</span>
                <span className={styles.statLabel}>Быстрая доставка</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.ratingCard}
            initial={{ opacity: 0, y: -30, x: -30 }}
            animate={isLoaded ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.6 }}
            style={{
              x: x * -15 + 'px',
              y: y * -15 + 'px',
            }}
          >
            <div className={styles.ratingContent}>
              <span className={styles.ratingNumber}>4.8</span>
              <div className={styles.ratingStars}>★★★★<span className={styles.halfStar}>★</span></div>
              <span className={styles.ratingLabel}>Средняя оценка</span>
              <span className={styles.ratingCount}>из 512 отзывов</span>
            </div>
          </motion.div>

          {/* New quality badge */}
          <motion.div
            className={styles.qualityBadge}
            initial={{ opacity: 0, rotate: 15, scale: 0.8 }}
            animate={isLoaded ? { opacity: 1, rotate: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 1 }}
            style={{
              x: x * 10 + 'px',
              y: y * 10 + 'px',
            }}
          >
            <div className={styles.badgeInner}>
              <span className={styles.badgeText}>Premium</span>
              <span className={styles.badgeIcon}>✓</span>
              <span className={styles.badgeSubtext}>Quality</span>
            </div>
          </motion.div>
        </div>
      </div>
      <OrderModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </section>
  );
};

export default Hero;