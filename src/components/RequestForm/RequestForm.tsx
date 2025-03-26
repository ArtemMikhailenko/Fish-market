'use client';
import React, { useState } from 'react';
import { Mail, User, Phone, Send } from 'lucide-react';
import styles from './RequestForm.module.css';

const RequestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Enhanced form submission logic
    console.log('Form Submitted:', formData);
    alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
  };

  return (
    <section className={styles.requestSection}>
      <div className={styles.formWrapper}>
        <div className={styles.imageSide}>
          <div className={styles.imageOverlay}></div>
          <img
            src="/image/form.jpg"
            alt="Красная и чёрная икра"
            className={styles.bgImage}
          />
          <div className={styles.contentOverlay}>
            <h3>Получите консультацию</h3>
            <p>Заполните форму, и наш специалист поможет подобрать идеальный вариант</p>
          </div>
        </div>

        <div className={styles.formSide}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2 className={styles.title}>Оставьте заявку</h2>
              <p className={styles.subtitle}>
                Мы перезвоним вам в течение 15 минут
              </p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <Mail className={styles.inputIcon} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ваш email"
                    className={styles.input}
                    required
                  />
                </label>

                <label className={styles.label}>
                  <User className={styles.inputIcon} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ваше имя"
                    className={styles.input}
                    required
                  />
                </label>

                <label className={styles.label}>
                  <Phone className={styles.inputIcon} />
                    {/* <span className={styles.phonePrefix}>+380</span> */}
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(99) 999-99-99"
                      className={styles.inputPhone}
                    //   pattern="[0-9]{3}[0-9]{3}[0-9]{2}[0-9]{2}"
                      required
                    />
                </label>
              </div>

              <button type="submit" className={styles.submitButton}>
                <Send className={styles.buttonIcon} />
                Отправить заявку
              </button>
            </form>

            <div className={styles.formFooter}>
              <p>Мы гарантируем конфиденциальность ваших данных</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestForm;