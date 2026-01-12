import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import recipeReducer from "./slices/recipeSlice";
import profileReducer from "./slices/profileSlice";
import groceriesReducer from "./slices/groceriesSlice";
import choresReducer from "./slices/choresSlice";

const store = configureStore({
    reducer:{
        auth:authReducer,
        recipe:recipeReducer,
        profile:profileReducer,
        groceries:groceriesReducer,
        chores:choresReducer
    }
})

export default store;