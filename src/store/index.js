import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import recipeReducer from "./slices/recipeSlice";
import profileReducer from "./slices/profileSlice";
import groceriesReducer from "./slices/groceriesSlice";
import choresReducer from "./slices/choresSlice";
import walletReducer from "./slices/walletSlice";

const store = configureStore({
    reducer:{
        auth:authReducer,
        recipe:recipeReducer,
        profile:profileReducer,
        groceries:groceriesReducer,
        chores:choresReducer,
        wallet:walletReducer
    }
})

export default store;