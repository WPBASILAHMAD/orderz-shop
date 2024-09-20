/** @format */

import React from "react";
import WhatsAppQR from "../../../Assests/imgs/WhatsappQR.png";
const ChatWithUS = () => {
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 p-10">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <div className="relative w-full aspect-square mb-4 items-center">
          <img
            src={WhatsAppQR}
            alt="QR Code"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded font-Poppins"
          onClick={() => window.open("https://wa.link/8y9nkv", "_blank")}>
          Contact US on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default ChatWithUS;
