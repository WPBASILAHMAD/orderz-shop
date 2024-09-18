/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import VendorsAvatars from "../components/Route/VendorsAvatars";
import { server } from "../server";
const VendorsAvatar = () => {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await axios.get(`${server}/shop/get-shop-avatars`);
        setAvatars(response.data.avatars);
      } catch (error) {
        console.error("Error fetching avatars:", error);
      }
    };

    fetchAvatars();
  }, []);

  return (
    <div>
      <VendorsAvatars avatars={avatars} />
    </div>
  );
};

export default VendorsAvatar;
