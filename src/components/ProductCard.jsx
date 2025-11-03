import React from "react";
import { Link } from "react-router-dom"; 
import "./productcard.css";

const ProductCard = ({ id, name, price, image }) => {
  return (
    <Link to={`/product/${id}`} className="product-link">
      <div className="product-card">
        <img src={image} alt={name} className="product-img" />
        <div className="product-info">
          <h3>{name}</h3>
          <p className="price">{price}</p>
          <button className="buy-btn">View Details</button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
