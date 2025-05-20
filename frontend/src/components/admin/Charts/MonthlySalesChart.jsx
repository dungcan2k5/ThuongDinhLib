import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Jan", sales: 120 },
  { name: "Feb", sales: 145 },
  { name: "Mar", sales: 162 },
  { name: "Apr", sales: 190 },
  { name: "May", sales: 210 },
  { name: "Jun", sales: 245 },
  { name: "Jul", sales: 270 },
  { name: "Aug", sales: 290 },
  { name: "Sep", sales: 310 },
  { name: "Oct", sales: 335 },
  { name: "Nov", sales: 360 },
  { name: "Dec", sales: 390 },
];

const MonthlySalesChart = () => {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        margin: "20px 0",
        width: "100%",
        maxWidth: "800px",
      }}
    >
      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          marginBottom: "15px",
          color: "#333",
          textAlign: "center",
        }}
      >
        Doanh số hàng tháng
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            style={{ fontFamily: "'Arial', sans-serif" }}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            style={{ fontFamily: "'Arial', sans-serif" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderColor: "#e0e0e0",
              borderRadius: "0.5rem",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              color: "#333",
            }}
            itemStyle={{ color: "#333" }}
            labelStyle={{ color: "#666" }}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#4CAF50"
            strokeWidth={2}
            dot={{ strokeWidth: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySalesChart;
