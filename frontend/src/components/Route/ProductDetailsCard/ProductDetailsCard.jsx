/** @format */

import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import { server } from "../../../server";
import axios from "axios";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();


  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl h-[90vh] bg-white rounded-lg shadow-lg relative overflow-auto p-6">
            <RxCross1
              size={30}
              className="absolute top-3 right-3 cursor-pointer text-gray-700 hover:text-gray-900"
              onClick={() => setOpen(false)}
            />

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img
                  src={`${data.images && data.images[0]?.url}`}
                  alt="Product"
                  className="w-full rounded-lg shadow-md"
                />
                <Link
                  to={`/shop/preview/${data.shop._id}`}
                  className="flex items-center mt-4 space-x-3">
                  <img
                    src={`${data.images && data.images[0]?.url}`}
                    alt="Shop"
                    className="w-12 h-12 rounded-full border-2 border-gray-300"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {data.shop.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {data?.ratings} Ratings
                    </p>
                  </div>
                </Link>
                <button
                  className="bg-teal-500 text-white rounded-md px-4 py-2 mt-4 flex items-center hover:bg-teal-600 transition duration-300"
                  onClick={handleMessageSubmit}>
                  <AiOutlineMessage className="mr-2" />
                  Send Message
                </button>
                <p className="text-red-500 mt-5">(50) Sold out</p>
              </div>

              <div className="md:w-1/2 md:pl-6 mt-6 md:mt-0">
                <h1 className="text-2xl font-bold text-gray-800">
                  {data.name}
                </h1>
                <p className="text-gray-600 mt-2">{data.description}</p>

                <div className="flex items-center mt-4 space-x-4">
                  <h4 className="text-xl font-semibold text-teal-600">
                    Rs: {data.discountPrice}
                  </h4>
                  {data.originalPrice && (
                    <h3 className="text-lg line-through text-gray-500">
                      {data.originalPrice} Rs
                    </h3>
                  )}
                </div>

                <div className="flex items-center mt-6 space-x-4">
                  <div className="flex items-center">
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white rounded-l px-4 py-2 shadow-md hover:opacity-80 transition duration-300"
                      onClick={decrementCount}>
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-2">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white rounded-r px-4 py-2 shadow-md hover:opacity-80 transition duration-300"
                      onClick={incrementCount}>
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="text-red-500 cursor-pointer hover:scale-110 transition"
                        onClick={() => removeFromWishlistHandler(data)}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="text-gray-500 cursor-pointer hover:scale-110 transition"
                        onClick={() => addToWishlistHandler(data)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <button
                  className="bg-teal-500 text-white rounded-md px-4 py-2 mt-6 flex items-center hover:bg-teal-600 transition duration-300"
                  onClick={() => addToCartHandler(data._id)}>
                  <AiOutlineShoppingCart className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
