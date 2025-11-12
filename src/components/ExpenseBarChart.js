import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import styles from "./ExpenseBarChart.module.css";

export default function ExpenseBarChart({ expenseList }) {
  const categoryTotals = expenseList.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const formattedData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className={styles.expenseChart}>
      <h2>Top Expenses</h2>
      <div className={styles.barWrapper}>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={formattedData} layout="vertical">
            <XAxis type="number" axisLine={false} />
            <YAxis type="category" dataKey="name" width={100} axisLine={false} />
            <Bar dataKey="value" fill="#8884d8" barSize={25} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
