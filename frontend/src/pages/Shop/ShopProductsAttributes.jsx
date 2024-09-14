/** @format */
import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import CreateAttributes from "../../components/Shop/CreateAttributes.jsx";

const ShopProductsAttributes = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={12} />
        </div>
        <div className="w-full justify-center flex">
          <CreateAttributes />
        </div>
      </div>
    </div>
  );
};

export default ShopProductsAttributes;
