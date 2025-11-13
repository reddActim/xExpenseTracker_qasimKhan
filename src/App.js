import './App.css';
import { useEffect, useState } from 'react';
import WalletBalance from './components/WalletBalance';
import Expenses from './components/Expenses';
import ExpensePie from './components/ExpensePie';
import ExpenseBarChart from './components/ExpenseBarChart';
import { FaUtensils, FaPlane, FaFilm, FaEdit, FaTrash, FaFileInvoiceDollar } from "react-icons/fa";

function App() {
  const [balance, setBalance] = useState(() => {
    const stored = localStorage.getItem("balance");
    return stored !== null ? Number(stored) : 5000;
  });

  const [expenseList, setExpenseList] = useState(() => {
    const storedList = localStorage.getItem("expenses");
    return storedList !== null ? JSON.parse(storedList) : [];
  });

  const [totalExpense, setTotalExpense] = useState(() => {
    const storedList = localStorage.getItem("expenses");
    const expenses = storedList ? JSON.parse(storedList) : [];
    let tExpense = 0;
    expenses.forEach((expense) => {
      tExpense += expense.amount;
    });
    return tExpense;
  });

  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowExpenseModal(true);
  };

  const handleDelete = (index) => {
    const deleted = expenseList[index];
    const updatedList = expenseList.filter((_, i) => i !== index);
    setExpenseList(updatedList);
    setTotalExpense((prev) => prev - deleted.amount);
    setBalance((prev) => prev + deleted.amount);
  };

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenseList));
  }, [expenseList]);

  useEffect(() => {
    localStorage.setItem("balance", balance);
  }, [balance]);



  const getCategoryIcon = (category) => {
    switch (category) {
      case "Food":
        return <FaUtensils />;
      case "Travel":
        return <FaPlane />;
      case "Entertainment":
        return <FaFilm />;
      default:
        return <FaFileInvoiceDollar />;
    }
  };





  return (
    <div className="container">
      <h1 className="header">Expense Tracker</h1>

      <div className="top-section">
        <WalletBalance
          balance={balance}
          handleBalance={setBalance}
          showBalanceModal={showBalanceModal}
          setShowBalanceModal={setShowBalanceModal}
        />
        <Expenses
          totalExpense={totalExpense}
          setExpenseList={setExpenseList}
          handleBalance={setBalance}
          showExpenseModal={showExpenseModal}
          setShowExpenseModal={setShowExpenseModal}
          setTotalExpense={setTotalExpense}
          expenseList={expenseList}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        <ExpensePie expenseList={expenseList} />
      </div>

      <div className="bottom-section">
        <div className="left-column">
          <strong className="transactions-title">Transactions</strong>
          <div className="transaction-list">
            {expenseList.length > 0 ? (<ul style={{ listStyle: "none", padding: 0 }}>
              {expenseList.map((expense, index) => (
                <li key={index} className="transaction-item">
                  <div className="transaction-details">
                    <span className="transaction-icon">
                      {getCategoryIcon(expense.category)}
                    </span>
                    <div>
                      <div className="transaction-title">{expense.title}</div>
                      <div className="transaction-date">{expense.date}</div>
                    </div>
                  </div>
                  <div className="transaction-actions">
                    <div className="transaction-amount">₹{expense.amount}</div>
                    <button onClick={() => handleEdit(index)} className="icon-btn">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(index)} className="icon-btn">
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>) : <p style={{ padding: "1.5rem 1rem" }}>No transactions!</p>}

          </div>
        </div>
        <div className="right-column">
          <ExpenseBarChart expenseList={expenseList} />
        </div>
      </div>
    </div>
  );
}

export default App;
