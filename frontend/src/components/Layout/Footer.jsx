/** @format */

import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {
  footercompanyLinks,
  categoriesData,
  navItems,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import WhiteLogo from "../../Assests/imgs/logo/orderzshop-white.png";

const Footer = ({ active }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#000] text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#342ac8] py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#56d879]">Subscribe</span> us for get news{" "}
          <br />
          events and offers
        </h1>
        <div>
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-800
                sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-whie md:w-auto w-full">
            Submit
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            src={WhiteLogo}
            alt=""
            className=" cursor-pointer h-16 object-contain "
          />
          <br />
          <p>The home and elements needeed to create beatiful products.</p>
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

        {/* <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Company</h1>
          {footerProductLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul> */}

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Shop</h1>

          <li>
            <div
              className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6">
              {categoriesData &&
                categoriesData.map((i) => {
                  const handleSubmit = (i) => {
                    navigate(`/products?category=${i.title}`);
                  };
                  return (
                    <div
                      className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                      key={i.id}
                      onClick={() => handleSubmit(i)}>
                      <span className={`text-[15px] leading-[1.3]`}>
                        {i.title}
                      </span>
                    </div>
                  );
                })}
            </div>
          </li>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Support</h1>
          {footerSupportLinks &&
            footerSupportLinks.map((i) => (
              <div>
                <Link
                  to={i.url}
                  className="text-gray-400 hover:text-teal-400 duration-300
                  text-sm cursor-pointer leading-6 text-center">
                  {i.title}
                </Link>
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

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-gray-400 text-sm pb-8">
        <h6>
          © 2024 <span className="text-[#ffbb38]"> OrderzShop</span>. All rights
          reserved.
        </h6>

        {/* <span>© 2024 OrderzShop. All rights reserved.</span> */}
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
