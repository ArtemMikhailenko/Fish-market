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
                  src="/image/logo1.png"
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
                  <div className={styles.iconWrapper}>
                    <Phone size={20} className={styles.contactIcon} />
                  </div>
                  <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>Телефон:</span>
                    <a href="tel:+380672235177" className={styles.contactText}>+38 (067) 223-51-77</a>
                  </div>
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
                    <span className={styles.contactText}>Telegram, Viber</span>
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
            
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Telegram">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none">
                  <path d="M21.5 4.5L2.5 12.5l5 2 3 6 2-4.5 9-5.5z" fill="currentColor"/>
                  <path d="M11.5 14.5l-4-2 9.5-4.5-5.5 6.5z" fill="white"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Viber">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 5.5 4.5 10 10 10s10-4.5 10-10c0-5.5-4.5-10-10-10M8.5 7.6c.3.1.5.4.6.7.3.9.5 1.9.8 2.8.1.3 0 .6-.2.8l-.8.8c-.2.2-.3.5-.1.8.7 1.4 1.7 2.5 3.1 3.2.3.1.6.1.8-.1l.8-.8c.2-.2.5-.3.8-.1.9.3 1.9.5 2.8.8.3.1.5.4.6.7.1.4-.1.9-.4 1.2-.8.7-1.8 1.1-2.9 1.1-.1 0-.2 0-.4-.1-3.1-.5-5.7-2.3-7.5-4.8-1.8-2.6-2.5-5.6-1.8-8.7.3-1.2 1-2.1 2.1-2.6.2-.1.4-.2.7-.1z" fill="currentColor"/>
                </svg>
              </a>
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