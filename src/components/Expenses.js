import React from "react";
import styles from './Expenses.module.css';
import Modal from "./Modal";
import ExpenseForm from "./ExpenseForm";

export default function Expenses({
  totalExpense,
  expenseList,
  setExpenseList,
  handleBalance,
  showExpenseModal,
  setShowExpenseModal,
  setTotalExpense,
  editIndex,
  setEditIndex,
  handleEdit,
  handleDelete
}) {
  const handleExpenseSubmit = (data) => {
    if (editIndex !== null && expenseList[editIndex]) {
      const oldAmount = expenseList[editIndex].amount;
      const updatedList = [...expenseList];
      updatedList[editIndex] = data;
      setExpenseList(updatedList);
      setTotalExpense((prev) => prev - oldAmount + data.amount);
      handleBalance((prev) => prev + oldAmount - data.amount);
      setEditIndex(null);
    } else {
      setExpenseList((prev) => [...prev, data]);
      setTotalExpense((prev) => prev + data.amount);
      handleBalance((prev) => prev - data.amount);
    }
    setShowExpenseModal(false);
  };

  return (
    <>
      <div className={styles.expenseContainer}>
        <div className={styles.expenseCard}>
          <p className={styles.style}>
            Expenses: <span>₹{totalExpense}</span>
          </p>
          <button type="button" className={styles.addExpensesBtn}
            onClick={() => {
              setEditIndex(null);
              setShowExpenseModal(true);
            }}>+ Add Expense</button>
        </div>
      </div>
      <Modal isOpen={showExpenseModal} onClose={() => {
        setShowExpenseModal(false);
        setEditIndex(null);
      }}>
        <ExpenseForm
          onSubmit={handleExpenseSubmit}
          initialData={editIndex !== null && expenseList[editIndex] ? expenseList[editIndex] : null}
        />
      </Modal>
    </>
  );
}
