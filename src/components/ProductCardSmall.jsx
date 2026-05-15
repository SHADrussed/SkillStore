import onAdd from "../services/onAdd";
import styles from "./ProductCardSmall.module.css";
import like from "../assets/likeSmall.svg";
import star from "../assets/star.svg";
import { addToCart } from "../services/cart";
const API = "http://localhost:8000";

export default function ProductCardSmall({ id, title, price, image }) {
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
        <p className={styles.cardTitle}>{title}</p>

        <div className={styles.stars}>
          {/* Нужно будет как то добавить шкалу внутрь звезд... */}

          <img src={star} />
          <img src={star} />
          <img src={star} />
          <img src={star} />
          <img src={star} />
        </div>

        <p className={styles.price}>Цена - {price}</p>

        {/* Этого нет в дизайне.. */}
        <button className={styles.add} onClick={handleAdd}>
          Add to cart
        </button>
      </div>
    </>
  );
}
