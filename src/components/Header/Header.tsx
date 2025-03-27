"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Header.module.css";
import AdminLoginModal from "../Admin/Login";
import OrderModal from "../OrderModal/OrderModal";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    if (typeof window !== 'undefined') {
      setActiveLink(window.location.pathname);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  // Animation variants
  const logoVariants = {
    hover: {
      scale: 1.05,
      rotate: 3,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    }
  };

  const navItemVariants = {
    hover: {
      scale: 1.05,
      color: '#e65c4f',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    }
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerBackgroundLayer}></div>
      
      <div className={styles.container}>
        {/* Logo Section with enhanced animation */}
        <Link href="/" className={styles.logoLink}>
          <motion.div 
            className={styles.logoContainer}
            variants={logoVariants}
            whileHover="hover"
          >
            <div className={styles.logoIconWrapper}>
              <img className={styles.logoIcon} src="/image/logo2.png" alt="" />
            </div>
            <div className={styles.logoTextContent}>
              <span className={styles.logoText}>Русская</span>
              <span className={styles.logoTextAccent}>Икра</span>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation Menu */}
        <nav className={styles.navigation}>
          {[
            { path: '#assortment', label: 'Ассортимент' },
            { path: '#about', label: 'О нас' },
            { path: '#reviews', label: 'Отзывы' },
            { path: '#delivery', label: 'Доставка' }
          ].map((item) => (
            <motion.div
              key={item.path}
              variants={navItemVariants}
              whileHover="hover"
              className={styles.navItemWrapper}
            >
              <Link 
                href={item.path} 
                className={`${styles.navLink} ${activeLink === item.path ? styles.activeNavLink : ''}`}
              >
                {item.label}
                <span className={styles.navLinkUnderline}></span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          {/* Вместо ссылки на /admin открываем модалку логина */}
          <button
            className={styles.adminButton}
            title="Админ панель"
            onClick={() => setIsLoginModalOpen(true)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </button>
          
          {/* Кнопка заказа теперь открывает модальное окно */}
          <motion.button 
            className={styles.callButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOrderModalOpen(true)}
          >
            <div className={styles.callButtonContent}>
              <div className={styles.callIconWrapper}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className={styles.callTextContent}>
                <span className={styles.callButtonText}>Заказать</span>
              </div>
            </div>
          </motion.button>

          <button
            className={`${styles.mobileMenuToggle} ${isMenuOpen ? styles.menuOpen : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={styles.menuLine}></span>
            <span className={styles.menuLine}></span>
            <span className={styles.menuLine}></span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav 
            className={styles.mobileNavigation}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
          >
            {[
              { path: '/assortment', label: 'Ассортимент' },
              { path: '/about', label: 'О нас' },
              { path: '/reviews', label: 'Отзывы' },
              { path: '/delivery', label: 'Доставка' }
            ].map((item) => (
              <Link 
                key={item.path}
                href={item.path} 
                className={`${styles.navLinkMobile} ${activeLink === item.path ? styles.activeNavLinkMobile : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Добавляем пункт для заказа в мобильном меню */}
            <button 
              className={styles.navLinkMobile}
              onClick={() => {
                setIsMenuOpen(false);
                // setIsOrderModalOpen(true);
              }}
            >
              Заказать
            </button>
            
            {/* Добавляем пункт для админа в мобильном меню */}
            <button 
              className={styles.navLinkMobile}
              onClick={() => {
                setIsMenuOpen(false);
                setIsLoginModalOpen(true);
              }}
            >
              Админ панель
            </button>
            
            <div className={styles.mobileSocial}>
              {/* Иконки социальных сетей */}
              <a href="#" className={styles.socialIcon} aria-label="Telegram">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" fill="currentColor"/>
                </svg>
              </a>
              {/* Другие иконки */}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      
      <div className={styles.decorCircle1}></div>
      <div className={styles.decorCircle2}></div>

      {/* Модальное окно для входа */}
      <AdminLoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      
      {/* Модальное окно для заказа */}
      <OrderModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </header>
  );
};

export default Header;