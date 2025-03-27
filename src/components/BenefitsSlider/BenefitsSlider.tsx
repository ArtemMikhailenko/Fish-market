'use client';
import React, { useState, useEffect } from 'react';
import styles from './BenefitsSlider.module.css';

// Данные для слайдов
const slidesData = [
  {
    title: 'Упругие икринки',
    text: 'Мы строго соблюдаем все процессы производства, чтобы икра оставалась свежей и плотной. Это обеспечивает сохранение всех полезных свойств продукта.',
    image: '/image/caviar-1.webp',
    accent: '#e65c4f',
  },
  {
    title: 'Рассыпчатая икра',
    text: 'Каждая икорка отделена друг от друга, зерно не слипается. Это признак правильной обработки и хранения нашей продукции.',
    image: '/image/caviar-2.webp',
    accent: '#f59e0b',
  },
  {
    title: 'Соответствует виду рыбы',
    text: 'Икра соответствует строгим стандартам для каждого вида рыбы. Мы гарантируем подлинность и натуральное происхождение нашей продукции.',
    image: '/image/caviar-3.webp',
    accent: '#10b981',
  },
  {
    title: 'Не пересолена',
    text: 'Мы используем умеренное количество соли, чтобы сохранить нежный вкус. Наша икра обладает идеальным балансом соли и натуральным вкусом.',
    image: '/image/caviar-4.webp',
    accent: '#3b82f6',
  },
];

const BenefitsSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  // Отслеживаем размер окна для адаптивности
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Автоматическая прокрутка
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  const goToSlide = (index:any) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500); // Match transition duration
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? slidesData.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => 
      prevIndex === slidesData.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section className={styles.benefitsSection}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <span className={styles.tagline}>Наши преимущества</span>
          <h2 className={styles.title}>
            Преимущества <span className={styles.highlight}>нашей икры</span>
          </h2>
          <p className={styles.subtitle}>
            Выбирая нашу икру, вы получаете премиум-качество, неповторимый вкус и пользу для здоровья!
          </p>
        </div>

        <div className={styles.sliderContainer}>
          <div className={styles.sliderTrack} 
            style={{ 
              transform: `translateX(calc(-${activeIndex * (windowWidth <= 700 ? 100 : windowWidth <= 1100 ? 50 : 33.33)}% - ${activeIndex * 15}px))`
            }}
          >
            {slidesData.map((slide, index) => (
              <div 
                key={index} 
                className={`${styles.slide} ${index === activeIndex ? styles.activeSlide : ''}`}
                style={{ 
                  '--accent-color': slide.accent 
                } as React.CSSProperties}
              >
                <div className={styles.cardImageContainer}>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={styles.cardImage}
                    loading="lazy"
                  />
                  <div className={styles.cardOverlay}></div>
                </div>
                
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{slide.title}</h3>
                  <div className={styles.cardDivider}></div>
                  <p className={styles.cardText}>{slide.text}</p>
                  <div className={styles.cardNumber}>{index + 1}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.controlsWrapper}>
            <button className={styles.sliderBtnPrev} onClick={goToPrev} aria-label="Предыдущий слайд">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            
            <div className={styles.pagination}>
              {slidesData.map((_, index) => (
                <button 
                  key={index}
                  className={`${styles.paginationDot} ${index === activeIndex ? styles.active : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Перейти к слайду ${index + 1}`}
                ></button>
              ))}
            </div>
            
            <button className={styles.sliderBtnNext} onClick={goToNext} aria-label="Следующий слайд">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.benefitStats}>
          <div className={styles.statItem}>
            <div className={styles.statValue}>95%</div>
            <div className={styles.statLabel}>уровень свежести</div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>100%</div>
            <div className={styles.statLabel}>натуральный продукт</div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>24ч</div>
            <div className={styles.statLabel}>быстрая доставка</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSlider;