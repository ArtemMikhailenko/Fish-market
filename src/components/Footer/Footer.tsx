"use client";
import React from "react";
import { Phone, Clock, MessageCircle, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.backgroundLayer}></div>
      <div className={styles.decorCircle1}></div>
      <div className={styles.decorCircle2}></div>
      <div className={styles.decorCircle3}></div>
      <div className={styles.decorCircle4}></div>
      <div className={styles.decorPattern}></div>
      
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          <div className={styles.leftSection}>
            <div className={styles.brandIdentity}>
              <div className={styles.logoWrapper}>
                <img
                  src="https://res.cloudinary.com/dqx64qp0l/image/upload/v1744135842/logo1_rk3drd.png"
                  alt="Premium Caviar Logo"
                  className={styles.companyLogo}
                />
                <div className={styles.logoGlow}></div>
              </div>
            </div>
            
            <div className={styles.companyDescription}>
              <p>
                Мы предлагаем свежую икру высочайшего качества с доставкой по всей России. Наши продукты отличаются исключительным вкусом и полезными свойствами.
              </p>
            </div>
            
          </div>
          
          <div className={styles.rightSection}>
            <div className={styles.contactSection}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.titleAccent}>Свяжитесь</span> с нами
              </h3>
              
              <div className={styles.contactGroup}>
                <div className={styles.contactItem}>
                </div>
                
                <div className={styles.contactItem}>
                  <div className={styles.iconWrapper}>
                    <Clock size={20} className={styles.contactIcon} />
                  </div>
                  <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>Время работы:</span>
                    <span className={styles.contactText}>пн-пт с 09:00 до 21:00</span>
                  </div>
                </div>
                
                <div className={styles.contactItem}>
                  <div className={styles.iconWrapper}>
                    <MessageCircle size={20} className={styles.contactIcon} />
                  </div>
                  <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>Мессенджеры:</span>
                    <a href="https://t.me/ikorny_magnat" className={styles.contactText}>Telegram</a>
                  </div>
                </div>
                
                <div className={styles.contactItem}>
                  <div className={styles.iconWrapper}>
                    <Mail size={20} className={styles.contactIcon} />
                  </div>
                  <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>Email:</span>
                    <a href="mailto:info@premiumcaviar.com" className={styles.contactText}>info@premiumcaviar.com</a>
                  </div>
                </div>
                
                <div className={styles.contactItem}>
                  <div className={styles.iconWrapper}>
                    <MapPin size={20} className={styles.contactIcon} />
                  </div>
                  <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>Адрес:</span>
                    <span className={styles.contactText}>г. Киев, ул. Примерная, 123</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <div className={styles.innerContainer}>
          <p className={styles.copyrightNotice}>
            © 2024 Premium Caviar. Все права защищены.
          </p>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>Политика конфиденциальности</a>
            <span className={styles.divider}>|</span>
            <a href="#" className={styles.footerLink}>Условия использования</a>
            <span className={styles.divider}>|</span>
            <a href="#" className={styles.footerLink}>Доставка и оплата</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;