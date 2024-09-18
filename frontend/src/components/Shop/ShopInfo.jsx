/** @format */

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Star,
  MapPin,
  Phone,
  Package,
  Calendar,
  Edit,
  LogOut,
} from "lucide-react";

import { server } from "../../server";
import { getAllProductsShop } from "../../redux/actions/product";
import Loader from "../Layout/Loader";

export default function ShopInfo({ isOwner = false }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { products } = useSelector((state) => state.products);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [dispatch, id]);

  const logoutHandler = async () => {
    await axios.get(`${server}/shop/logout`, { withCredentials: true });
    window.location.reload();
  };

  const totalReviewsLength =
    products?.reduce((acc, product) => acc + product.reviews.length, 0) || 0;
  const totalRatings =
    products?.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    ) || 0;
  const averageRating = totalRatings / totalReviewsLength || 0;

  if (isLoading) return <Loader />;

  return (
    <div className="bg-gray-100 min-h-screen ">
      <div className=" mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-50 pt-28 bg-gradient-to-r from-blue-500 to-purple-600">
          <img
            src={data.avatar?.url}
            alt={data.name}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-32 rounded-full border-4  object-contain bg-white"
          />
        </div>
        <div className="pt-16 pb-8 px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">{data.name}</h1>
          <p className="mt-2 text-gray-600">{data.description}</p>
        </div>
        <div className="border-t border-gray-200 px-8 py-6 grid grid-cols-1 md:grid-cols-1 gap-6">
          <InfoItem
            icon={<MapPin className="w-5 h-5 text-gray-400" />}
            label="Address"
            value={data.address}
          />
          <InfoItem
            icon={<Phone className="w-5 h-5 text-gray-400" />}
            label="Phone Number"
            value={data.phoneNumber}
          />
          <InfoItem
            icon={<Package className="w-5 h-5 text-gray-400" />}
            label="Total Products"
            value={products?.length || 0}
          />
          <InfoItem
            icon={<Star className="w-5 h-5 text-yellow-400" />}
            label="Shop Rating"
            value={`${averageRating.toFixed(1)}/5`}
          />
          <InfoItem
            icon={<Calendar className="w-5 h-5 text-gray-400" />}
            label="Joined On"
            value={data.createdAt?.slice(0, 10)}
          />
        </div>
        {isOwner && (
          <div className="border-t border-gray-200 px-8 py-6 flex flex-col sm:flex-col gap-4">
            <Link
              to="/settings"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center">
              <Edit className="w-5 h-5 mr-2" />
              Edit Shop
            </Link>
            <button
              onClick={logoutHandler}
              className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center justify-center">
              <LogOut className="w-5 h-5 mr-2" />
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center">
      {icon}
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
