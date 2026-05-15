const BASE_URL = "http://localhost:8000";

export async function getCart() {
  const token = localStorage.getItem("access");

  const response = await fetch(`${BASE_URL}/cart/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}
export async function removeFromCart(productId) {
  const token = localStorage.getItem("access");

  await fetch(`${BASE_URL}/cart/remove/${productId}/`, {
    method: "DELETE",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export async function addToCart(productId) {
  const token = localStorage.getItem("access");

  console.log(productId);

  const response = await fetch(`${BASE_URL}/cart/add/`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      productId,
    }),
  });

  const data = await response.json();

  console.log(data);

  return data;
}
