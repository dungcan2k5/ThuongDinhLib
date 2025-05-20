import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "The Great Gatsby", sales: 42 },
  { name: "To Kill a Mockingbird", sales: 38 },
  { name: "1984", sales: 35 },
  { name: "Số đỏ", sales: 30 },
  { name: "Pride and Prejudice", sales: 28 },
];

const TopSellingBooksChart = () => {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        margin: "20px 0",
        width: "100%",
        maxWidth: "600px", // Adjusted for bar chart readability
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
        Top Sách Phổ Biến
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <XAxis
            type="number"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            style={{ fontFamily: "'Arial', sans-serif" }}
          />
          <YAxis
            dataKey="name"
            type="category"
            stroke="#888888"
            fontSize={12}
            width={150}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) =>
              value.length > 15 ? `${value.substring(0, 15)}...` : value
            }
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
          <Bar
            dataKey="sales"
            fill="#4CAF50" // Replaced hsl(var(--primary)) with a fixed green color
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopSellingBooksChart;
