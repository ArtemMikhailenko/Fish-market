import React from 'react';
import styles from './WhyChooseUs.module.css';

const WhyChooseUs: React.FC = () => {
  return (
    <section className={styles.whySection}>
      <h2 className={styles.title}>Почему выбирают нас?</h2>
      <div className={styles.contentWrapper}>
        
        {/* Левая часть с иконками и текстом */}
        <div className={styles.features}>
          <div className={styles.featureItem}>
            {/* Иконку можно заменить на свой SVG */}
            <div className={styles.iconBox}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.5 2 2 6.6 2 12s4.5 10 10 10 10-4.6 10-10S17.5 2 12 2zm-1 14.9V7.1c0-.6.4-1 1-1s1 .4 1 1v9.8c0 .6-.4 1-1 1s-1-.4-1-1z" />
              </svg>
            </div>
            <div>
              <h3 className={styles.featureTitle}>Свежая икра</h3>
              <p className={styles.featureText}>
                Мы получаем новую партию икры каждую неделю, 
                чтобы вы всегда наслаждались свежим продуктом.
              </p>
            </div>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.iconBox}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.1 0-2 .9-2 2v2h2V6h16v12H4v-2H2v2c0 1.1.9 2 2 2h16c1.1 
                  0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 10H9c-.6 0-1 .4-1 1s.4 1 1 
                  1h6c.6 0 1-.4 1-1s-.4-1-1-1zm3-4H6c-.6 0-1 .4-1 1s.4 1 1 
                  1h12c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
            </div>
            <div>
              <h3 className={styles.featureTitle}>Доступные цены</h3>
              <p className={styles.featureText}>
                Покупая икру у нас, вы экономите до 30% 
                благодаря прямым поставкам без посредников.
              </p>
            </div>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.iconBox}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
                viewBox="0 0 24 24"
              >
                <path d="M20.2 8.7L16.6 5c-.4-.4-1-.4-1.4 
                  0L10 10.3c-.4.4-.4 1 0 1.4l3.6 3.6c.4.4 1 
                  .4 1.4 0l5.3-5.3c.4-.4.4-1 0-1.3zM5.7 18.3c-.4.4-1 
                  .4-1.4 0l-1.3-1.3c-.4-.4-.4-1 0-1.4l8.1-8.1c.4-.4 
                  1-.4 1.4 0l1.3 1.3c.4.4.4 1 0 1.4l-8.1 8.1z" />
              </svg>
            </div>
            <div>
              <h3 className={styles.featureTitle}>Быстрая доставка</h3>
              <p className={styles.featureText}>
                Отправляем заказы по всей Украине. 
                Доставка «Новой Почтой» занимает всего 1–2 дня.
              </p>
            </div>
          </div>
        </div>

        {/* Правая часть с изображением */}
        <div className={styles.imageWrapper}>
          <img
            src="/image/about.jpg"
            alt="Красная икра на тарелке"
            className={styles.featureImage}
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
