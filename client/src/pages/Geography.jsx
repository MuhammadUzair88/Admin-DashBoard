import React, { useEffect } from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import { useApi } from "../context/ApiContext";
import { geoData } from "../context/GeoData.jsx";

const Geography = () => {
  const { fetchGeography, geography } = useApi();

  useEffect(() => {
    fetchGeography();
  }, []);

  useEffect(() => {
    console.log(geography);
  }, [geography]);

  return (
    <div className="m-6 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        User Geography
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        Discover where users are located worldwide.
      </p>

      <div className="mt-6 h-[75vh] border border-gray-300 dark:border-gray-700 rounded-lg">
        {geography ? (
          <ResponsiveChoropleth
            data={geography}
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, 60]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            borderWidth={1.3}
            borderColor="#ffffff"
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                translateX: 0,
                translateY: -125,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: "#ffffff",
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#facc15",
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-20">
            Loading...
          </p>
        )}
      </div>
    </div>
  );
};

export default Geography;
