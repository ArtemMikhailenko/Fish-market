'use client';
import React, { useEffect, useState, useRef } from 'react';
import { ShoppingCart, CreditCard, Truck, Smile, Send, Package, Clock } from 'lucide-react';
import styles from './DeliverySteps.module.css';
import OrderModal from '../OrderModal/OrderModal';

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const steps: Step[] = [
  {
    icon: <ShoppingCart className={styles.stepIconSvg} />,
    title: 'Выберите товар',
    description: 'Оформите заказ на сайте, добавив нужные товары в корзину. Большой выбор свежей икры.',
    color: '#e65c4f'
  },
  {
    icon: <CreditCard className={styles.stepIconSvg} />,
    title: 'Оплатите заказ',
    description: 'Оплатите удобным способом: картой онлайн, через банк.',
    color: '#f59e0b'
  },
  {
    icon: <Send className={styles.stepIconSvg} />,
    title: 'Telegram-консультация',
    description: 'Наш менеджер свяжется с вами в Telegram, чтобы уточнить детали и ответить на вопросы.',
    color: '#3b82f6'
  },
  {
    icon: <Truck className={styles.stepIconSvg} />,
    title: 'Доставка',
    description: 'Мы отправим заказ. Доставка по всей России с сохранением свежести.',
    color: '#10b981'
  },
  {
    icon: <Smile className={styles.stepIconSvg} />,
    title: 'Наслаждайтесь',
    description: 'Получите свежую икру и наслаждайтесь изысканным вкусом в кругу близких!',
    color: '#8b5cf6'
  },
];

const DeliverySteps: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className={styles.deliverySection} ref={sectionRef} id='delivery'>
      <div className={styles.decorCircle1}></div>
      <div className={styles.decorCircle2}></div>
      <div className={styles.decorPattern}></div>
      
      <div className={styles.sectionContent}>
        <div className={styles.headerContent}>
          <span className={styles.tagline}>Быстро и удобно</span>
          <h2 className={styles.title}>Условия доставки и оплаты</h2>
          <p className={styles.subtitle}>
            Всё просто: оформляйте заказ и мы быстро доставим свежую икру прямо к вам!
          </p>
        </div>

        <div className={styles.featuresBar}>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <Package size={24} />
            </div>
            <div className={styles.featureText}>Бережная упаковка</div>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <Clock size={24} />
            </div>
            <div className={styles.featureText}>Доставка 1-2 дня</div>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <Truck size={24} />
            </div>
            <div className={styles.featureText}>По всей Росссии</div>
          </div>
        </div>

        <div className={styles.stepsContainer}>
          <div className={styles.stepLine}>
            {steps.map((_, index) => (
              <div 
                key={index} 
                className={`${styles.stepLineNode} ${isVisible ? styles.animateNode : ''}`}
                style={{ 
                  animationDelay: `${0.2 + index * 0.2}s`,
                }}
              ></div>
            ))}
          </div>

          <div className={styles.stepList}>
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`
                  ${styles.stepItem} 
                  ${index % 2 === 0 ? styles.stepItemLeft : styles.stepItemRight}
                  ${isVisible ? styles.stepVisible : ''}
                  ${activeStep === index ? styles.stepActive : ''}
                `}
                style={{ 
                  '--step-color': step.color,
                  animationDelay: `${0.2 + index * 0.2}s` 
                } as React.CSSProperties}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className={styles.stepConnector}></div>
                
                <div className={styles.stepIcon}>
                  {step.icon}
                  <div className={styles.stepNumber}>{index + 1}</div>
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
      
      <div className={styles.ctaContainer}>
        <p className={styles.ctaText}>Готовы сделать заказ?</p>
        <a href="https://t.me/ikorny_magnat" className={styles.ctaButton} 
        // onClick={() => { setIsOrderModalOpen(true);}}
        >
          Заказать сейчас
        </a>
      </div>
      <OrderModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </section>
  );
};

export default DeliverySteps;