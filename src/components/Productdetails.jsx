import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./productcard.css";

const ProductDetails = ({ products, onEdit, onDelete, onAdd }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  
  const product = products.find((p) => p.id === Number(id));

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(product || { name: "", price: "", image: "" });

  if (!product) {
    return (
      <div className="product-page">
        <h2>Product Not Found 😢</h2>
        <button className="add-btn" onClick={() => navigate("/")}>Back</button>
      </div>
    );
  }

  const handleSave = () => {
    if (editing) {
      onEdit(product.id, form);
      setEditing(false);
    } else {
      onAdd(form);
    }
  };

  return (
    <div className="product-modal">
      <div className="product-modal-content">
        {!editing ? (
          <>
            <img src={product.image} alt={product.name} width="200" />
            <h2>{product.name}</h2>
            <p>{product.price}</p>

            <div className="btn-group">
              <button className="edit-btn" onClick={() => setEditing(true)}>Edit</button>
              <button
                className="delete-btn"
                onClick={() => { onDelete(product.id); navigate("/"); }}
              >
                Delete
              </button>
              <button className="view-btn" onClick={() => navigate("/")}>Close</button>
            </div>
          </>
        ) : (
          <div>
            <input
              className="edit-input"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="edit-input"
              type="text"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <input
              className="edit-input"
              type="text"
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />

            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

