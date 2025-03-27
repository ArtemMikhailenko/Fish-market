'use client';
import React, { useState, useEffect } from "react";
import styles from "./ReviewsBlock.module.css";
import { reviews } from "./rewies";

const ReviewsBlock = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  // Определяем количество видимых карточек в зависимости от ширины окна
  const getVisibleCards = () => {
    if (windowWidth <= 576) return 1;
    if (windowWidth <= 992) return 2;
    return 3;
  };
  
  // Вычисляем максимальный индекс с учетом количества видимых карточек
  const visibleCards = getVisibleCards();
  const maxIndex = Math.max(0, reviews.length - visibleCards);
  
  // Следим за изменением размера окна
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Автоматическое переключение слайдов
  useEffect(() => {
    let interval:any;
    
    if (autoplay) {
      interval = setInterval(() => {
        setActiveIndex(prev => prev < maxIndex ? prev + 1 : 0);
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, maxIndex]);
  
  // Простые функции навигации
  const goToNext = () => {
    setActiveIndex(prev => prev < maxIndex ? prev + 1 : 0);
    pauseAutoplay();
  };
  
  const goToPrev = () => {
    setActiveIndex(prev => prev > 0 ? prev - 1 : maxIndex);
    pauseAutoplay();
  };
  
  const goToSlide = (index:any) => {
    setActiveIndex(Math.min(maxIndex, Math.max(0, index)));
    pauseAutoplay();
  };
  
  // Функция для паузы автопрокрутки
  const pauseAutoplay = () => {
    setAutoplay(false);
    // Возобновляем через 10 секунд неактивности
    setTimeout(() => setAutoplay(true), 10000);
  };

  return (
    <div className={styles.reviewsContainer} id="reviews">
      <div className={styles.content}>
        <div className={styles.headerContent}>
          <span className={styles.tagline}>Мнения наших клиентов</span>
          <h2 className={styles.heading}>
            Что <span className={styles.headingHighlight}>говорят</span> о нас
          </h2>
          <p className={styles.subtitle}>
            Более 2000 довольных клиентов уже оценили качество нашей икры
          </p>
        </div>

        <div className={styles.sliderWrapper}>
          {/* Кнопки навигации */}
          <button 
            className={`${styles.navButton} ${styles.prevButton}`} 
            onClick={goToPrev}
            disabled={activeIndex === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <button 
            className={`${styles.navButton} ${styles.nextButton}`} 
            onClick={goToNext}
            disabled={activeIndex >= maxIndex}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          
          {/* Контейнер для карточек */}
          <div className={styles.cardsContainer}>
            <div 
              className={styles.cardsTrack}
              style={{ 
                transform: windowWidth <= 576 
                  ? `translateX(-${activeIndex * 100}%)`
                  : windowWidth <= 992 
                    ? `translateX(-${activeIndex * 50}%)` 
                    : `translateX(-${activeIndex * 33.33}%)`
              }}
            >
              {reviews.map((review, index) => (
                <div key={review.id} className={styles.cardWrapper}>
                  <div className={styles.card}>
                    <div className={styles.imageWrapper}>
                      <img 
                        src={review.avatar} 
                        alt={`Отзыв клиента #${review.id}`}
                        className={styles.reviewImage}
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.cardOverlay}></div>
                    <div className={styles.badgeWrapper}>
                      <div className={styles.reviewBadge}>
                        <span className={styles.badgeIcon}>✓</span>
                        <span className={styles.badgeText}>Проверено</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Индикаторы */}
          <div className={styles.indicators}>
            {Array.from({ length: Math.min(maxIndex + 1, 9) }).map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === activeIndex ? styles.activeIndicator : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Слайд ${index + 1}`}
              />
            ))}
            {maxIndex + 1 > 9 && (
              <span className={styles.indicatorMore}>...</span>
            )}
          </div>
        </div>
        
        <div className={styles.trustBadge}>
          <div className={styles.trustIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <div className={styles.trustContent}>
            <div className={styles.trustTitle}>100% Гарантия качества</div>
            <div className={styles.trustText}>Если вам не понравится икра, мы вернём деньги</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsBlock;