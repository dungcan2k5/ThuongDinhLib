import MonthlySalesChart from "../../components/admin/Charts/MonthlySalesChart";
import TopSellingBooksChart from "../../components/admin/Charts/TopSellingBooksChart";
const Statistics = () => {
  return (
    <>
      <h1 style={{ marginLeft: "5rem", fontWeight: "500" }}>THỐNG KÊ</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "50px",
        }}
      >
        <h2>
          <MonthlySalesChart />
        </h2>
        <h2>
          <TopSellingBooksChart />
        </h2>
      </div>
    </>
  );
};

export default Statistics;
