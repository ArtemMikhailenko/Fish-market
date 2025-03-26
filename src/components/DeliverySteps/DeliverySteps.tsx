'use client';
import React from 'react';
import { ShoppingCart, CreditCard, Truck, Smile, Send } from 'lucide-react';
import styles from './DeliverySteps.module.css';

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: <ShoppingCart className={styles.stepIconSvg} />,
    title: 'Выберите товар',
    description: 'Оформите заказ на сайте, добавив нужные товары в корзину.',
  },
  {
    icon: <CreditCard className={styles.stepIconSvg} />,
    title: 'Оплатите заказ',
    description: 'Оплатите удобным способом: картой или наложенным платежом.',
  },
  {
    icon: <Send className={styles.stepIconSvg} />,
    title: 'Telegram-консультация',
    description: 'Наш менеджер свяжется с вами в Telegram, чтобы уточнить детали.',
  },
  {
    icon: <Truck className={styles.stepIconSvg} />,
    title: 'Доставка',
    description: 'Мы отправим заказ «Новой Почтой». Доставка по всей Украине за 1–2 дня.',
  },
  {
    icon: <Smile className={styles.stepIconSvg} />,
    title: 'Наслаждайтесь',
    description: 'Получите свежую икру и наслаждайтесь в кругу близких!',
  },
];

const DeliverySteps: React.FC = () => {
  return (
    <section className={styles.deliverySection}>
      <div className={styles.sectionContent}>
        <h2 className={styles.title}>Условия доставки и оплаты</h2>
        <p className={styles.subtitle}>
          Всё просто: оформляйте заказ — и мы быстро доставим свежую икру прямо к вам!
        </p>

        <div className={styles.stepsContainer}>
          <div className={styles.stepLine}></div>

          <div className={styles.stepList}>
            {steps.map((step, index) => (
              <div key={index} className={styles.stepItem}>
                <div className={styles.stepIcon}>
                  {step.icon}
                </div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliverySteps;