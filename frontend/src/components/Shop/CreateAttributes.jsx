/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom"; // For fetching shopId from URL
import { server } from "../../server";

const CreateAttributes = () => {
  const { id } = useParams(); // Get shop ID from the URL params
  const [name, setName] = useState("");
  const { isSeller, seller } = useSelector((state) => state.seller);

  const [options, setOptions] = useState("");
  const [shopId, setShopId] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editOptions, setEditOptions] = useState("");

  useEffect(() => {
    fetchAttributes();
    // fetchShopId();
  }, []);

  // Fetch all attributes
  const fetchAttributes = async () => {
    try {
      const response = await axios.get(`${server}/attribute/`, {
        params: { shopId: seller._id }, // Fetch only attributes for the current shop
      });
      setAttributes(response.data.attributes);
    } catch (error) {
      toast.error("Failed to fetch attributes");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  // Create new attribute
  const handleCreate = async () => {
    try {
      await axios.post(`${server}/attribute/create`, {
        name,
        options: options.split(",").map((option) => ({
          key: option.trim().toLowerCase(),
          value: option.trim(),
        })),
        shopId: seller._id, // Send the fetched shop ID
      });
      toast.success("Attribute created successfully!");
      setName("");
      setOptions("");
      fetchAttributes();
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : "Something went wrong!"
      );
    }
  };

  // Update an existing attribute
  const handleUpdate = async () => {
    try {
      await axios.put(`${server}/attribute/update/${editId}`, {
        name: editName,
        options: editOptions.split(",").map((option) => ({
          key: option.trim().toLowerCase(),
          value: option.trim(),
        })),
        shopId: seller._id, // Include the shopId in the update request
      });
      toast.success("Attribute updated successfully!");
      setEditId(null);
      setEditName("");
      setEditOptions("");
      fetchAttributes();
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : "Something went wrong!"
      );
    }
  };

  // Set values for editing an attribute
  const handleEdit = (attribute) => {
    setEditId(attribute._id);
    setEditName(attribute.name);
    setEditOptions(attribute.options.map((option) => option.value).join(", "));
  };

  // Delete an attribute
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server}/attribute/delete/${id}`);
      toast.success("Attribute deleted successfully!");
      fetchAttributes();
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : "Something went wrong!"
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create/Edit Product Attribute</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700">
            Attribute Name
          </label>
          <input
            type="text"
            id="name"
            value={editId ? editName : name}
            onChange={(e) =>
              editId ? setEditName(e.target.value) : setName(e.target.value)
            }
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="options"
            className="block text-sm font-medium text-gray-700">
            Options (comma-separated)
          </label>
          <input
            type="text"
            id="options"
            value={editId ? editOptions : options}
            onChange={(e) =>
              editId
                ? setEditOptions(e.target.value)
                : setOptions(e.target.value)
            }
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          {editId ? "Update Attribute" : "Create Attribute"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Options
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shop ID
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attributes.map((attribute) => (
              <tr key={attribute._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {attribute.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {attribute.options.map((option) => option.value).join(", ")}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    type="text"
                    value={attribute.shop._id}
                    className="w-full border border-gray-300 rounded-lg p-2 shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed"
                    readOnly
                  />
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(attribute)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(attribute._id)}
                    className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateAttributes;
