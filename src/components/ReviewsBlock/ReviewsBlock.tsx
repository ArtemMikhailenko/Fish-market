'use client';
import React, { useState, useEffect, useRef } from "react";
import styles from "./ReviewsBlock.module.css";
import { reviews } from "./rewies";

const ReviewsBlock: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setActiveIndex((prev) => (prev + 1) % reviews.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsAnimating(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX.current - touchStartX.current;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
      } else {
        setActiveIndex((prev) => (prev + 1) % reviews.length);
      }
    }

    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleCardClick = (index: number) => {
    if (!isAnimating && index !== activeIndex) {
      setIsAnimating(true);
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const getCardPosition = (index: number) => {
    if (index === activeIndex) return styles.active;
    if (index === (activeIndex - 1 + reviews.length) % reviews.length)
      return styles.prev;
    if (index === (activeIndex + 1) % reviews.length) return styles.next;
    return styles.hidden;
  };

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.content}>
        <h2 className={styles.heading}>
          Наши <span className={styles.headingHighlight}>отзывы</span> 
        </h2>

        <div
          className={styles.slider}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`${styles.card} ${getCardPosition(index)}`}
              onClick={() => handleCardClick(index)}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardInner}>
                  <div className={styles.avatarWrapper}>
                    <img
                      src={review.avatar}
                      alt="Отзыв покупателя"
                      className={styles.avatar}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Можно добавить индикаторы и другие элементы, если нужно */}
      </div>
    </div>
  );
};

export default ReviewsBlock;
