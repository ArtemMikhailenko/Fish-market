"use client";

import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./AdminLoginModal.module.css";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("https://api.ikraluxe.ru/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        throw new Error("Неверные учетные данные");
      }
      const data = await res.json();
      localStorage.setItem("adminToken", data.token);
      // Успешный вход
      onClose();
      router.push("/admin");
    } catch (error) {
      alert("Ошибка входа: неверные учетные данные");
    }
  };

  // Если модалка закрыта, не рендерим её
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2 className={styles.modalTitle}>Админ Вход</h2>
        <div className={styles.formGroup}>
          <label className={styles.label}>Имя пользователя</label>
          <input
            className={styles.input}
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Введите имя пользователя"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Пароль</label>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Введите пароль"
          />
        </div>
        <button className={styles.submitButton} onClick={handleLogin}>
          Войти
        </button>
      </div>
    </div>
  );
};

export default AdminLoginModal;
