import React from 'react';

export default function BalanceForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label>Enter Balance:</label>
      <input type="number" name="balance" required />
      <button type="submit">Add Balance</button>
    </form>
  );
}
