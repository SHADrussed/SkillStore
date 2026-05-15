import styles from "./AuthPopup.module.css";
import { useState } from "react";
import { loginUser, registerUser } from "../services/auth";

export default function AuthPopup({ onClose, onLogin, mode }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isRegister = mode === "register";

  async function handleLogin() {
    try {
      const data = await loginUser(email, password);

      if (!data.access) {
        alert("Неверный логин или пароль");
        return;
      }

      const userData = {
        email,
        token: data.access,
      };

      localStorage.setItem("access", data.access);

      onLogin(userData);
      onClose();
    } catch (e) {
      alert("Ошибка входа");
    }
  }

  async function handleRegister() {
    try {
      const data = await registerUser(username, email, password);

      if (data?.id || data?.email) {
        alert("Регистрация успешна");
        // автоматически логиним после регистрации
        handleLogin();
      } else {
        alert("Ошибка регистрации");
      }
    } catch (e) {
      alert("Ошибка сервера");
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button onClick={onClose}>X</button>

        <h2>{isRegister ? "Регистрация" : "Вход"}</h2>

        {isRegister && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isRegister ? (
          <button onClick={handleLogin}>Войти</button>
        ) : (
          <button onClick={handleRegister}>Зарегистрироваться</button>
        )}

        <p
          onClick={() =>
            mode === "register"
              ? onClose() // переключение делается в Navbar
              : onClose()
          }
          style={{ cursor: "pointer", color: "blue", marginTop: 10 }}
        >
          {isRegister ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Регистрация"}
        </p>
      </div>
    </div>
  );
}
