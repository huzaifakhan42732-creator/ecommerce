import React from "react";
import "./productCard.css";

const ProductCard = ({ name, price, image }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <div className="product-info">
        <h3>{name}</h3>
        <p className="price">{price}</p>
        <button className="buy-btn">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductCard;

