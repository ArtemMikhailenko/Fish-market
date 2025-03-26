"use client";
import React from "react";
import { Phone, Clock, MessageCircle } from "lucide-react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.decorElementLeft}></div>
      <div className={styles.decorElementRight}></div>
      
      <div className={styles.footerContainer}>
        <div className={styles.leftSection}>
          <div className={styles.brandIdentity}>
            <img 
              src="/image/logo.svg" 
              alt="Premium Caviar Logo" 
              className={styles.companyLogo} 
            />
            <p className={styles.brandTagline}>
              Икра прямо от поставщика!
            </p>
          </div>
          <button className={styles.actionButton}>
            Заказать икру
          </button>
        </div>
        
        <div className={styles.rightSection}>
          <h3 className={styles.sectionTitle}>Контакты</h3>
          <div className={styles.contactGroup}>
            <div className={styles.contactItem}>
              <Phone className={styles.contactIcon} />
              <span>+38 (067) 223-51-77</span>
            </div>
            <div className={styles.contactItem}>
              <Clock className={styles.contactIcon} />
              <span>пн-пт с 09:00 до 21:00</span>
            </div>
            <div className={styles.contactItem}>
              <MessageCircle className={styles.contactIcon} />
              <span>Telegram, Viber</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p className={styles.copyrightNotice}>
          © 2024 Premium Caviar. Все права защищены.
        </p>
      </div>
    </footer>
  );
};

export default Footer;