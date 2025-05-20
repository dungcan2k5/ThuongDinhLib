import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Jan", total: 150000 },
  { name: "Feb", total: 230000 },
  { name: "Mar", total: 320000 },
  { name: "Apr", total: 450000 },
  { name: "May", total: 420000 },
  { name: "Jun", total: 380000 },
  { name: "Jul", total: 500000 },
  { name: "Aug", total: 630000 },
  { name: "Sep", total: 540000 },
  { name: "Oct", total: 680000 },
  { name: "Nov", total: 720000 },
  { name: "Dec", total: 910000 },
];

const RevenueChart = () => {
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
        Doanh số hàng tháng
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
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
            tickFormatter={(value) => `${value}`}
            style={{ fontFamily: "'Arial', sans-serif" }}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <Tooltip
            formatter={(value) => [`${value}`, "Doanh thu"]}
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
          <Bar dataKey="total" fill="#4CAF50" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
