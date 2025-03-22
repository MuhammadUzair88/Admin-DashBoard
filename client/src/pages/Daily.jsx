import React, { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ResponsiveLine } from "@nivo/line";

const Daily = () => {
  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-03-01"));

  const { fetchOverallStats, overallStats } = useApi();

  useEffect(() => {
    fetchOverallStats();
  });

  useEffect(() => {
    console.log(overallStats?.dailyData); // Use optional chaining to prevent errors
  }, [overallStats]); // Ensure it runs when `overallStats` updates

  const formattedData = overallStats?.dailyData
    ? [
        {
          id: "Total Sales",
          color: "#38bdf8",
          data: overallStats.dailyData
            ?.filter(({ date }) => {
              const dateObj = new Date(date);
              return dateObj >= startDate && dateObj <= endDate;
            })
            .map(({ date, totalSales }) => ({
              x: date,
              y: totalSales,
            })),
        },
        {
          id: "Total Units",
          color: "#facc15",
          data: overallStats.dailyData
            ?.filter(({ date }) => {
              const dateObj = new Date(date);
              return dateObj >= startDate && dateObj <= endDate;
            })
            .map(({ date, totalUnits }) => ({
              x: date,
              y: totalUnits,
            })),
        },
      ]
    : [];

  //     //Another way to format the data

  //     const formattedData=[];
  //     const Filteredsales=overallStats?.dailyData?.filter(({date})=>{
  //       const dateobj=new Date(date);
  //       return dateobj>=startDate && dateobj<=endDate;

  //     })
  //       // Process Total Sales
  //   const totalSalesData = filteredData.map(({ date, totalSales }) => ({
  //     x: date.substring(date.indexOf("-") + 1), // Extract relevant part of the date
  //     y: totalSales,
  //   }));

  //   // Process Total Units
  //   const totalUnitsData = filteredData.map(({ date, totalUnits }) => ({
  //     x: date.substring(date.indexOf("-") + 1),
  //     y: totalUnits,
  //   }));

  //   // Push the processed data into formattedData
  //   formattedData.push(
  //     { id: "Total Sales", color: "#38bdf8", data: totalSalesData },
  //     { id: "Total Units", color: "#facc15", data: totalUnitsData }
  //   );
  // }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-semibold">Daily Sales Overview</h1>
      <p className="text-gray-400">View daily sales and unit trends</p>

      {/* Date Picker Section */}

      <div className="mt-4 flex space-x-4">
        <div>
          <label className="text-gray-300 block">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="px-4 py-2 rounded-md bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="text-gray-300 block">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="px-4 py-2 rounded-md bg-gray-700 text-white"
          />
        </div>
      </div>
      {/* Chart Display */}
      <div className="mt-6 w-full h-[75vh] bg-gray-800 p-6 rounded-lg shadow-lg">
        {formattedData.length > 0 ? (
          <ResponsiveLine
            data={formattedData}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
            }}
            curve="monotoneX"
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Date",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              legend: "Total Sales & Units",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            colors={{ datum: "color" }}
            pointSize={8}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            useMesh={true}
            tooltip={({ point }) => (
              <div className="bg-white text-black p-2 rounded shadow-md">
                <strong>{point.serieId}</strong>: {point.data.yFormatted}
              </div>
            )}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                translateX: 50,
                itemsSpacing: 4,
                itemWidth: 80,
                itemHeight: 20,
                symbolSize: 12,
                symbolShape: "circle",
              },
            ]}
          />
        ) : (
          <p className="text-center text-gray-400">
            No data available for the selected date range.
          </p>
        )}
      </div>
    </div>
  );
};

export default Daily;
