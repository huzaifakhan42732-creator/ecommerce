import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <h2 className="logo">HuzaifaStore</h2>
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
