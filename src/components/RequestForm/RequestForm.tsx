'use client';
import React, { useState, useEffect } from 'react';
import { Mail, User, Phone, Send, CheckCircle, Clock, Star, MessageCircle } from 'lucide-react';
import styles from './RequestForm.module.css';

const RequestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulating form submission
    setIsSubmitted(true);
    
    // Reset after animation completes
    setTimeout(() => {
      setFormData({
        email: '',
        name: '',
        phone: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };

  // Reset the submission state if the user starts typing again
  useEffect(() => {
    if (isSubmitted) {
      const anyChange = 
        formData.email !== '' || 
        formData.name !== '' || 
        formData.phone !== '';
      
      if (anyChange) {
        setIsSubmitted(false);
      }
    }
  }, [formData, isSubmitted]);

  return (
    <section className={styles.requestSection}>
      <div className={styles.decorCircle1}></div>
      <div className={styles.decorCircle2}></div>
      <div className={styles.decorTriangle}></div>
      
      <div className={styles.formWrapper}>
        <div className={styles.imageSide}>
          <div className={styles.imageOverlay}></div>
          <img
            src="/image/form.jpg"
            alt="Красная и чёрная икра"
            className={styles.bgImage}
          />
          <div className={styles.contentOverlay}>
            <span className={styles.imageBadge}>Премиум-качество</span>
            <h3>Получите консультацию эксперта</h3>
            <p>Заполните форму, и наш специалист поможет подобрать идеальный вариант икры для любого случая</p>
            
            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <CheckCircle className={styles.benefitIcon} />
                <span>Гарантия свежести</span>
              </div>
              <div className={styles.benefitItem}>
                <Clock className={styles.benefitIcon} />
                <span>Быстрая доставка</span>
              </div>
              <div className={styles.benefitItem}>
                <Star className={styles.benefitIcon} />
                <span>Лучшие сорта</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.formSide}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2 className={styles.title}>Оставьте заявку</h2>
              <p className={styles.subtitle}>
                Мы перезвоним вам в течение <span className={styles.highlight}>15 минут</span>
              </p>
            </div>
            
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <div className={`${styles.inputWrapper} ${focusedField === 'email' ? styles.focused : ''}`}>
                  <label className={styles.label}>
                    <div className={styles.iconWrapper}>
                      <Mail className={styles.inputIcon} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      placeholder="Ваш email"
                      className={styles.input}
                      required
                    />
                  </label>
                </div>
                
                <div className={`${styles.inputWrapper} ${focusedField === 'name' ? styles.focused : ''}`}>
                  <label className={styles.label}>
                    <div className={styles.iconWrapper}>
                      <User className={styles.inputIcon} />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      placeholder="Ваше имя"
                      className={styles.input}
                      required
                    />
                  </label>
                </div>
                
                <div className={`${styles.inputWrapper} ${focusedField === 'phone' ? styles.focused : ''}`}>
                  <label className={styles.label}>
                    <div className={styles.iconWrapper}>
                      <Phone className={styles.inputIcon} />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => handleFocus('phone')}
                      onBlur={handleBlur}
                      placeholder="(99) 999-99-99"
                      className={styles.input}
                      required
                    />
                  </label>
                </div>
              </div>
              
              <button 
                type="submit" 
                className={`${styles.submitButton} ${isSubmitted ? styles.submitted : ''}`}
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className={styles.buttonIcon} />
                    <span className={styles.submitText}>Заявка отправлена!</span>
                  </>
                ) : (
                  <>
                    <Send className={styles.buttonIcon} />
                    <span className={styles.submitText}>Отправить заявку</span>
                  </>
                )}
                <span className={styles.buttonAfterEffect}></span>
              </button>
            </form>
            
            <div className={styles.formFooter}>
              <div className={styles.securityNote}>
                <div className={styles.securityIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <p>Мы гарантируем конфиденциальность ваших данных</p>
              </div>
              
              <div className={styles.contactMethods}>
                <p>Или свяжитесь с нами:</p>
                <div className={styles.contactButtons}>
                  <a href="tel:+380999999999" className={styles.contactButton}>
                    <Phone size={16} />
                    <span>Позвонить</span>
                  </a>
                  <a href="https://t.me/username" className={styles.contactButton}>
                    <MessageCircle size={16} />
                    <span>Telegram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestForm;