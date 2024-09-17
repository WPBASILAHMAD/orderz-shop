/** @format */

// reducers/attribute.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";

// Initial state for attributes
const initialState = {
  attributes: [],
  loading: false,
  error: null,
};

// Slice for attribute reducer
const attributeSlice = createSlice({
  name: "attributes",
  initialState,
  reducers: {
    fetchAttributesStart: (state) => {
      state.loading = true;
    },
    fetchAttributesSuccess: (state, action) => {
      state.loading = false;
      state.attributes = action.payload;
    },
    fetchAttributesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createAttributeSuccess: (state, action) => {
      state.attributes.push(action.payload);
    },
    updateAttributeSuccess: (state, action) => {
      const index = state.attributes.findIndex(
        (attr) => attr._id === action.payload._id
      );
      if (index !== -1) {
        state.attributes[index] = action.payload;
      }
    },
    deleteAttributeSuccess: (state, action) => {
      state.attributes = state.attributes.filter(
        (attr) => attr._id !== action.payload
      );
    },
  },
});

export const {
  fetchAttributesStart,
  fetchAttributesSuccess,
  fetchAttributesFail,
  createAttributeSuccess,
  updateAttributeSuccess,
  deleteAttributeSuccess,
} = attributeSlice.actions;

export default attributeSlice.reducer;

// Async actions

// Fetch attributes
export const fetchAttributes = () => async (dispatch) => {
  try {
    dispatch(fetchAttributesStart());
    const { data } = await axios.get(`${server}/attribute/`);
    dispatch(fetchAttributesSuccess(data.attributes));
  } catch (error) {
    dispatch(
      fetchAttributesFail(
        error.response.data.message || "Error fetching attributes"
      )
    );
    toast.error(error.response.data.message || "Failed to fetch attributes");
  }
};

// Create new attribute
export const createAttribute = (attribute) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${server}/attribute/create`, attribute);
    dispatch(createAttributeSuccess(data.attribute));
    toast.success("Attribute created successfully!");
  } catch (error) {
    toast.error(error.response.data.message || "Error creating attribute");
  }
};

// Update attribute
export const updateAttribute = (id, updatedAttribute) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${server}/attribute/update/${id}`,
      updatedAttribute
    );
    dispatch(updateAttributeSuccess(data.attribute));
    toast.success("Attribute updated successfully!");
  } catch (error) {
    toast.error(error.response.data.message || "Error updating attribute");
  }
};

// Delete attribute
export const deleteAttribute = (id) => async (dispatch) => {
  try {
    await axios.delete(`${server}/attribute/delete/${id}`);
    dispatch(deleteAttributeSuccess(id));
    toast.success("Attribute deleted successfully!");
  } catch (error) {
    toast.error(error.response.data.message || "Error deleting attribute");
  }
};
