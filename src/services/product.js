const BASE_URL = "http://localhost:8000";

export async function createProduct(productData) {
  const token = localStorage.getItem("access");

  const formData = new FormData();

  formData.append("title", productData.title);
  formData.append("price", productData.price);
  formData.append("description", productData.description);
  formData.append("image", productData.image);

  const response = await fetch(`${BASE_URL}/products/product/`, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${token}`,
    },

    body: formData,
  });

  return await response.json();
}
