import React from "react";
import ProductCard from "../components/ProductCard";
import Chatbot from "../components/Chatbot";
import products from "../data/products";
import Home from "./home.css"



const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Huzaifa’s E-Store 🛒</h1>
        <p>Your one-stop shop for all tech products!</p>
      </header>

      <section className="product-section">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            name={p.name}
            price={p.price}
            image={p.image}
          />
        ))}
      </section>

      <section className="chatbot-section">
        <h2>Need Help? Chat with AI 🤖</h2>
        <Chatbot />
      </section>
    </div>
  );
};

export default Home;
