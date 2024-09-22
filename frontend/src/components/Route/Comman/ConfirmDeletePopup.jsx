/** @format */

// ConfirmDeletePopup.jsx
import React from "react";

const ConfirmDeletePopup = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-lg w-full transform transition-transform duration-300 scale-95 hover:scale-100">
        <h2 className="text-2xl font-bold mb-4 text-center text-red-600">
          Delete Product
        </h2>
        <p className="mb-6 text-gray-700 text-center">
          This product will be permanently removed from your inventory. Do you
          want to proceed?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition duration-200"
            onClick={onConfirm}>
            Yes, Delete
          </button>
          <button
            className="bg-gray-300 text-black px-5 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
            onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopup;
