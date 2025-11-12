import React, { useState, useEffect } from "react";

export default function ExpenseForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        amount: initialData.amount,
        category: initialData.category,
        date: initialData.date
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, amount, category, date } = formData;
    if (!title || !amount || !category || !date) {
      alert("Please fill all fields");
      return;
    }
    onSubmit(formData);
    setFormData({ title: "", amount: "", category: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
      <input name="amount" type="number" value={formData.amount} onChange={handleChange} placeholder="Amount" />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
      </select>
      <input name="date" type="date" value={formData.date} onChange={handleChange} />
      <button type="submit">Add Expense</button>
    </form>
  );
}
