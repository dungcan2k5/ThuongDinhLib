import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Mon", sales: 12 },
  { name: "Tue", sales: 18 },
  { name: "Wed", sales: 15 },
  { name: "Thu", sales: 25 },
  { name: "Fri", sales: 32 },
  { name: "Sat", sales: 45 },
  { name: "Sun", sales: 30 },
];

const RecentSalesChart = () => {
  return (
    <div
      style={{
        paddingTop: "10px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        margin: "20px 0",
        width: "100%",
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
        Doanh số gần đây
      </h3>
      <ResponsiveContainer width="100%" height={350}>
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
            stroke="#FF9800" // Replaced hsl(var(--primary)) with orange
            strokeWidth={2}
            dot={{ strokeWidth: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RecentSalesChart;
