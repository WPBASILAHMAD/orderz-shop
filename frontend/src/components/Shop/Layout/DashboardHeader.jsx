/** @format */

import React, { useState } from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBoostClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
        <div>
          <Link to="/dashboard">
            <h3 className="text-3xl font-bold font-Poppins">
              Orderz <span className="text-[#ffbb38]">Shop</span>
            </h3>
          </Link>
        </div>

        <div className="flex items-center">
          <div className="flex items-center mr-4">
            {/* Boost Your Sells Button */}
            <button
              onClick={handleBoostClick}
              className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:from-[#feb47b] hover:to-[#ff7e5f] transition duration-300 ease-in-out font-semibold">
              Boost Your Sells
            </button>
            <Link to="/dashboard/cupouns" className="800px:block hidden">
              <AiOutlineGift
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link to="/dashboard-events" className="800px:block hidden">
              <MdOutlineLocalOffer
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link to="/dashboard-products" className="800px:block hidden">
              <FiShoppingBag
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link to="/dashboard-orders" className="800px:block hidden">
              <FiPackage
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link to="/dashboard-messages" className="800px:block hidden">
              <BiMessageSquareDetail
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link to={`/shop/${seller._id}`}>
              <img
                src={`${seller.avatar?.url}`}
                alt="User Avatar"
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Modal for Boosting Price */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
            <h2 className="text-2xl font-bold mb-4">Boost Your Sells</h2>
            <p className="text-lg">
              Boosting Price: <span className="font-bold">Rs 1,000</span>
            </p>
            <p className="mt-2 text-gray-700">
              Agar aap apni sales ko behtar banana chahte hain, hum aapke
              products ki social media promotion karenge aur posts bhi design
              karenge. Mahana charges{" "}
              <span className="font-bold"> Rs 1,000 </span>hain.
            </p>
            <button
              onClick={handleCloseModal}
              className="bg-gradient-to-r from-[#7197ff] to-[#7b8ffe] text-white px-6 py-2 mt-4 rounded-full shadow-lg hover:shadow-xl hover:from-[#4d5297] hover:to-[#283df3] transition duration-300 ease-in-out font-semibold">
              Close
            </button>
            <button
              onClick={() => window.open("https://wa.link/8y9nkv", "_blank")}
              className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-white px-6 py-2 ml-3 rounded-full shadow-lg hover:shadow-xl hover:from-[#feb47b] hover:to-[#ff7e5f] transition duration-300 ease-in-out font-semibold">
              Boost Now!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardHeader;
