/** @format */

import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllProductsShop,
  deleteProduct,
  updateProduct,
} from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import ConfirmDeletePopup from "../Route/Comman/ConfirmDeletePopup";
import EditProductPopup from "../Route/Comman/EditProductPopup"; // The new popup component

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null); // Store product data for editing

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);

  const handleDelete = (id) => {
    setProductIdToDelete(id);
    setDeletePopupOpen(true);
  };

  const confirmDelete = () => {
    if (productIdToDelete) {
      dispatch(deleteProduct(productIdToDelete)).then(() => {
        dispatch(getAllProductsShop(seller._id));
      });
    }
    setDeletePopupOpen(false);
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
    setEditPopupOpen(true);
  };

  const confirmEdit = (updatedProduct) => {
    if (productToEdit) {
      dispatch(updateProduct(productToEdit.id, updatedProduct)).then(() => {
        dispatch(getAllProductsShop(seller._id));
      });
    }
    setEditPopupOpen(false);
  };

  const row =
    products?.map((item) => ({
      id: item._id,
      name: item.name,
      price: item.discountPrice
        ? "Rs: " + item.discountPrice
        : "Rs: " + item.originalPrice,
      Stock: item.stock,
      sold: item?.sold_out,
    })) || [];
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full pt-3  bg-white rounded shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Product Id</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Stock</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {row.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{product.id}</td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.price}</td>
                  <td className="px-4 py-2">{product.Stock}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <Link to={`/product/${product.id}`}>
                      <Button variant="outlined" color="primary">
                        <AiOutlineEye size={20} />
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleEdit(product)}
                      variant="outlined"
                      color="primary">
                      <AiOutlineEdit size={20} />
                    </Button>
                    <Button
                      onClick={() => handleDelete(product.id)}
                      variant="outlined"
                      color="secondary">
                      <AiOutlineDelete size={20} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ConfirmDeletePopup
            isOpen={isDeletePopupOpen}
            onClose={() => setDeletePopupOpen(false)}
            onConfirm={confirmDelete}
          />
          {isEditPopupOpen && (
            <EditProductPopup
              isOpen={isEditPopupOpen}
              onClose={() => setEditPopupOpen(false)}
              product={productToEdit}
              onConfirm={confirmEdit}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AllProducts;
