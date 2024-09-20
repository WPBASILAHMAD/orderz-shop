/** @format */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../../server";

const AllSellers = () => {
  const [shops, setShops] = useState([]);
  const navigate = useNavigate();

  // Fetch the shops on component mount
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(`${server}/shop/get-shop-avatars`);
        setShops(response.data.shops); // Update to use shops
      } catch (error) {
        console.error("Error fetching shop avatars:", error);
      }
    };

    fetchShops();
  }, []);

  // Handler for clicking on an avatar
  const handleShopClick = (shopId) => {
    navigate(`/shop/${shopId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
        Explore All Stores
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {shops.map((shop, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={() => handleShopClick(shop.shopId)}>
            <img
              src={shop.avatar.url}
              alt={`Shop ${index + 1}`}
              className="w-32 h-32 rounded-full mb-6 object-contain"
            />
            <h3 className="text-xl font-semibold text-gray-700 text-center">
              {shop.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSellers;
