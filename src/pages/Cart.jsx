import styles from "./Cart.module.css";
import favorite from "../assets/favorite.svg";
import del from "../assets/delete.svg";
import share from "../assets/drive_folder_upload.svg";
import CartItem from "../components/CartItem";
import { useEffect, useState } from "react";
import { addToCart, getCart, removeFromCart } from "../services/cart";

export default function Cart({ userId, products }) {
  async function refreshCart() {
    const data = await getCart();
    console.log("CART RAW RESPONSE:", data);

    const items = data?.products ?? [];

    console.log("CART ITEMS:", items);

    setCartItems(items);
  }
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    refreshCart();
  }, []);

  async function increment(id) {
    await addToCart(id);
    refreshCart();
  }

  async function decrement(id) {
    await removeFromCart(id);
    refreshCart();
  }

  const [selected, setSelected] = useState([]);
  const allSelected = selected.length === cartItems.length;

  function toggleSelectAll() {
    if (selected.length === cartItems.length) {
      setSelected([]); // снять всё
    } else {
      setSelected(cartItems.map((item) => item.id)); // выбрать всё
    }
  }
  function toggleItem(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }
  const selectedItems = cartItems;
  const totalCount = selectedItems.length;

  const total = selectedItems.reduce((sum, item) => {
    const price = Number(item.price);
    return sum + price; // quantity всегда 1
  }, 0);
  const discount = 0;
  console.log("RENDER cartItems:", cartItems);
  return (
    <>
      <div className={styles.cartCont}>
        <div className={styles.left}>
          <div className={styles.info}>
            <h1 className={styles.title}>Корзина</h1>
            <h2 className={styles.count}>кол-во: {/* {products.length}*/} </h2>
          </div>
          <div className={styles.allOptions}>
            <div className={styles.selectBox}>
              <label className={styles.selectAll}>
                <input
                  className={styles.selectAllButton}
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  // checked
                />
                <span className={styles.span}></span>
              </label>
              <p>выбрать все</p>
            </div>
            <div className={styles.icons}>
              <button className={styles.icon}>
                <img src={favorite} alt="favorite" />
              </button>
              <button className={styles.icon}>
                <img src={del} alt="favorite" />
              </button>
              <button className={styles.icon}>
                <img src={share} alt="favorite" />
              </button>
            </div>
          </div>
          <div className={styles.cartItems}>
            {Array.isArray(cartItems) &&
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  image={
                    item.image?.startsWith("http")
                      ? item.image
                      : `http://localhost:8000${item.image}`
                  }
                  quantity={1}
                  increment={() => increment(item.id)}
                  decrement={() => decrement(item.id)}
                  selected={selected.includes(item.id)}
                  onToggleSelect={() => {
                    setSelected((prev) =>
                      prev.includes(item.id)
                        ? prev.filter((id) => id !== item.id)
                        : [...prev, item.id],
                    );
                  }}
                />
              ))}
          </div>
        </div>
        <div className={styles.right}>
          <p className={styles.rightTitle}>Сведенья по заказу</p>
          <div className={styles.numbers}>
            <div className={styles.item}>
              <p className={styles.itemText}>Товары, кол-во</p>
              <p className={styles.itemText}>{totalCount} шт.</p>
            </div>
            <div className={styles.item}>
              <p className={styles.itemText}>Скидка</p>
              <p className={styles.itemText}>{discount} руб.</p>
            </div>
          </div>
          <div className={styles.total}>
            <p>Итог:</p>
            <p>{total} руб.</p>
          </div>
        </div>
      </div>
    </>
  );
}
