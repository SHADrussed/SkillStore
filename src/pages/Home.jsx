import ProductCardSmall from "../components/ProductCardSmall";
import ProductCardLarge from "../components/ProductCardLarge";
import styles from "./Home.module.css";
import AdBlock from "../components/AdBlock";
import searchCircle from "../assets/searchCircle.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../services/products";

export default function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }

    loadProducts();
  }, []);

  const topProducts = products.slice(0, 5);

  return (
    <div className={styles.homeCont}>
      <AdBlock images={["/adImageExample.png"]} />

      <div className={styles.upperHome}>
        <h1 className={styles.title}>Топ-товары</h1>
      </div>

      {/* TOP */}
      <section className={styles.topCards}>
        {topProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            style={{ cursor: "pointer" }}
          >
            <ProductCardSmall
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          </div>
        ))}
      </section>

      {/* ALL */}
      <section className={styles.generalCards}>
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            style={{ cursor: "pointer" }}
          >
            <ProductCardLarge
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          </div>
        ))}
      </section>

      <div className={styles.linkContainer}>
        <Link className={styles.link} to="/catalog">
          Перейти в каталог
        </Link>
      </div>
    </div>
  );
}
