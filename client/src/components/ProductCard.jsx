import React, { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";

const ProductCard = () => {
  const { fetchProductwithStats, productStats } = useApi();
  const [seeMore, setSeeMore] = useState(null); // Track which product is expanded

  useEffect(() => {
    const getProducts = async () => {
      await fetchProductwithStats();
    };
    getProducts();
  }, []);

  useEffect(() => {
    console.log(productStats);
  }, [productStats]); // Fix: Add dependency so it logs on update

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.isArray(productStats) &&
        productStats.map((product) => (
          <div
            key={product._id}
            className="bg-[#21295c] p-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <p className="text-sm text-gray-400">
              {product.category || "Unknown"}
            </p>
            <h2 className="text-lg font-bold text-white">
              {product.name || "No Name"}
            </h2>
            <p className="text-yellow-400 font-semibold">
              ${product.price ? Number(product.price).toFixed(2) : "N/A"}
            </p>
            <p className="text-sm text-gray-300 mt-2">
              {product.description || "No description available."}
            </p>

            <button
              onClick={() =>
                setSeeMore(seeMore === product._id ? null : product._id)
              }
              className="tracking-tighter text-white bg-[#cca752] px-4 py-2 rounded-lg mt-4 cursor-pointer"
            >
              {seeMore === product._id ? "See Less" : "See More"}
            </button>

            {seeMore === product._id && product.stat?.length > 0 && (
              <div className="mt-4 text-white">
                <p className="text-sm ">ID:{product.stat[0]?._id}</p>
                <p className="text-sm ">Supply Left: {product.supply}</p>
                <p className="text-sm ">
                  Yearly Sales Total:{" "}
                  {product.stat[0]?.yearlySalesTotal || "N/A"}
                </p>
                <p className="text-sm ">
                  Yearly Total Units Sold:{" "}
                  {product.stat[0]?.yearlyTotalSoldUnits || "N/A"}
                </p>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default ProductCard;
