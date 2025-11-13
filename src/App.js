import './App.css';
import { useEffect, useState } from 'react';
import WalletBalance from './components/WalletBalance';
import Expenses from './components/Expenses';
import ExpensePie from './components/ExpensePie';
import ExpenseBarChart from './components/ExpenseBarChart';
// React Icons for consistent, professional-looking icons
import { FaUtensils, FaPlane, FaFilm, FaEdit, FaTrash, FaFileInvoiceDollar } from "react-icons/fa";

function App() {
  // STATE MANAGEMENT

  // Wallet balance: initialized from localStorage if available, else defaults to 5000
  const [balance, setBalance] = useState(() => {
    const stored = localStorage.getItem("balance");
    return stored !== null ? Number(stored) : 5000;
  });

  // Expense list: persisted in localStorage, starts empty if nothing stored
  const [expenseList, setExpenseList] = useState(() => {
    const storedList = localStorage.getItem("expenses");
    return storedList !== null ? JSON.parse(storedList) : [];
  });

  // Total expense: computed from expense list (sum of all amounts)
  const [totalExpense, setTotalExpense] = useState(() => {
    const storedList = localStorage.getItem("expenses");
    const expenses = storedList ? JSON.parse(storedList) : [];
    let tExpense = 0;
    expenses.forEach((expense) => {
      tExpense += expense.amount;
    });
    return tExpense;
  });

  // Modal visibility states
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  // Index of expense being edited (null if adding new)
  const [editIndex, setEditIndex] = useState(null);


  // HANDLERS


  // Edit handler: opens expense modal with selected expense
  const handleEdit = (index) => {
    setEditIndex(index);
    setShowExpenseModal(true);
  };

  // Delete handler: removes expense, updates totals and balance
  const handleDelete = (index) => {
    const deleted = expenseList[index];
    const updatedList = expenseList.filter((_, i) => i !== index);
    setExpenseList(updatedList);
    setTotalExpense((prev) => prev - deleted.amount);
    setBalance((prev) => prev + deleted.amount);
  };


  // SIDE EFFECTS (LOCAL STORAGE)


  // Persist expenses whenever expenseList changes
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenseList));
  }, [expenseList]);

  // Persist balance whenever balance changes
  useEffect(() => {
    localStorage.setItem("balance", balance);
  }, [balance]);


  // CATEGORY ICONS

  // Maps category string to a React Icon for consistent visuals
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Food":
        return <FaUtensils />;
      case "Travel":
        return <FaPlane />;
      case "Entertainment":
        return <FaFilm />;
      default:
        return <FaFileInvoiceDollar />; // fallback for Bills/Shopping/others
    }
  };


  return (
    <div className="container">
      {/* App Header */}
      <h1 className="header">Expense Tracker</h1>

      {/* Top section: balance, expenses, pie chart */}
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

      {/* Bottom section: transactions list + bar chart */}
      <div className="bottom-section">
        <div className="left-column">
          <strong className="transactions-title">Transactions</strong>
          <div className="transaction-list">
            {expenseList.length > 0 ? (
              <ul style={{ listStyle: "none", padding: 0 }}>
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
                      {/* Edit/Delete buttons with React Icons */}
                      <button onClick={() => handleEdit(index)} className="icon-btn">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(index)} className="icon-btn">
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ padding: "1.5rem 1rem" }}>No transactions!</p>
            )}
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
