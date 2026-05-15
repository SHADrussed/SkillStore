import { useEffect, useState } from "react";
import styles from "./ProductPage.module.css";
import like from "../assets/likeSmall.svg";
import { addToCart } from "../services/cart";
import { useParams } from "react-router-dom";

const API = "http://localhost:8000";

export default function ProductPage() {
  const { id } = useParams(); // <-- ВОТ ЭТО ГЛАВНОЕ
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`${API}/products/${id}/`);
        const data = await res.json();
        setProduct(data);
      } catch (e) {
        console.log("Ошибка загрузки товара:", e);
      }
    }

    loadProduct();
  }, [id]);

  async function handleAddToCart() {
    if (!product) return;

    try {
      await addToCart(product.id);
      alert("Добавлено в корзину");
    } catch (e) {
      console.log("Ошибка добавления в корзину:", e);
    }
  }

  if (!product) return <p>Загрузка...</p>;
  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `${API}${product.image}`;

  return (
    <div className={styles.pageCont}>
      <div className={styles.product}>
        <div className={styles.left}>
          <div className={styles.imagesCont}>
            <img
              className={styles.mainImg}
              src={imageUrl}
              alt={product.title}
            />
          </div>

          <p className={styles.description}>
            {product.description || "Описание отсутствует"}
          </p>
        </div>

        <div className={styles.right}>
          <h1 className={styles.title}>{product.title}</h1>

          <div className={styles.properties}>
            <p className={styles.property}>Оценка: {product.rating || "—"}</p>
            <p className={styles.property}>
              Отзывы: {product.reviews_count || 0}
            </p>
            <p className={styles.property}>Цвет: {product.color || "—"}</p>
          </div>

          <div className={styles.manage}>
            <div className={styles.upper}>
              <p className={styles.price}>Цена — {product.price} ₽</p>
              <p className={styles.discount}>
                Скидка — {product.discount || 0} ₽
              </p>
            </div>

            <div className={styles.buttons}>
              <button onClick={handleAddToCart} className={styles.addButton}>
                Add to cart
              </button>

              <button className={styles.likeButton}>
                <img src={like} alt="like" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
