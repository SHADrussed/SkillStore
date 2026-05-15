import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../assets/logo.svg";
import logoName from "../assets/logoName.svg";
import bar from "../assets/bar.svg";
import search from "../assets/search.svg";
import mail from "../assets/attach_email.svg";
import AuthPopup from "./AuthPopup";
import { useState } from "react";

export default function Navbar({ user, onLogout, onLogin }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mode, setMode] = useState("login"); // login | register
  return (
    <nav className={styles.navigationContainer}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="logo" />
        <img src={logoName} alt="logoName" />
      </div>
      <div className={styles.centricNav}>
        <button className={styles.categoryMenu}>
          {/* При нажатии выпадает меню категорий */}
          <img src={bar} alt="menuBar" />
        </button>
        <section className={styles.searchContainer}>
          <div className={styles.searchIcon}>
            <img src={search} alt="search" />
          </div>
          <input className={styles.searchBar} type="search" />
        </section>
        <div className={styles.messagesContainer}>
          <img src={mail} alt="mail" />
          <p>message</p>
        </div>
      </div>

      <div className={styles.optionsContainer}>
        {/* Это после регистрации */}

        {/* <Link to="/orders">Заказы</Link>
        <Link to="/profile">Профиль</Link>
        <Link to="/saved">Избранное</Link>
        <Link to="/cart">Корзина</Link> */}

        {/* При помощи поп апов */}
        {!user ? (
          <>
            <button
              className={styles.loginButtons}
              onClick={() => {
                setMode("register");
                setIsAuthOpen(true);
              }}
            >
              Регистрация
            </button>
            <button
              className={styles.loginButtons}
              onClick={() => {
                setMode("login");
                setIsAuthOpen(true);
              }}
            >
              Вход
            </button>
            {isAuthOpen && (
              <AuthPopup
                mode={mode}
                onClose={() => setIsAuthOpen(false)}
                onLogin={(user) => {
                  setIsAuthOpen(false);
                  onLogin(user);
                }}
              />
            )}
          </>
        ) : (
          <>
            <span>Привет, {user.username || user.name || user.email}</span>
            <button className={styles.loginButtons} onClick={onLogout}>
              Выйти
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
