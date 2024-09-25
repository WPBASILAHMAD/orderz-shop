/** @format */

import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addTocart(newData));
    setOpenWishlist(false);
    toast.success(`${data.name} has been added to your cart!`); // Toast notification
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll 800px:w-[25%] bg-white flex flex-col justify-between shadow-lg rounded-lg">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5 className="text-lg font-semibold">Wishlist is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              <div className={`${styles.noramlFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-lg font-semibold">
                  {wishlist && wishlist.length} items
                </h5>
              </div>
              <br />
              <div className="w-full border-t">
                {wishlist &&
                  wishlist.map((item, index) => (
                    <CartSingle
                      key={index}
                      data={item}
                      removeFromWishlistHandler={removeFromWishlistHandler}
                      addToCartHandler={addToCartHandler}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const totalPrice = data.discountPrice;

  return (
    <div className="border-b p-4 flex items-center hover:bg-gray-50 transition duration-200">
      <RxCross1
        className="cursor-pointer mb-2 ml-2"
        onClick={() => removeFromWishlistHandler(data)}
      />
      <img
        src={`${data?.images[0]?.url}`}
        alt=""
        className="w-[130px] h-min ml-2 mr-2 rounded-[5px] shadow"
      />
      <div className="flex-1 pl-2">
        <h1 className="text-lg font-medium">{data.name}</h1>
        <h4 className="font-semibold pt-3 text-lg text-[#d02222]">
          Rs: {totalPrice}
        </h4>
      </div>
      <button
        onClick={() => addToCartHandler(data)}
        className=" text-[#2e70ff] hover:text-[#ffff] p-2 rounded hover:bg-[#fcb532] transition duration-200 flex items-center">
        <BsCartPlus size={20} className="mr-1" />
      </button>
    </div>
  );
};

export default Wishlist;
