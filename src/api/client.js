const BASE_URL = "https://marketplace-x6sc.onrender.com";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products/`);
  return res.json();
}
