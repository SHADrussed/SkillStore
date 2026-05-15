import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Product from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function handleLogin(userData) {
    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));
  }

  function handleLogout() {
    setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }

  return (
    <>
      <Navbar user={user} onLogin={handleLogin} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
