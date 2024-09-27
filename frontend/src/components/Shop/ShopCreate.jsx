/** @format */

import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";

const ShopCreate = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState();
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [agreedToPolicies, setAgreedToPolicies] = useState(false); // New state for the checkbox

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user agreed to the policies
    if (!agreedToPolicies) {
      toast.error("You must agree to the Terms and Privacy Policy.");
      return;
    }

    axios
      .post(`${server}/shop/create-shop`, {
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber,
      })
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar();
        setZipCode();
        setAddress("");
        setPhoneNumber();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
        {/* Form Grid */}
        <div className="flex items-center justify-center bg-white w-full h-fit ">
          <div className="w-full max-w-lg p-8">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
              Register as a seller
            </h2>
            <h5 className="text-center text-[15px] font-bold text-red-500 mb-4">
              Make sure you have a Pakistan COD Courier Services account.
            </h5>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700">
                  Shop Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="number"
                  name="phone-number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="zipcode"
                  className="block text-sm font-medium text-gray-700">
                  Zip Code
                </label>
                <input
                  type="number"
                  name="zipcode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-3 top-3 cursor-pointer"
                      size={20}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-3 top-3 cursor-pointer"
                      size={20}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Avatar
                </label>
                <div className="flex items-center mt-2">
                  <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <RxAvatar className="h-8 w-8" />
                    )}
                  </span>
                  <input
                    type="file"
                    onChange={handleFileInputChange}
                    className="ml-5"
                  />
                </div>
              </div>

              {/* Checkbox for Terms and Privacy Policy */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 mr-2"
                  checked={agreedToPolicies}
                  onChange={() => setAgreedToPolicies(!agreedToPolicies)}
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the{" "}
                  <Link to="/terms-of-service" className="text-blue-600">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy-policy" className="text-blue-600">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Submit
              </button>
            </form>
            <div className="mt-6 flex justify-between">
              <h4>Already have an account?</h4>
              <Link to="/shop-login" className="text-blue-600">
                Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Logo Grid */}
        <div className="flex items-center justify-center w-full h-full bg-blue-100">
          <img
            src="https://www.seller.orderzshop.com/wp-content/uploads/2024/09/Start-Selling-on-OrderzShop-for-Just-Rs3000Month.png"
            alt="orderzshop"
            className="w-full h-full object-fill" // Adjusted to cover the full area
          />
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
