/** @format */

import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const data = orders?.find((item) => item._id === id);

  const orderUpdateHandler = async () => {
    try {
      await axios.put(
        `${server}/order/update-order-status/${id}`,
        { status },
        { withCredentials: true }
      );
      toast.success("Order updated!");
      navigate("/dashboard-orders");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const refundOrderUpdateHandler = async () => {
    try {
      await axios.put(
        `${server}/order/order-refund-success/${id}`,
        { status },
        { withCredentials: true }
      );
      toast.success("Refund updated!");
      dispatch(getAllOrdersOfShop(seller._id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <div className="flex items-center text-gray-800">
            <BsFillBagFill size={30} color="crimson" />
            <h1 className="text-2xl font-bold ml-3">Order Details</h1>
          </div>
          <Link to="/dashboard-orders">
            <button className="bg-red-100 text-red-600 py-2 px-4 rounded-md hover:bg-red-200 transition duration-300">
              Order List
            </button>
          </Link>
        </div>

        {/* Order Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <h5 className="text-sm">
              Order ID:{" "}
              <span className="font-medium">#{data?._id?.slice(0, 8)}</span>
            </h5>
            <h5 className="text-sm">
              Placed on:{" "}
              <span className="font-medium">
                {data?.createdAt?.slice(0, 10)}
              </span>
            </h5>
          </div>
          <div className="text-right sm:text-left">
            <h5 className="text-sm">
              Total Price:{" "}
              <span className="font-bold">Rs: {data?.totalPrice}</span>
            </h5>
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-8 space-y-4">
          {data?.cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm">
              <img
                src={item.images[0]?.url}
                alt={item.name}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="flex-1">
                <h5 className="text-lg font-semibold">{item.name}</h5>
                <h6 className="text-gray-500">
                  Rs: {item.discountPrice} x {item.qty}
                </h6>
              </div>
            </div>
          ))}
        </div>

        {/* Shipping & Payment Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <div>
            <h4 className="text-lg font-semibold mb-2">Shipping Address:</h4>
            <p>
              {data?.shippingAddress.address1} {data?.shippingAddress.address2}
            </p>
            <p>
              {data?.shippingAddress.city}, {data?.shippingAddress.country}
            </p>
            <p>Phone: {data?.user?.phoneNumber}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Payment Info:</h4>
            <p>Status: {data?.paymentInfo?.status || "Not Paid"}</p>
          </div>
        </div>

        {/* Order Status */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold">Order Status:</h4>
          {data?.status !== "Processing refund" &&
            data?.status !== "Refund Success" && (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none">
                {[
                  "Processing",
                  "Transferred to delivery partner",
                  "Shipping",
                  "Received",
                  "On the way",
                  "Delivered",
                ]
                  .slice(
                    [
                      "Processing",
                      "Transferred to delivery partner",
                      "Shipping",
                      "Received",
                      "On the way",
                      "Delivered",
                    ].indexOf(data?.status)
                  )
                  .map((option, index) => (
                    <option value={option} key={index}>
                      {option}
                    </option>
                  ))}
              </select>
            )}

          {["Processing refund", "Refund Success"].includes(data?.status) && (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none">
              {["Processing refund", "Refund Success"].map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
            </select>
          )}

          <button
            className="mt-4 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
            onClick={
              data?.status !== "Processing refund"
                ? orderUpdateHandler
                : refundOrderUpdateHandler
            }>
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
