import React, { useState } from "react";
import { BookOpen, DollarSign, ShoppingCart, Users } from "lucide-react";
import RevenueChart from "../../components/admin/Charts/RevenueChart";
import RecentSalesChart from "../../components/admin/Charts/RecentSalesChart";
import TopSellingBooksChart from "../../components/admin/Charts/TopSellingBooksChart";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h2
        style={{
          fontSize: "3rem",
          fontWeight: 500,
          marginBottom: "20px",
          color: "#333",
        }}
      >
        DASHBOARD
      </h2>

      {/* Tabs Navigation */}
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            borderBottom: "2px solid #e0e0e0",
            paddingBottom: "5px",
          }}
        >
          <button
            onClick={() => setActiveTab("overview")}
            style={{
              padding: "8px 16px",
              fontSize: "1.5rem",
              fontWeight: 500,
              color: activeTab === "overview" ? "#4CAF50" : "#666",
              backgroundColor: "transparent",
              border: "none",
              borderBottom:
                activeTab === "overview" ? "2px solid #4CAF50" : "none",
              cursor: "pointer",
            }}
          >
            Tổng quan
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            style={{
              padding: "8px 16px",
              fontSize: "1.5rem",
              fontWeight: 500,
              color: activeTab === "analytics" ? "#4CAF50" : "#666",
              backgroundColor: "transparent",
              border: "none",
              borderBottom:
                activeTab === "analytics" ? "2px solid #4CAF50" : "none",
              cursor: "pointer",
            }}
          >
            Phân tích
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            style={{
              padding: "8px 16px",
              fontSize: "1.5rem",
              fontWeight: 500,
              color: activeTab === "reports" ? "#4CAF50" : "#666",
              backgroundColor: "transparent",
              border: "none",
              borderBottom:
                activeTab === "reports" ? "2px solid #4CAF50" : "none",
              cursor: "pointer",
            }}
          >
            Báo cáo
          </button>
        </div>
      </div>

      {/* Overview Tab Content */}
      {activeTab === "overview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Summary Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {/* Total Revenue Card */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                padding: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <h3
                  style={{ fontSize: "1.5rem", fontWeight: 500, color: "#333" }}
                >
                  Doanh thu tổng
                </h3>
                <DollarSign
                  style={{ width: "16px", height: "16px", color: "#666" }}
                />
              </div>
              <div
                style={{ fontSize: "1.5rem", fontWeight: 700, color: "#333" }}
              >
                45.231.890
              </div>
              <p style={{ fontSize: "1rem", color: "#666", marginTop: "5px" }}>
                +20.1% so với tháng trước
              </p>
            </div>

            {/* Books Sold Card */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                padding: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <h3
                  style={{ fontSize: "1.5rem", fontWeight: 500, color: "#333" }}
                >
                  Sách đã bán
                </h3>
                <BookOpen
                  style={{ width: "16px", height: "16px", color: "#666" }}
                />
              </div>
              <div
                style={{ fontSize: "1.5rem", fontWeight: 700, color: "#333" }}
              >
                +2,350
              </div>
              <p style={{ fontSize: "1rem", color: "#666", marginTop: "5px" }}>
                +10.1% so với tháng trước
              </p>
            </div>

            {/* New Customers Card */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                padding: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <h3
                  style={{ fontSize: "1.5rem", fontWeight: 500, color: "#333" }}
                >
                  Khách hàng mới
                </h3>
                <Users
                  style={{ width: "16px", height: "16px", color: "#666" }}
                />
              </div>
              <div
                style={{ fontSize: "1.5rem", fontWeight: 700, color: "#333" }}
              >
                +573
              </div>
              <p style={{ fontSize: "1rem", color: "#666", marginTop: "5px" }}>
                +12.4% so với tháng trước
              </p>
            </div>

            {/* Active Orders Card */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                padding: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <h3
                  style={{ fontSize: "1.5rem", fontWeight: 500, color: "#333" }}
                >
                  Đơn hàng
                </h3>
                <ShoppingCart
                  style={{ width: "16px", height: "16px", color: "#666" }}
                />
              </div>
              <div
                style={{ fontSize: "1.5rem", fontWeight: 700, color: "#333" }}
              >
                +89
              </div>
              <p style={{ fontSize: "1rem", color: "#666", marginTop: "5px" }}>
                +7.3% so với tháng trước
              </p>
            </div>
          </div>

          {/* Charts Section */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {/* Revenue Chart */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                padding: "15px",
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  marginBottom: "5px",
                  color: "#333",
                }}
              >
                Tổng quan doanh thu
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#666",
                  marginBottom: "10px",
                }}
              >
                Doanh thu hàng tháng trong năm hiện tại
              </p>
              <RevenueChart />
            </div>

            {/* Recent Sales Chart */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                padding: "15px",
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  marginBottom: "5px",
                  color: "#333",
                }}
              >
                Doanh số gần đây
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#666",
                  marginBottom: "10px",
                }}
              >
                Doanh số hàng ngày trong tuần qua
              </p>
              <RecentSalesChart />
            </div>
          </div>

          {/* Top Selling Books Chart */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "20px",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                padding: "15px",
              }}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  marginBottom: "5px",
                  color: "#333",
                }}
              >
                Top sách phổ biến nhất
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#666",
                  marginBottom: "1rem",
                }}
              >
                Top 5 sách hot nhất trong năm
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <TopSellingBooksChart />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab Content */}
      {activeTab === "analytics" && (
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            padding: "15px",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              marginBottom: "5px",
              color: "#333",
            }}
          >
            Nội dung phân tích
          </h3>
          <p
            style={{
              fontSize: "1rem",
              color: "#666",
              marginBottom: "10px",
            }}
          >
            Chi tiết phân tích
          </p>
          <div
            style={{
              height: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
            }}
          >
            <p style={{ color: "#666" }}>Nội dung phân tích</p>
          </div>
        </div>
      )}

      {/* Reports Tab Content */}
      {activeTab === "reports" && (
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            padding: "15px",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              marginBottom: "5px",
              color: "#333",
            }}
          >
            Nội dung báo cáo
          </h3>
          <p
            style={{
              fontSize: "1rem",
              color: "#666",
              marginBottom: "10px",
            }}
          >
            Báo cáo
          </p>
          <div
            style={{
              height: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
            }}
          >
            <p style={{ color: "#666" }}>Nội dung báo cáo</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
