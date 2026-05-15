import { useEffect, useState } from "react";

const API = "http://localhost:8000";

export default function AdminPage() {
  const [products, setProducts] = useState([]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access") || localStorage.getItem("token");

  // -----------------------
  // LOAD PRODUCTS
  // -----------------------
  async function loadProducts() {
    try {
      const res = await fetch(`${API}/products/`);
      const data = await res.json();

      const items = data?.results || data || [];
      setProducts(Array.isArray(items) ? items : []);
    } catch (e) {
      console.log("Ошибка загрузки товаров", e);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  // -----------------------
  // CREATE PRODUCT
  // -----------------------
  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !price || !description) {
      alert("Заполни все поля");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(`${API}/products/product/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      console.log("Создан товар:", data);

      // очистка формы
      setTitle("");
      setPrice("");
      setDescription("");
      setImage(null);

      loadProducts();
    } catch (e) {
      console.log("Ошибка создания товара", e);
    } finally {
      setLoading(false);
    }
  }

  // -----------------------
  // DELETE PRODUCT
  // -----------------------
  async function deleteProduct(id) {
    try {
      await fetch(`${API}/products/product/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      loadProducts();
    } catch (e) {
      console.log("Ошибка удаления", e);
    }
  }

  // -----------------------
  // UI
  // -----------------------
  return (
    <div style={{ padding: 20 }}>
      <h1>Админка</h1>

      {/* CREATE FORM */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          maxWidth: 400,
        }}
      >
        <input
          type="text"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Цена"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit" disabled={loading}>
          {loading ? "Создание..." : "Создать товар"}
        </button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      {/* PRODUCT LIST */}
      <h2>Товары</h2>

      {products.length === 0 && <p>Нет товаров</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 10,
              border: "1px solid #ccc",
            }}
          >
            <div>
              <b>{p.title}</b>
              <div>{p.price} ₽</div>
            </div>

            <button
              onClick={() => deleteProduct(p.id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
