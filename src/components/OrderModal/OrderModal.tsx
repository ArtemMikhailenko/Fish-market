"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./OrderModal.module.css";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    telegram: "",
    comment: ""
  });
  
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phone: false
  });

  // Закрытие модального окна при нажатии Escape
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    
    // Предотвращаем прокрутку страницы при открытом модальном окне
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Сбрасываем ошибку при вводе
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const validateForm = () => {
    const errors = {
      name: formData.name.trim() === "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      phone: !/^\+?[0-9\s-()]{10,18}$/.test(formData.phone)
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Здесь будет логика отправки формы
      console.log("Отправка формы:", formData);
      
      // Сбрасываем форму и закрываем модальное окно
      setFormData({
        name: "",
        email: "",
        phone: "",
        telegram: "",
        comment: ""
      });
      
      onClose();
      
      // Можно добавить сообщение об успешной отправке
      alert("Спасибо за ваш заказ! Мы свяжемся с вами в ближайшее время.");
    }
  };

  // Анимации для модального окна
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.modalWrapper}>
          <motion.div
            className={styles.backdrop}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          
          <motion.div
            className={styles.modal}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Оформление заказа</h2>
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Закрыть"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <p className={styles.modalDescription}>
                Оставьте ваши контактные данные, и мы свяжемся с вами для уточнения деталей заказа
              </p>
              
              <form className={styles.orderForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.inputLabel} htmlFor="name">
                    Ваше имя <span className={styles.requiredMark}>*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`${styles.input} ${formErrors.name ? styles.inputError : ""}`}
                    placeholder="Иван Иванов"
                    required
                  />
                  {formErrors.name && (
                    <span className={styles.errorMessage}>Пожалуйста, укажите ваше имя</span>
                  )}
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.inputLabel} htmlFor="email">
                    Электронная почта <span className={styles.requiredMark}>*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${styles.input} ${formErrors.email ? styles.inputError : ""}`}
                    placeholder="example@mail.com"
                    required
                  />
                  {formErrors.email && (
                    <span className={styles.errorMessage}>Пожалуйста, укажите корректный email</span>
                  )}
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.inputLabel} htmlFor="phone">
                    Телефон <span className={styles.requiredMark}>*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`${styles.input} ${formErrors.phone ? styles.inputError : ""}`}
                    placeholder="+7 (___) ___-__-__"
                    required
                  />
                  {formErrors.phone && (
                    <span className={styles.errorMessage}>Пожалуйста, укажите корректный номер телефона</span>
                  )}
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.inputLabel} htmlFor="telegram">
                    Telegram <span className={styles.optionalMark}>(необязательно)</span>
                  </label>
                  <input
                    id="telegram"
                    type="text"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="@username"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.inputLabel} htmlFor="comment">
                    Комментарий к заказу <span className={styles.optionalMark}>(необязательно)</span>
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="Укажите особые пожелания к заказу..."
                    rows={3}
                  />
                </div>
                
                <div className={styles.buttonContainer}>
                  <motion.button
                    type="submit"
                    className={styles.submitButton}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Отправить заявку
                  </motion.button>
                </div>
              </form>
            </div>
            
            <div className={styles.modalFooter}>
              <p className={styles.privacyPolicy}>
                Нажимая кнопку "Отправить заявку", вы соглашаетесь с 
                <a href="/privacy-policy" className={styles.policyLink}>политикой конфиденциальности</a>
              </p>
            </div>
            
            {/* Декоративные элементы */}
            <div className={styles.decorCircle1}></div>
            <div className={styles.decorCircle2}></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OrderModal;