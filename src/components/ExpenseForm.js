import React, { useState, useEffect } from "react";
import styles from "./ExpenseForm.module.css";

export default function ExpenseForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    date: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        price: initialData.price,
        category: initialData.category,
        date: initialData.date
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, price, category, date } = formData;
    if (!title || !price || !category || !date) {
      alert("Please fill all fields");
      return;
    }
    // passing `price` as `amount` if the rest of your app expects it
    onSubmit({ ...formData, amount: formData.price });
    setFormData({ title: "", price: "", category: "", date: "" });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Expense Amount"  
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
      </select>
      <input
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}
