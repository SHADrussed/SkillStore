const BASE_URL = "http://localhost:8000";

export async function loginUser(email, password) {
  const response = await fetch(`${BASE_URL}/users/login/`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  localStorage.setItem("token", data.access);

  if (!response.ok) {
    throw new Error(data.detail || "Login error");
  }

  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);

  return data;
}

export async function registerUser(username, email, password) {
  const response = await fetch(`${BASE_URL}/users/register/`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  return await response.json();
}
