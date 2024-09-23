/** @format */
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../../../styles/styles";

const Hero = () => {
  const [images, setImages] = useState([]);

  // Fetch images from WordPress Media Library
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://images.orderzshop.com/wp-json/wp/v2/media", // Replace with your WordPress site URL
          {
            params: {
              per_page: 10, // Adjust the number of images to fetch more than 1
              media_type: "image",
            },
          }
        );
        const imageUrls = response.data.map((img) => img.source_url);
        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images from WordPress Media:", error);
      }
    };

    fetchImages();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, // Enable arrows for easier navigation
  };

  return (
    <div
      className={`relative min-h-[0vh] md:min-h-[40vh] lg:min-h-[50vh] w-full bg-no-repeat`}>
      <Slider {...settings} className="w-full px-2 md:px-4">
        {images.length > 0 ? (
          images.map((url, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={url}
                alt={`Slide ${index}`}
                className="w-full h-auto object-cover"
                style={{
                  margin: "10px", // Adjust margin for mobile
                  borderRadius: "20px", // More pronounced border radius
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
                }}
              />
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </Slider>
    </div>
  );
};

export default Hero;
