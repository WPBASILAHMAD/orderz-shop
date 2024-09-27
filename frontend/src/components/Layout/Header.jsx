/** @format */

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/styles";
import axios from "axios"; // Import axios

import { categoriesData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import Navbar from "./Navbar";
import Cart from "../cart/Cart";
import DropDown from "./DropDown";
import Wishlist from "../Wishlist/Wishlist";
import BlackLogo from "../../Assests/imgs/logo/orderzshop-black.png";

const Header = ({ activeHeading }) => {
  // State variables
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [categories, setCategories] = useState([]); // Add categories state
  const location = useLocation();
  const searchInputRef = useRef(null); // Create a ref for the search input
  const [open, setOpen] = useState(false);

  // Fetch categories from WordPress API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://seller.orderzshop.com/wp-json/wc/v3/products/categories",
          {
            params: {
              per_page: 20,
              consumer_key: "ck_281d66cb1af4225a90c3c735f1c284b62ce7d7e8",
              consumer_secret: "cs_abf8f6b1783e631c17aa661ad09484fdf4717037",
            },
          }
        );

        // Filter out "Uncategorized" category and only keep parent categories
        const filteredCategories = await Promise.all(
          response.data
            .filter(
              (category) =>
                category.name !== "Uncategorized" && category.parent === 0
            ) // Ensure it's a parent category
            .map(async (category) => {
              // Fetch subcategories for the parent category
              const subcategoriesResponse = await axios.get(
                `https://seller.orderzshop.com/wp-json/wc/v3/products/categories`,
                {
                  params: {
                    parent: category.id, // Fetch subcategories for this category
                    consumer_key: "ck_281d66cb1af4225a90c3c735f1c284b62ce7d7e8",
                    consumer_secret:
                      "cs_abf8f6b1783e631c17aa661ad09484fdf4717037",
                  },
                }
              );

              return {
                id: category.id,
                title: category.name,
                image_Url: category.image?.src || "default_image_url",
                subcategories: subcategoriesResponse.data.map((sub) => ({
                  ...sub,
                  image: sub.image,
                })),
              };
            })
        );

        setCategories(filteredCategories);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    const productIdFromUrl = new URLSearchParams(location.search).get(
      "productId"
    );
    if (productIdFromUrl) {
      setSelectedProductId(productIdFromUrl);
    }
  }, [location]);

  const handleProductSelect = (productId) => {
    setSelectedProductId(productId);
    setTimeout(() => {
      window.location.href = `/product/${productId}`;
    }, 2000);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = allProducts?.filter((product) =>
      product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    setSearchData(filteredProducts);
  };

  const handleFocus = () => {
    setSearchData(
      allProducts?.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSearchData([]); // Hide dropdown after a short delay to allow for selection
    }, 200);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src={BlackLogo}
                alt=""
                className=" cursor-pointer h-16 object-contain"
              />
            </Link>
          </div>
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              ref={searchInputRef}
              className="h-[45px] w-full px-4 border border-[#3957db] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3957db] transition duration-300 ease-in-out shadow-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-3 top-1.5 cursor-pointer text-[#3957db] transition-transform duration-300 ease-in-out hover:scale-110"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-white w-full rounded-md shadow-lg z-10 mt-1 overflow-auto transition-opacity duration-300 ease-in-out">
                {searchData.map((i) => (
                  <div
                    key={i._id}
                    onClick={() => handleProductSelect(i._id)}
                    className="flex items-center py-3 px-4 hover:bg-[#f0f0f0] cursor-pointer transition duration-200 ease-in-out border-b border-gray-200 last:border-b-0">
                    <img
                      src={`${i.images[0]?.url}`}
                      alt=""
                      className="w-[40px] h-[40px] mr-2 rounded-md shadow-sm"
                    />
                    <div className="flex-1">
                      <h1 className="text-gray-800 font-medium">{i.name}</h1>
                      <div className="flex items-center">
                        <h5 className={`text-[#3957db] font-semibold`}>
                          Rs:{" "}
                          {i.originalPrice === 0
                            ? i.originalPrice
                            : i.discountPrice}
                        </h5>
                        {i.originalPrice ? (
                          <h4
                            className={`${styles.price} text-gray-500 ml-2 line-through`}>
                            Rs: {i.originalPrice}
                          </h4>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className={`${styles.button}`}>
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-[#fff] flex items-center">
                {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}>
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}>
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}>
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categories} // Pass the fetched categories with subcategories
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}>
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}>
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${user?.avatar?.url}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {openCart && <Cart setOpenCart={setOpenCart} />}
      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
      {/* Mobile header */}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}>
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src={BlackLogo}
                alt="Orderzshop Logo"
                className="cursor-pointer object-cover w-64"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}>
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* Cart popup */}
          {openCart && <Cart setOpenCart={setOpenCart} />}
          {/* Wishlist popup */}
          {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
        </div>

        {/* Header sidebar */}
        {open && (
          <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
            <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10">
              <div className="w-full flex justify-between">
                <div>
                  <BiMenuAltLeft
                    size={40}
                    className="ml-4 mt-5"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px] relative">
                <input
                  type="search"
                  placeholder="Search Product..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                />
                <AiOutlineSearch
                  size={30}
                  className="absolute right-2 top-1.5 cursor-pointer"
                />
                {searchData && searchData.length !== 0 ? (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i) => (
                      <Link to={`/product/${i._id}`} key={i._id}>
                        <div className="flex items-center">
                          <img
                            src={i.images[0]?.url}
                            alt=""
                            className="w-[50px] mr-2"
                          />
                          <h5>{i.name}</h5>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${user.avatar?.url}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]">
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7]">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
