'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Подключаем базовые стили Swiper
import styles from './BenefitsSlider.module.css';

// Массив данных для слайдов: заголовок, текст, картинка
const slidesData = [
  {
    title: 'Упругие икринки',
    text: 'Мы строго соблюдаем все процессы производства, чтобы икра оставалась свежей и плотной.',
    image: '/image/caviar-1.webp',
  },
  {
    title: 'Рассыпчатая икра',
    text: 'Каждая икорка отделена друг от друга, зерно не слипается.',
    image: '/image/caviar-2.webp',
  },
  {
    title: 'Соответствует виду рыбы',
    text: 'Икра соответствует стандартам для каждого вида рыбы.',
    image: '/image/caviar-3.webp',
  },
  {
    title: 'Не пересолена',
    text: 'Мы используем умеренное количество соли, чтобы сохранить нежный вкус.',
    image: '/image/caviar-4.webp',
  },
];

const BenefitsSlider: React.FC = () => {
  return (
    <section className={styles.benefitsSection}>
      <h2 className={styles.title}>Преимущества нашей икры</h2>
      <p className={styles.subtitle}>
        Выбирая нашу икру, вы получаете премиум-качество и неповторимый вкус!
      </p>

      <Swiper
        loop={true}                // Включаем бесконечную прокрутку
        spaceBetween={20}          // Расстояние между слайдами
        slidesPerView={3}          // Количество слайдов на экране по умолчанию
        breakpoints={{
          320: { slidesPerView: 1 },   // Мобильные (до 320px)
          768: { slidesPerView: 2 },   // Планшеты (до 768px)
          1024: { slidesPerView: 3 },  // Десктоп (до 1024px и выше)
        }}
        className={styles.swiperContainer}
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={styles.card}>
              <img
                src={slide.image}
                alt={slide.title}
                className={styles.cardImage}
              />
              <h3 className={styles.cardTitle}>{slide.title}</h3>
              <p className={styles.cardText}>{slide.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BenefitsSlider;
