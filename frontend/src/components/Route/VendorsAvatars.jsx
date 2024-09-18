/** @format */

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const VendorsAvatars = ({ avatars }) => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 10000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
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

  return (
    <div className="py-12 px-6 bg-gray-100 font-poppins">
      <h3 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Our Trusted Vendors
      </h3>
      <Slider {...sliderSettings}>
        {avatars.map((avatar, index) => (
          <div key={index} className="p-3 flex justify-center items-center">
            <div className="relative">
              <img
                src={avatar.url}
                alt={`Vendor ${index}`}
                className="w-24 h-24 object-cover rounded-full border-2 border-gray-200 shadow-md transition-transform transform hover:scale-110"
              />
              <div className="absolute inset-0 flex justify-center items-end">
                <p className="text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-opacity duration-700 ease-in-out transform translate-y-10 hover:translate-y-0">
                  Yes
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VendorsAvatars;
