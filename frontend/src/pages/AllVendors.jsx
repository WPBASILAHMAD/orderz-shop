/** @format */

import React from "react";
import AllSellers from "../components/Route/Comman/AllSellers.jsx";
import Header from "../components/Layout/Header.jsx";
import Footer from "../components/Layout/Footer.jsx";
const AllVendors = () => {
  return (
    <div>
      <Header activeHeading={6} />
      <AllSellers />
      <Footer />
    </div>
  );
};

export default AllVendors;
