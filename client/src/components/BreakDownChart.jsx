import React, { useEffect } from "react";
import { useApi } from "../context/ApiContext";
import { ResponsivePie } from "@nivo/pie";

const BreakDownChart = () => {
  const { fetchOverallStats, overallStats } = useApi();

  useEffect(() => {
    fetchOverallStats();
  }, []);

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

  return (
    <div className="h-[500px] w-full bg-gray-800 rounded-lg p-4 flex flex-col items-center">
      <h2 className="text-white text-lg font-bold mb-4">Sales By Category</h2>

      <div className="h-[350px] w-full">
        <ResponsivePie
          data={formattedData}
          margin={{ top: 40, right: 80, bottom: 120, left: 80 }} // Increased bottom margin
          innerRadius={0.45}
          activeOuterRadiusOffset={10}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          colors={(d) => d.data.color}
          arcLinkLabelsSkipAngle={5}
          arcLinkLabelsTextColor="#ffffff"
          arcLinkLabelsDiagonalLength={12}
          arcLinkLabelsStraightLength={20}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color", modifiers: [["darker", 0.8]] }}
          arcLabelsSkipAngle={5}
          arcLabelsTextColor="#ffffff"
          enableArcLinkLabels={true}
          enableArcLabels={true}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              translateY: 80, // Lowered legend placement
              itemWidth: 120,
              itemHeight: 20,
              itemsSpacing: 10,
              itemTextColor: "#ffffff",
              symbolSize: 15,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#f0f0f0",
                  },
                },
              ],
            },
          ]}
        />
      </div>

      <p className="text-gray-400 text-sm text-center mt-4 px-4">
        Breakdown of real sales and information via category for revenue made
        this year.
      </p>
    </div>
  );
};

export default BreakDownChart;
