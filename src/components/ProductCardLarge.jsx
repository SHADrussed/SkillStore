import styles from "./ProductCardLarge.module.css";
import like from "../assets/likeSmall.svg";
import star from "../assets/star.svg";
import { addToCart } from "../services/cart";
const API = "http://localhost:8000";

export default function ProductCardLarge({ id, title, image }) {
  async function handleAdd() {
    try {
      await addToCart(id);

      alert("Добавлено");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.cardTop}>
          <img className={styles.image} src={API + image} alt={title} />
          <img className={styles.like} src={like} alt={title} />
        </div>

        {/* Не знаю что за кнопка */}
        <button className={styles.add} onClick={handleAdd}>
          Add to cart
        </button>
      </div>
    </>
  );
}
