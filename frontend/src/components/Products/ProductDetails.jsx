/** @format */

import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
  AiOutlineShareAlt,
  AiOutlineLink,
} from "react-icons/ai";
import { FaFacebookF, FaWhatsapp, FaTiktok, FaYoutube } from "react-icons/fa"; // Updated import

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { server } from "../../server";
import styles from "../../styles/styles";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import { useParams } from "react-router-dom";

import axios from "axios";

const ProductDetails = ({ data }) => {
  const { id } = useParams();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const [showShareIcons, setShowShareIcons] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [reviewsToShow, setReviewsToShow] = useState(8); // Show initial 2 reviews
  const [loadMoreCount, setLoadMoreCount] = useState(10); // Load 10 reviews on click

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist, id]);
  // window.location.reload();

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const loadMoreReviews = () => {
    setReviewsToShow(reviewsToShow + loadMoreCount); // Load 10 more reviews on each click
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      const cartData = {
        ...data,
        qty: count,
      };
      dispatch(addTocart(cartData));
      toast.success("Item added to cart successfully!");
    }
  };

  // Render the shipping cost
  const renderShippingCost = () => {
    if (data.isFreeShipping) {
      return <p className="shipping-info">Free Shipping</p>;
    } else if (data.shippingCost) {
      return (
        <p className="shipping-info">
          Shipping Cost: Rs: {data.shippingCost.toFixed(2)}
        </p>
      );
    } else {
      return <p className="shipping-info">Shipping Cost: Not specified</p>;
    }
  };

  const handleShareClick = (platform) => {
    const productUrl = `${window.location.origin}/product/${data._id}`;
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${productUrl}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${productUrl}`;
        break;
      case "tiktok":
        shareUrl = `https://www.tiktok.com/share?url=${productUrl}`; // Example URL
        break;
      case "youtube":
        shareUrl = `https://www.youtube.com/watch?v=${data._id}`; // Example URL
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };

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

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);
  const allReviews =
    products && products.map((product) => product.reviews).flat();

  return (
    <div className="bg-white p-8 rounded-lg  w-full">
      {data ? (
        <div className={`${styles.section} w-11/12  mx-auto`}>
          <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12">
            {/* Product Image */}
            <div className="lg:w-1/2">
              <img
                src={`${data && data.images[select]?.url}`}
                alt={data.name}
                className="w-9/12 rounded-lg object-contain transition-transform transform hover:scale-105"
              />
              <div className="flex mt-4 space-x-3 overflow-x-auto">
                {data &&
                  data.images.map((i, index) => (
                    <div
                      className={`${
                        select === index ? "border-2 border-[#256aff]" : ""
                      } cursor-pointer rounded-lg`}
                      key={index}>
                      <img
                        src={`${i?.url}`}
                        alt={`Thumbnail ${index + 1}`}
                        className="h-[100px] rounded-lg object-contain transition-transform transform hover:scale-105"
                        onClick={() => setSelect(index)}
                      />
                    </div>
                  ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {data.name}
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {data.description}
              </p>

              <div className="flex items-center space-x-3 mb-6">
                {data.discountPrice ? (
                  <>
                    <h4 className="text-2xl text-[#256aff] font-semibold">
                      Rs: {data.discountPrice}
                    </h4>
                    <h3 className="text-lg text-gray-400 line-through">
                      Rs: {data.originalPrice}
                    </h3>
                  </>
                ) : (
                  <h4 className="text-2xl text-[#256aff] font-semibold">
                    Rs: {data.originalPrice}
                  </h4>
                )}
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  <button
                    className="bg-[#256aff] text-white rounded-l px-4 py-2  transition duration-300"
                    onClick={decrementCount}>
                    -
                  </button>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold">
                    {count}
                  </span>
                  <button
                    className="bg-[#256aff] text-white rounded-r px-4 py-2  transition duration-300"
                    onClick={incrementCount}>
                    +
                  </button>
                </div>
                <div className="flex items-center space-x-3">
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

              <div className="flex space-x-4 mb-6">
                <button
                  className="bg-[#256aff] text-white rounded px-8 py-3 font-semibold shadow hover:bg-[#004aad] transition duration-300"
                  onClick={() => addToCartHandler(data._id)}>
                  <AiOutlineShoppingCart className="inline-block mr-2" />
                  Add to Cart
                </button>
                <button
                  className="bg-[#d3d3d3] text-black rounded px-8 py-3 font-semibold shadow hover:text-white hover:bg-[#636363] transition duration-300"
                  onClick={handleMessageSubmit}>
                  <AiOutlineMessage className="inline-block mr-2" />
                  Send Message
                </button>
              </div>
              {renderShippingCost()}

              {/* {Vendor Details} */}
              <div className="w-full flex my-4 border-b pb-4">
                <Link
                  to={`/shop/preview/${data.shop._id}`}
                  className="flex items-center mt-4 space-x-3">
                  <img
                    src={data.shop.avatar?.url}
                    alt="Shop"
                    className="w-12 h-12 rounded-full border-2 border-gray-300"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {data.shop.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {averageRating} / 5 Ratings
                    </p>
                  </div>
                </Link>
                {/* <p className="text-red-500 mt-5">(50) Sold out</p> */}
              </div>

              {/* Share Buttons */}
              <div className="mt-8">
                <button
                  onClick={() => setShowShareIcons(!showShareIcons)}
                  className="bg-gray-200 px-4 py-2 rounded-lg text-gray-700 font-semibold hover:bg-gray-300 transition">
                  <AiOutlineShareAlt size={24} className="inline-block mr-2" />
                  Share
                </button>
                {showShareIcons && (
                  <div className="mt-4 flex space-x-4">
                    <FaFacebookF
                      size={24}
                      className="text-blue-600 cursor-pointer hover:scale-110 transition"
                      onClick={() => handleShareClick("facebook")}
                    />
                    <FaTiktok // Replace Twitter icon with TikTok
                      size={24}
                      className="text-black cursor-pointer hover:scale-110 transition"
                      onClick={() => handleShareClick("tiktok")} // Update share click for TikTok
                    />
                    <FaWhatsapp
                      size={24}
                      className="text-green-500 cursor-pointer hover:scale-110 transition"
                      onClick={() => handleShareClick("whatsapp")}
                    />
                    <FaYoutube // Replace LinkedIn icon with YouTube
                      size={24}
                      className="text-red-600 cursor-pointer hover:scale-110 transition"
                      onClick={() => handleShareClick("youtube")} // Update share click for YouTube
                    />
                    <button // Copy Link Button
                      onClick={() => {
                        const productUrl = `${window.location.origin}/product/${data._id}`;
                        navigator.clipboard.writeText(productUrl).then(() => {
                          toast.success("Product link copied to clipboard!"); // Toast on copy
                        });
                      }}
                      className="text-gray-500 hover:scale-110 transition">
                      <AiOutlineLink size={24} /> {/* Add the Copy icon */}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="w-full mt-8 bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Product Reviews
            </h1>
            <div className="flex">
              <div className="w-[30%] flex flex-col border-r pr-6">
                <h5 className="text-4xl font-bold text-[#256aff]">
                  {averageRating}/5
                </h5>
                <Ratings rating={averageRating} />
                <span className="text-sm text-gray-500 mt-2">
                  ({totalReviewsLength} Ratings)
                </span>
              </div>
              <div className="w-[70%] pl-6">
                {allReviews.slice(0, reviewsToShow).map((review, index) => (
                  <div
                    className="w-full flex my-6 border-b pb-4 hover:bg-gray-50 transition duration-300 ease-in-out"
                    key={index}>
                    <img
                      src={user?.avatar?.url}
                      alt=""
                      className="w-[60px] h-[60px] rounded-full border border-gray-300"
                    />
                    <div className="pl-4">
                      <div className="w-full flex items-center">
                        <h1 className="font-semibold mr-3 text-lg">
                          {review.user.name}
                        </h1>
                        <Ratings rating={review.rating} />
                      </div>
                      <p className="text-gray-600 text-md">{review.comment}</p>
                    </div>
                  </div>
                ))}
                {reviewsToShow < allReviews.length && (
                  <button
                    onClick={loadMoreReviews}
                    className="mt-4 text-blue-500 hover:underline font-medium">
                    Load More Reviews
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
