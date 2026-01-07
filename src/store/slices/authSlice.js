import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialToken = localStorage.getItem("token")|| "";
const initialEmail = localStorage.getItem("email")||"";

const initialState= {
    error:null,
    loading:null,
    token:initialToken,
    email:initialEmail,
    isLoggedIn:!!initialToken,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state)=>{
            state.email=null;
            state.token=null;
            state.isLoggedIn=false;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state)=>{
            state.loading = true;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false;
            const {idToken,email} = action.payload;
            state.token = idToken;
            state.email = email;
            state.isLoggedIn = true;
            
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        })
    }
    

})

export const login = createAsyncThunk(
    "auth/login",async(userData,thunkAPI)=>{
    try{
        const res = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_bCm1pyfyYgOHr4XR6Xe2yaIxP1vKnOY",userData);           
        const idToken = res.data.idToken;
        const email = userData.email;
        localStorage.setItem("token",idToken);
        localStorage.setItem("email",email);
        return {idToken,email}    

    }catch(err){
        return thunkAPI.rejectWithValue("Login Failed");
    }
    
    }
)



export const signup = createAsyncThunk(
    "auth/signUp",
    async ({ userData, handleLogin }, thunkAPI) => {
      try {
        // Create auth user
        await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_bCm1pyfyYgOHr4XR6Xe2yaIxP1vKnOY`,userData)
            
  
        const safeEmail = userData.email.replace(/[.]/g, "_");
  
        // Create user profile folder with PUT (not POST!)
        await axios.put(
            `https://capstone-project-b88ca-default-rtdb.firebaseio.com/users/${safeEmail}.json`,
          {
            email: userData.email,
            name: "",
            address: "",
            mobile: ""
          }
        );
  
        alert("Registration Successful");
        handleLogin();
      } catch (err) {
        return thunkAPI.rejectWithValue("Registration Failed");
    }
    }
  );

  export const resetPassword = createAsyncThunk(
    "auth/resetPassword",async(email,thunkAPI)=>{
        try {
            const response = await fetch(
              "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA_bCm1pyfyYgOHr4XR6Xe2yaIxP1vKnOY",
              {
                method: "POST",
                body: JSON.stringify({
                  requestType: "PASSWORD_RESET",
                  email
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
      
            const data = await response.json();
      
            if (!response.ok) {
              alert(data.error.message);
              return;
            }
      
            alert("Password reset link sent to your email!");
          } catch (err) {
            console.log(err);
          }
    }
)


export const authActions = authSlice.actions;
export default authSlice.reducer;
