import './App.css';
import { useEffect, useState } from 'react';
import WalletBalance from './components/WalletBalance';
import Expenses from './components/Expenses';
import ExpensePie from './components/ExpensePie';
import ExpenseBarChart from './components/ExpenseBarChart';

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
        return "🍔";
      case "Travel":
        return "✈️";
      case "Bills":
        return "💡";
      case "Shopping":
        return "🛍️";
      default:
        return "💸";
    }
  };



  return (
    <>
      <div className='container'>
        <h1 style={{ color: "#FFFFFF" }}>Expense tracker</h1>
        <div style={{ backgroundColor: "#626262", boxSizing: "border-box", width: "100%", height: "40%", display: "flex", gap: "1.5rem", alignItems: "center", padding: "0px 1.5rem"}}>
          <WalletBalance balance={balance} handleBalance={setBalance} showBalanceModal={showBalanceModal}
            setShowBalanceModal={setShowBalanceModal} />
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
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{width:"50%"}}>
            <strong>Recent Transactions</strong>
            <div style={{ backgroundColor: "white", boxSizing: "border-box", width: "100%", padding: "1rem" }}>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {expenseList.map((expense, index) => (
                  <li key={index} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #ddd",
                    padding: "0.75rem 0"
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <span style={{ fontSize: "1.5rem" }}>
                        {getCategoryIcon(expense.category)}
                      </span>
                      <div>
                        <div style={{ fontWeight: "bold" }}>{expense.title}</div>
                        <div style={{ fontSize: "0.85rem", color: "#666" }}>{expense.date}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{ fontWeight: "bold", color: "#333" }}>₹{expense.amount}</div>
                      <button onClick={() => handleEdit(index)}>✏️</button>
                      <button onClick={() => handleDelete(index)}>🗑️</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{width:"50%"}}>
            <strong style={{paddingLeft:"1rem"}}>Top Expenses</strong>
            <ExpenseBarChart expenseList={expenseList}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
