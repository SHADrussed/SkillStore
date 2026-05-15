import styles from "./Footer.module.css";
import logo from "../assets/logo.svg";
import logoName from "../assets/logoName.svg";
import vk from "../assets/vk.svg";
import dzen from "../assets/dzen.svg";
import tg from "../assets/telegram.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className={styles.footerContainer}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="logo" />
          <img src={logoName} alt="logoName" />
        </div>

        <div className={styles.mainBlock}>
          <div className={styles.menuContainer}>
            <h3 className={styles.menuTitle}>Меню</h3>
            <Link className={styles.menuEl} to="/">
              Главная
            </Link>
            {/* <Link className={styles.menuEl} to="/profile">
              Профиль
            </Link> */}
            <Link className={styles.menuEl} to="/cart">
              Корзина
            </Link>
          </div>
          <div className={styles.contactsContainer}>
            <h3 className={styles.contactsTitle}>Контакты</h3>
            <a className={styles.contactsEl} href="tel:+7 908 800 80 80">
              +7 908 800 80 80
            </a>
            <a className={styles.contactsEl} href="mailto:help@interier.com">
              help@interier.com
            </a>
            <div className={styles.icons}>
              <a className={styles.icon} href="#">
                <img src={vk} alt="Вк" />
              </a>
              <a className={styles.icon} href="#">
                <img src={tg} alt="Телеграм" />
              </a>
              <a className={styles.icon} href="#">
                <img src={dzen} alt="Дзен" />
              </a>
            </div>
          </div>
          <div className={styles.searchBlock}>
            <p className={styles.searchBlockTitle}>Поиск товара</p>
            <input
              placeholder="Артикль"
              type="text"
              className={styles.searchBlockInput}
            />
            <button className={styles.searchBlockButton}>Поиск</button>
          </div>
        </div>
      </footer>
    </>
  );
}
