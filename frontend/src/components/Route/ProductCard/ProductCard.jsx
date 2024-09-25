/** @format */

import React, { useState, useEffect } from "react";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setClick(
      wishlist && wishlist.find((item) => item._id === data._id) ? true : false
    );
  }, [wishlist]);

  const removeFromWishlistHandler = (product) => {
    setClick(!click);
    dispatch(removeFromWishlist(product));
  };

  const addToWishlistHandler = (product) => {
    setClick(!click);
    dispatch(addToWishlist(product));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((item) => item._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const handleLinkClick = (url) => {
    window.location.href = url; // Refresh the page
  };

  return (
    <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
      <a onClick={() => handleLinkClick(`/product/${data._id}`)}>
        <img
          src={data.images[0]?.url}
          alt=""
          className="w-full h-[170px] object-contain"
        />
      </a>
      <a onClick={() => handleLinkClick(`/shop/preview/${data?.shop._id}`)}>
        <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
      </a>
      <a onClick={() => handleLinkClick(`/product/${data._id}`)}>
        <h4 className="pb-3 font-[500]">
          {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
        </h4>
        <div className="flex">
          <Ratings rating={data?.ratings} />
        </div>
        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              Rs:{" "}
              {data.originalPrice === 0
                ? data.originalPrice
                : data.discountPrice}
            </h5>
            <h4 className={`${styles.price}`}>
              {data.originalPrice ? data.originalPrice + " Rs:" : null}
            </h4>
          </div>
        </div>
      </a>

      {/* Side options */}
      <div>
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => removeFromWishlistHandler(data)}
            color="red"
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => addToWishlistHandler(data)}
            color="#333"
            title="Add to wishlist"
          />
        )}
        <AiOutlineEye
          size={22}
          className="cursor-pointer absolute right-2 top-14"
          onClick={() => setOpen(!open)}
          color="#333"
          title="Quick view"
        />
        <AiOutlineShoppingCart
          size={25}
          className="cursor-pointer absolute right-2 top-24"
          onClick={() => addToCartHandler(data._id)}
          color="#444"
          title="Add to cart"
        />
        {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
      </div>
    </div>
  );
};

export default ProductCard;
