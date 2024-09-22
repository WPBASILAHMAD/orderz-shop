/** @format */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Slider from "react-slick";
import axios from "axios";
import { server } from "../../../server";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OurTrustedVendors = () => {
  const [shops, setShops] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(`${server}/shop/get-shop-avatars`);
        setShops(response.data.shops);
      } catch (error) {
        console.error("Error fetching shop avatars:", error);
      }
    };

    fetchShops();
  }, []);

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 10000, // Slow motion speed
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true, // Pauses when hovered
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Handler to navigate to the shop's page
  const handleShopClick = (shopId) => {
    navigate(`/shop/preview/${shopId}`);
  };

  return (
    <div className=" bg-[#f6f6f5] p-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Our Trusted Vendors
      </h2>

      <div className="max-w-7xl mx-auto">
        {shops.length > 0 ? (
          <Slider {...settings}>
            {shops.map((shop, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer" // Add cursor pointer
                onClick={() => handleShopClick(shop.shopId)} // Navigate to shop on click
              >
                <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <img
                    src={shop.avatar.url}
                    alt={`Shop ${index + 1}`}
                    className="w-32 h-32 rounded-full object-contain  hover:scale-105 transform transition-transform duration-300 ease-in-out"
                  />
                  <h3 className="text-lg font-semibold text-gray-700">
                    {shop.name}
                  </h3>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-500">Loading shops...</p>
        )}
      </div>
    </div>
  );
};

export default OurTrustedVendors;
