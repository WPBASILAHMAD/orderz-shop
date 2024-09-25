/** @format */

import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { categoriesData, footerSupportLinks } from "../../static/data";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import WhiteLogo from "../../Assests/imgs/logo/orderzshop-white.png";
import styles from "../../styles/styles";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";

const Footer = () => {
  const navigate = useNavigate();
  const { isSeller } = useSelector((state) => state.seller);

  const handleShopLinkClick = (id) => {
    window.location.href = `/products?category=${id}`; // Refresh the page
  };

  const handleSupportLinkClick = (url) => {
    window.location.href = url; // Refresh the page
  };

  const handleDashboardClick = () => {
    window.location.href = isSeller ? "/dashboard" : "/shop-create"; // Refresh the page
  };

  return (
    <div className="bg-[#000] text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#342ac8] py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#56d879]">Start Selling</span> with Just a
          Click <br />
          Open Your Store!
        </h1>
        <div>
          <div
            className="bg-[#ffffff] hover:bg-[#ffbb38] transition duration-300 px-6 py-3 rounded-md flex items-center justify-center text-white cursor-pointer"
            onClick={handleDashboardClick}>
            <h1 className="text-[#000] flex items-center">
              {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
              <IoIosArrowForward className="ml-1" />
            </h1>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            src={WhiteLogo}
            alt=""
            className="cursor-pointer h-16 object-cover"
          />
          <br />
          <p>The home and elements needed to create beautiful products.</p>
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillInstagram
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillYoutube
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
          </div>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Shop</h1>
          <li>
            <div className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6">
              {categoriesData &&
                categoriesData.map((category) => (
                  <div
                    key={category.id}
                    className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
                    onClick={() => handleShopLinkClick(category.title)}>
                    <span className={`text-[15px] leading-[1.3]`}>
                      {category.title}
                    </span>
                  </div>
                ))}
            </div>
          </li>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Support</h1>
          {footerSupportLinks &&
            footerSupportLinks.map((link) => (
              <div key={link.id}>
                <div
                  onClick={() => handleSupportLinkClick(link.url)}
                  className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6 ">
                  {link.title}
                </div>
              </div>
            ))}
        </ul>
        <div className="text-center sm:text-start">
          <h4 className="text-[30px] font-semibold mb-4">Coming Soon</h4>
          <p className="text-gray-400 mb-4">
            Get our app, coming soon to your favorite app store!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
            <button className="bg-white text-black py-2 px-4 rounded-lg flex items-center justify-center w-48">
              <FaApple className="mr-2" size={20} />
              <span>App Store</span>
            </button>
            <button className="bg-white text-black py-2 px-4 rounded-lg flex items-center justify-center w-48">
              <FaGooglePlay className="mr-2" size={20} />
              <span>Google Play</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8">
        <h6>
          © 2024{" "}
          <span className="text-[#ffbb38]">
            <a href="https://orderzshop.com"> OrderzShop</a>{" "}
          </span>
          . All rights reserved.
        </h6>
        <span>
          <a href="/terms-of-service" className="text-[#ffbb38]">
            Terms and Conditions
          </a>
          -
          <a href="/privacy-policy" className="text-[#ffbb38]">
            Privacy Policy
          </a>
        </span>
        <div className="sm:block flex items-center justify-center w-full">
          <h5>
            For now, we have only cash on delivery
            <span className="text-[#ffbb38]"> (COD)</span> system.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Footer;
