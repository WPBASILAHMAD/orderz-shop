/** @format */

// store.js

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { cartReducer } from "./reducers/cart";
import { wishlistReducer } from "./reducers/wishlist";
import { orderReducer } from "./reducers/order";
import attributeReducer from "./reducers/attribute"; // Import the new reducer

const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    events: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
    attributes: attributeReducer, // Add the attribute reducer
  },
});

export default Store;
