import React, { useEffect, useMemo, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useApi } from "../context/ApiContext";

const OverviewChart = ({ view }) => {
  const { fetchOverallStats, overallStats, loading } = useApi();
  const [Stats, setStats] = useState({ monthlyData: [] }); // Default to empty array

  useEffect(() => {
    fetchOverallStats();
  }, []);

  useEffect(() => {
    if (overallStats) {
      setStats(overallStats);
    }
  }, [overallStats]);

  useEffect(() => {
    console.log(Stats);
  }, [Stats]);

  // Process data for Nivo chart
  const chartData = useMemo(() => {
    if (
      !Stats ||
      !Array.isArray(Stats.monthlyData) ||
      Stats.monthlyData.length === 0
    ) {
      return []; // Ensure it's never undefined
    }

    return view === "sales"
      ? [
          {
            id: "Total Sales",
            color: "#38bdf8",
            data: Stats.monthlyData.map(({ month, totalSales }) => ({
              x: month,
              y: totalSales,
            })),
          },
        ]
      : [
          {
            id: "Total Units",
            color: "#facc15",
            data: Stats.monthlyData.map(({ month, totalUnits }) => ({
              x: month,
              y: totalUnits,
            })),
          },
        ];
  }, [Stats, view]);

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <div className="w-full h-[75vh] bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4">Overview Chart</h2>
      <div className="w-full h-full">
        <ResponsiveLine
          data={chartData}
          theme={{
            axis: {
              ticks: { text: { fill: "#e5e7eb" } },
            },
            grid: { line: { stroke: "#374151", strokeWidth: 1 } },
          }}
          margin={{ top: 20, right: 50, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: "auto", max: "auto", stacked: false }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            legend: "Month",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            legend: "Total Sales & Units",
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
  );
};

export default OverviewChart;
