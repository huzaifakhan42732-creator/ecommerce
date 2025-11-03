import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home.jsx";
import ProductCard from "./components/ProductCard.jsx";
import ProductDetails from "./components/Productdetails.jsx";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Chatbot from "./components/Chatbot.jsx";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  // Check backend connection once (only log it)
  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((res) => console.log(" Backend Connected:", res.data))
      .catch((err) => console.error(" Backend not connected:", err));
  }, []);

  //  Fetch products from backend
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProducts(res.data);
        console.log("Fetched products:", res.data);
      } catch (err) {
        console.log("Error fetching products:", err);
      }
    };
    getProducts();
  }, []);

  //  Local state updates
  const handleAdd = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
  };

  const handleEdit = (id, updatedData) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...updatedData } : p)));
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="app-root">
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home products={products} />} />

        {/* Product Dashboard */}
        <Route
          path="/products"
          element={
            <div className="product-page">
              <h1>🛍 Product Dashboard</h1>
              <div className="product-grid">
                {products.map((p) => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>
            </div>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              products={products}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAdd={handleAdd}
            />
          }
        />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

      <Chatbot />
      <Footer />
    </div>
  );
}

export default App;
