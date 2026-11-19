import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const categoryColors = {
  food: "#e67e22",
  housing: "#2980b9",
  utilities: "#16a085",
  transport: "#8e44ad",
  entertainment: "#e84393",
  salary: "#27ae60",
  other: "#7f8c8d",
};
const fallbackColor = "#95a5a6";

const formatCurrency = (value) => `$${value.toLocaleString()}`;

function SpendingChart({ transactions }) {
  const totals = {};
  for (const t of transactions) {
    if (t.type !== "expense") continue;
    totals[t.category] = (totals[t.category] || 0) + t.amount;
  }

  const data = Object.entries(totals)
    .map(([category, amount]) => ({ category, amount, fill: categoryColors[category] ?? fallbackColor }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p className="empty-chart">No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="category" fontSize={12} interval={0} />
            <YAxis tickFormatter={formatCurrency} fontSize={12} width={60} />
            <Tooltip formatter={(value) => [formatCurrency(value), "Spent"]} cursor={{ fill: "#f5f5f5" }} />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]} maxBarSize={48} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart
