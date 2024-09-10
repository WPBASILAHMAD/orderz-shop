/** @format */

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const imageUrls = [
  {
    url: "https://i.ibb.co/Vv5rkDK/api-partner-verzon.png",
    link: "https://verizon.com",
  },
  {
    url: "https://i.ibb.co/J399KDg/api-partner-netflix.png",
    link: "https://netflix.com",
  },
  {
    url: "https://i.ibb.co/TKT0F5L/api-partner-yelp.png",
    link: "https://yelp.com",
  },
  {
    url: "https://i.ibb.co/HG6KR89/api-partner-adobe.png",
    link: "https://adobe.com",
  },
  {
    url: "https://i.ibb.co/hMSJ1sg/api-partner-ring.png",
    link: "https://ring.com",
  },
  {
    url: "https://i.ibb.co/4RWQcMS/api-partner-nespresso.png",
    link: "https://nespresso.com",
  },
];

const Sponsored = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 10000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear", // Linear easing for continuous motion
    pauseOnHover: false, // Disable pause on hover for the entire slider
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
    <div className="py-10 overflow-hidden font-poppins">
      <h3 className="text-3xl font-bold text-center mb-6">
        Trusted By 1000+ Companies
      </h3>
      <Slider {...settings}>
        {imageUrls.map((item, index) => (
          <div key={index} className="px-4  bg-gray-100">
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <img
                src={item.url}
                alt={`Brand ${index + 1}`}
                className="w-full h-20 object-contain mx-auto hover:animate-none"
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Sponsored;
