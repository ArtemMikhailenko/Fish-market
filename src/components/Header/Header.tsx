'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo Section with hover animation */}
        <Link href="/" className={styles.logoLink}>
          <motion.div 
            className={styles.logoContainer}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={styles.logoIcon}
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zm0 12l-10-5 10 5 10-5v7l-10 5-10-5v-7z"/>
            </svg>
            <span className={styles.logoText}>Premium Caviar</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation Menu */}
        <nav className={styles.navigation}>
          <Link href="/assortment" className={styles.navLink}>Ассортимент</Link>
          <Link href="/about" className={styles.navLink}>О нас</Link>
          <Link href="/reviews" className={styles.navLink}>Отзывы</Link>
          <Link href="/delivery" className={styles.navLink}>Доставка</Link>
        </nav>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          {/* Phone Call Button */}
          <button className={styles.callButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>Позвоните мне</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileMenuToggle}
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu with animate presence */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav 
            className={styles.mobileNavigation}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/assortment" className={styles.navLinkMobile}>Ассортимент</Link>
            <Link href="/about" className={styles.navLinkMobile}>О нас</Link>
            <Link href="/reviews" className={styles.navLinkMobile}>Отзывы</Link>
            <Link href="/delivery" className={styles.navLinkMobile}>Доставка</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
