import React, { useEffect, useMemo, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import { useApi } from "../context/ApiContext";
import StatCard from "../components/StatCard";
import { BadgeDollarSign, Receipt, HandCoins, UserRound } from "lucide-react";

const Dashboard = () => {
  const { fetchOverallStats, overallStats } = useApi();
  const [Stats, setStats] = useState({ monthlyData: [] });
  const { fetchDashboardStats, dashboardStats } = useApi();
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  useEffect(() => {
    fetchDashboardStats();
    fetchOverallStats();
  }, []);

  useEffect(() => {
    if (overallStats) {
      setStats(overallStats);
    }
  }, [overallStats]);

  const chartData = useMemo(() => {
    if (
      !Stats ||
      !Array.isArray(Stats.monthlyData) ||
      Stats.monthlyData.length === 0
    ) {
      return [];
    }
    return [
      {
        id: "Total Sales",
        color: "#38bdf8",
        data: Stats.monthlyData.map(({ month, totalSales }) => ({
          x: month,
          y: totalSales,
        })),
      },
    ];
  }, [Stats]);

  if (!overallStats || !overallStats.salesByCategory) {
    return <div className="text-white">Loading...</div>;
  }

  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
  const formattedData = Object.entries(overallStats.salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colors[i % colors.length],
    })
  );

  const transactions = dashboardStats?.transactions || [];
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title={"Total Customers"}
          value={dashboardStats?.totalCustomers}
          increase="+14%"
          description="Since last month"
          icon={<UserRound />}
        />
        <StatCard
          title={"Sales Today"}
          value={dashboardStats?.todayStats?.totalSales}
          increase="+21%"
          description="Since last month"
          icon={<Receipt />}
        />
        <StatCard
          title={"Monthly Sales"}
          value={dashboardStats?.thisMonthStats?.totalSales}
          increase="+5%"
          description="Since last month"
          icon={<HandCoins />}
        />
        <StatCard
          title={"Yearly Sales"}
          value={dashboardStats?.yearlySalesTotal}
          increase="+43%"
          description="Since last month"
          icon={<BadgeDollarSign />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-gray-800 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Sales Trends</h2>
          <div style={{ height: 300 }}>
            <ResponsiveLine
              data={chartData}
              theme={{
                axis: {
                  ticks: { text: { fill: "#cbd5e1" } },
                },
                grid: { line: { stroke: "#475569", strokeWidth: 1 } },
              }}
              margin={{ top: 20, right: 50, bottom: 50, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
              }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -30,
                tickValues: ["January", "April", "July", "October"], // Show fewer labels
                legend: "Month",
                legendOffset: 40,
                legendPosition: "middle",
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                legend: "Total Sales",
                legendOffset: -50,
                legendPosition: "middle",
              }}
              pointSize={8}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              useMesh={true}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  translateX: 20,
                  translateY: -40,
                  itemsSpacing: 4,
                  itemWidth: 80,
                  itemHeight: 20,
                  symbolSize: 12,
                  symbolShape: "circle",
                },
              ]}
            />
          </div>
        </div>

        <div className="p-4 bg-gray-800 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Sales Distribution</h2>
          <div style={{ height: 300 }}>
            <ResponsivePie
              data={formattedData}
              margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              colors={{ scheme: "pastel1" }}
              borderWidth={1}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#e2e8f0"
              arcLabelsSkipAngle={10}
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-800 shadow-md rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">User ID</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left"># of Products</th>
              <th className="p-3 text-left">Cost</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 text-gray-300">
            {paginatedTransactions.map((transaction) => (
              <tr key={transaction._id} className="border-b border-gray-700">
                <td className="p-3">{transaction._id}</td>
                <td className="p-3">{transaction.userId}</td>
                <td className="p-3">{transaction.createdAt}</td>
                <td className="p-3">{transaction.products.length}</td>
                <td className="p-3">${transaction.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
