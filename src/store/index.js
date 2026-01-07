import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import recipeReducer from "./slices/recipeSlice";
import profileReducer from "./slices/profileSlice";
import groceriesReducer from "./slices/groceriesSlice";

const store = configureStore({
    reducer:{
        auth:authReducer,
        recipe:recipeReducer,
        profile:profileReducer,
        groceries:groceriesReducer
    }
})

export default store;