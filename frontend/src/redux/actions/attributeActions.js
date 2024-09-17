/** @format */

// actions/attributeActions.js

import axios from "axios";
import { toast } from "react-toastify";
import {
  ATTRIBUTE_CREATE_REQUEST,
  ATTRIBUTE_CREATE_SUCCESS,
  ATTRIBUTE_CREATE_FAIL,
  ATTRIBUTE_UPDATE_REQUEST,
  ATTRIBUTE_UPDATE_SUCCESS,
  ATTRIBUTE_UPDATE_FAIL,
  ATTRIBUTE_DELETE_REQUEST,
  ATTRIBUTE_DELETE_SUCCESS,
  ATTRIBUTE_DELETE_FAIL,
  ATTRIBUTE_FETCH_REQUEST,
  ATTRIBUTE_FETCH_SUCCESS,
  ATTRIBUTE_FETCH_FAIL,
} from "../constants/attributeConstants";

export const fetchAttributes = () => async (dispatch) => {
  try {
    dispatch({ type: ATTRIBUTE_FETCH_REQUEST });
    const { data } = await axios.get(`/attribute`);
    dispatch({ type: ATTRIBUTE_FETCH_SUCCESS, payload: data.attributes });
  } catch (error) {
    dispatch({
      type: ATTRIBUTE_FETCH_FAIL,
      payload: error.response?.data?.message || "Failed to fetch attributes",
    });
    toast.error("Failed to fetch attributes");
  }
};

export const createAttribute = (name, options, shopId) => async (dispatch) => {
  try {
    dispatch({ type: ATTRIBUTE_CREATE_REQUEST });
    const { data } = await axios.post(`/attribute/create`, {
      name,
      options: options
        .split(",")
        .map((option) => ({
          key: option.trim().toLowerCase(),
          value: option.trim(),
        })),
      shopId,
    });
    dispatch({ type: ATTRIBUTE_CREATE_SUCCESS, payload: data.attribute });
    toast.success("Attribute created successfully!");
  } catch (error) {
    dispatch({
      type: ATTRIBUTE_CREATE_FAIL,
      payload: error.response?.data?.message || "Failed to create attribute",
    });
    toast.error(error.response?.data?.message || "Failed to create attribute");
  }
};

export const updateAttribute =
  (id, name, options, shopId) => async (dispatch) => {
    try {
      dispatch({ type: ATTRIBUTE_UPDATE_REQUEST });
      const { data } = await axios.put(`/attribute/update/${id}`, {
        name,
        options: options
          .split(",")
          .map((option) => ({
            key: option.trim().toLowerCase(),
            value: option.trim(),
          })),
        shopId,
      });
      dispatch({ type: ATTRIBUTE_UPDATE_SUCCESS, payload: data.attribute });
      toast.success("Attribute updated successfully!");
    } catch (error) {
      dispatch({
        type: ATTRIBUTE_UPDATE_FAIL,
        payload: error.response?.data?.message || "Failed to update attribute",
      });
      toast.error(
        error.response?.data?.message || "Failed to update attribute"
      );
    }
  };

export const deleteAttribute = (id) => async (dispatch) => {
  try {
    dispatch({ type: ATTRIBUTE_DELETE_REQUEST });
    await axios.delete(`/attribute/delete/${id}`);
    dispatch({ type: ATTRIBUTE_DELETE_SUCCESS, payload: id });
    toast.success("Attribute deleted successfully!");
  } catch (error) {
    dispatch({
      type: ATTRIBUTE_DELETE_FAIL,
      payload: error.response?.data?.message || "Failed to delete attribute",
    });
    toast.error(error.response?.data?.message || "Failed to delete attribute");
  }
};
