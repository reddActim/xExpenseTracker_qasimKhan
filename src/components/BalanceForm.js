import React from 'react';
import styles from './BalanceForm.module.css';

export default function BalanceForm({ onSubmit, onCancel }) {
  return (
    <>
          <h2>Add Balance:</h2>
    <form onSubmit={onSubmit} className={styles.balanceForm}>

      <input type="number" id="balance" name="balance" required />

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.addBtn}>Add Balance</button>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
      </div>
    </form>
    </>
  );
}
