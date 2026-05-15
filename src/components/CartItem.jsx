import styles from "./CartItem.module.css";
import favorite from "../assets/favorite.svg";
import del from "../assets/delete.svg";
import share from "../assets/drive_folder_upload.svg";
import minus from "../assets/minus.svg";
import plus from "../assets/plus.svg";
import { useState } from "react";
import { removeFromCart } from "../services/cart";

export default function CartItem({
  id,
  title,
  price,
  quantity,
  image,
  increment,
  decrement,
  selected,
  onToggleSelect,
}) {
  async function handleDelete() {
    await removeFromCart(id);
    window.location.reload(); // временно, потом уберём
  }
  return (
    <>
      <div className={styles.cartItem}>
        <div className={styles.firstBlock}>
          <img className={styles.productImg} src={image} />
          <label className={styles.selectProduct}>
            <input
              value="selectProduct"
              type="checkbox"
              checked={selected}
              onChange={onToggleSelect}
              // checked
            />
            <span className={styles.span}></span>
          </label>
        </div>
        <div className={styles.secondBlock}>
          <div className={styles.info}>
            <p className={styles.title}>{title}</p>
            {/* Дата добавления
            <p className={styles.data}></p> */}
          </div>
          <div className={styles.icons}>
            <button className={styles.icon}>
              <img src={favorite} alt="favorite" />
            </button>
            <button className={styles.icon} onClick={handleDelete}>
              <img src={del} alt="del" />
            </button>
            <button className={styles.icon}>
              <img src={share} alt="favorite" />
            </button>
          </div>
        </div>
        <div className={styles.thirdBlock}>
          <div className={styles.pole}>
            <span>
              {/* <button
                onClick={() => increment(id)}
                className={styles.option}
                type="button"
              >
                <img src={minus} alt="minus" />
              </button>
            </span>
            <input
              type="number"
              onChange={() => {}}
              readOnly
              className={styles.inputText}
            />
            <span>
              <button onClick={() => decrement(id)} className={styles.option}>
                <img src={plus} alt="plus" />
              </button> */}
            </span>
          </div>
          <div className={styles.properties}>
            <p className={styles.property}>Цена {price} руб.</p>
            <p className={styles.property}>Скидка 0 руб.</p>
          </div>
        </div>
      </div>
    </>
  );
}
