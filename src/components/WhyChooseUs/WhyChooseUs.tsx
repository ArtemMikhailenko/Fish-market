'use client';
import React, { useEffect, useState, useRef } from 'react';
import styles from './WhyChooseUs.module.css';

const WhyChooseUs: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  const features = [
    {
      id: 1,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
        </svg>
      ),
      title: "Свежая икра",
      text: "Мы получаем новую партию икры каждую неделю, чтобы вы всегда наслаждались свежим продуктом высочайшего качества.",
      color: "#f85959"
    },
    {
      id: 2,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
          <path d="M12 6v2"></path>
          <path d="M12 16v2"></path>
        </svg>
      ),
      title: "Доступные цены",
      text: "Покупая икру у нас, вы экономите до 30% благодаря прямым поставкам без посредников и нашей эффективной системе логистики.",
      color: "#41b883"
    },
    {
      id: 3,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
      title: "Быстрая доставка",
      text: "Отправляем заказы по всей России в течение 24 часов. Доставка занимает всего 1–2 дня до любого населённого пункта.",
      color: "#4d7cfe"
    }
  ];

  return (
    <section className={styles.whySection} ref={sectionRef} id="about" >
      <div className={styles.decorCircle1}></div>
      <div className={styles.decorCircle2}></div>
      <div className={styles.decorDots}></div>
      
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <span className={styles.subtitle}>Преимущества</span>
          <h2 className={styles.title}>
            Почему выбирают <span className={styles.highlight}>нас</span>?
          </h2>
          <div className={styles.titleDecor}></div>
        </div>
        
        <div className={styles.contentWrapper}>
          {/* Левая часть с иконками и текстом */}
          <div className={styles.features}>
            {features.map((feature, index) => (
              <div 
                key={feature.id}
                className={`${styles.featureItem} ${isInView ? styles.animate : ''}`}
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  '--feature-color': feature.color,
                } as React.CSSProperties}
              >
                <div className={styles.iconBox}>
                  {feature.icon}
                  <div className={styles.iconRing}></div>
                </div>
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureText}>{feature.text}</p>
                </div>
              </div>
            ))}
            
          </div>
          
          {/* Правая часть с изображением */}
          <div className={`${styles.imageWrapper} ${isInView ? styles.animate : ''}`}>
            <div className={styles.imageOverlay}></div>
            <img
              src="/image/about.jpg"
              alt="Красная икра на тарелке"
              className={styles.featureImage}
            />
            <div className={styles.imageBorder}></div>
            
            <div className={styles.testimonial}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <blockquote className={styles.testimonialText}>
                "Лучшая икра, которую я когда-либо пробовал! Невероятно свежая."
              </blockquote>
              <div className={styles.testimonialAuthor}>— Алексей К.</div>
            </div>
            
            <div className={styles.imageDecor1}></div>
            <div className={styles.imageDecor2}></div>
          </div>
        </div>
        
        <div className={`${styles.statsSection} ${isInView ? styles.animate : ''}`}>
          <div className={styles.statItem}>
            <div className={styles.statValue}>5+</div>
            <div className={styles.statLabel}>Лет опыта</div>
          </div>
          <div className={styles.statSeparator}></div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>2,800+</div>
            <div className={styles.statLabel}>Довольных клиентов</div>
          </div>
          <div className={styles.statSeparator}></div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>100%</div>
            <div className={styles.statLabel}>Гарантия качества</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;