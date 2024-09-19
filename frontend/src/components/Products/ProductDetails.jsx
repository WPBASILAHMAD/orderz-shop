/** @format */

import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
  AiOutlineShareAlt,
} from "react-icons/ai";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn,
} from "react-icons/fa";
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
import axios from "axios";

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const [variations, setVariations] = useState([]);
  const [showShareIcons, setShowShareIcons] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }

    if (data && data._id) {
      axios
        .get(`${server}/variation/${data._id}`)
        .then((response) => {
          setVariations(response.data.variations);
        })
        .catch((error) => {
          toast.error("Failed to fetch variations");
        });
    }
  }, [data, wishlist]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
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
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const shippingCost = data.isFreeShipping ? 0 : data.shippingCost || 0;
        const cartData = { ...data, qty: count, shippingCost: shippingCost };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
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
      case "twitter":
        shareUrl = `https://twitter.com/share?url=${productUrl}&text=${data.name}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${productUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${productUrl}`;
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {data ? (
        <div className={`${styles.section} w-full md:w-4/5 lg:w-4/5 mx-auto`}>
          <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12">
            {/* Product Image */}
            <div className="lg:w-1/2">
              <img
                src={`${data && data.images[select]?.url}`}
                alt={data.name}
                className="w-full rounded-lg object-cover transition-transform transform hover:scale-105"
              />
              <div className="flex mt-4 space-x-3 overflow-x-auto">
                {data &&
                  data.images.map((i, index) => (
                    <div
                      className={`${
                        select === index ? "border-2 border-teal-400" : ""
                      } cursor-pointer rounded-lg`}
                      key={index}>
                      <img
                        src={`${i?.url}`}
                        alt={`Thumbnail ${index + 1}`}
                        className="h-[100px] rounded-lg object-cover transition-transform transform hover:scale-105"
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
                <h4 className="text-2xl text-teal-500 font-semibold">
                  Rs: {data.discountPrice}
                </h4>
                <h3 className="text-lg text-gray-400 line-through">
                  {data.originalPrice ? `Rs: ${data.originalPrice}` : null}
                </h3>
              </div>

              {/* Display shipping cost */}
              <div className="shipping-section">{renderShippingCost()}</div>

              {/* Variations Display */}
              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-2 text-gray-800">
                  Available Variations
                </h4>
                {variations.length > 0 ? (
                  <ul className="space-y-2">
                    {variations.map((variation) => (
                      <li
                        key={variation._id}
                        className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="text-gray-700">
                          <strong>Attributes:</strong>{" "}
                          {variation.attributes
                            .map(
                              (attr) =>
                                `${attr.attributeId.name}: ${attr.value}`
                            )
                            .join(", ")}
                        </div>
                        <div className="text-gray-700">
                          <strong>Price:</strong> Rs {variation.price}
                        </div>
                        <div className="text-gray-700">
                          <strong>Stock:</strong> {variation.stock}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">
                    No variations available for this product.
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  <button
                    className="bg-teal-500 text-white rounded-l px-4 py-2 hover:bg-teal-600 transition duration-300"
                    onClick={decrementCount}>
                    -
                  </button>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold">
                    {count}
                  </span>
                  <button
                    className="bg-teal-500 text-white rounded-r px-4 py-2 hover:bg-teal-600 transition duration-300"
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
                  className="bg-teal-500 text-white rounded-lg px-6 py-3 hover:bg-teal-600 transition duration-300"
                  onClick={() => addToCartHandler(data._id)}>
                  <AiOutlineShoppingCart size={20} className="inline mr-2" />
                  Add to Cart
                </button>
                <button
                  className="bg-gray-100 text-gray-700 rounded-lg px-6 py-3 hover:bg-gray-200 transition duration-300"
                  onClick={handleMessageSubmit}>
                  <AiOutlineMessage size={20} className="inline mr-2" />
                  Contact Seller
                </button>
              </div>

              {/* Shop Preview */}
              <Link to={`/shop/preview/${data?.shop._id}`}>
                <div className="mt-6 flex items-center space-x-4 p-4 border-t border-gray-200">
                  <img
                    src={`${data?.shop?.avatar?.url}`}
                    alt="Shop Avatar"
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {data.shop.name}
                    </h4>
                    <p className="text-gray-600">Shop Owner</p>
                  </div>
                </div>
              </Link>

              {/* Share Button */}
              <button
                className="mt-6 text-teal-500 hover:text-teal-600"
                onClick={() => setShowShareIcons(!showShareIcons)}>
                <AiOutlineShareAlt size={24} />
                Share
              </button>

              {showShareIcons && (
                <div className="mt-4 flex space-x-4">
                  <FaFacebookF
                    size={24}
                    className="text-blue-600 cursor-pointer hover:scale-110 transition"
                    onClick={() => handleShareClick("facebook")}
                    title="Share on Facebook"
                  />
                  <FaTwitter
                    size={24}
                    className="text-blue-400 cursor-pointer hover:scale-110 transition"
                    onClick={() => handleShareClick("twitter")}
                    title="Share on Twitter"
                  />
                  <FaWhatsapp
                    size={24}
                    className="text-green-500 cursor-pointer hover:scale-110 transition"
                    onClick={() => handleShareClick("whatsapp")}
                    title="Share on WhatsApp"
                  />
                  <FaLinkedinIn
                    size={24}
                    className="text-blue-700 cursor-pointer hover:scale-110 transition"
                    onClick={() => handleShareClick("linkedin")}
                    title="Share on LinkedIn"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Reviews</h2>
            {products && products.length > 0 ? (
              <Ratings
                avgRating={averageRating}
                reviews={products.flatMap((p) => p.reviews)}
              />
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-600">
          <h2 className="text-2xl font-semibold">Product not found</h2>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
