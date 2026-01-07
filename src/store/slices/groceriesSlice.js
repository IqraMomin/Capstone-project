import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    error: null,
    loading: null,
    list: []
}

const groceriesSlice = createSlice({
    name: "groceries",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(addGroceries.pending,(state)=>{
            state.loading=true;
        })
        .addCase(addGroceries.fulfilled,(state,action)=>{
            state.loading=true;
            state.list.push(action.payload);
        })
        .addCase(addGroceries.rejected,(state,action)=>{
            state.loading=true;
            state.error = action.payload;
        })
        .addCase(fetchGroceries.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchGroceries.fulfilled,(state,action)=>{
            state.loading=true;
            state.list = action.payload;
        })
        .addCase(fetchGroceries.rejected,(state,action)=>{
            state.loading=true;
            state.error = action.payload;
        })
        .addCase(changeStatus.pending,(state)=>{
            state.loading=true;
        })
        .addCase(changeStatus.fulfilled,(state,action)=>{
            state.loading=true;
            const id = action.payload;
            const existingItemIndex = state.list.findIndex(ele=>ele.id===id);
            const existingItem = state.list[existingItemIndex];
            let updatedItem;
            if(existingItem){
                updatedItem = {...existingItem,status:"bought"}
            }
            state.list[existingItemIndex] = updatedItem;
        })
        .addCase(changeStatus.rejected,(state,action)=>{
            state.loading=true;
            state.error = action.payload;
        })
    }
})
export const groceriesActions = groceriesSlice.actions;
export default groceriesSlice.reducer


export const addGroceries = createAsyncThunk(
    "groceries/addGroceries", async (data, thunkAPI) => {
        try {
            const email = thunkAPI.getState().auth.email;
            const safeEmail = email.replace(/[.]/g,"_");
            const res= await axios.post(`https://capstone-project-b88ca-default-rtdb.firebaseio.com/${safeEmail}/groceries.json`,data)            
            console.log({...data,id:res.data.name});
            return {...data,id:res.data.name}

        } catch (err) {
            thunkAPI.rejectWithValue("Failed to add Groceries");
        }
    }
)

export const fetchGroceries = createAsyncThunk(
    "groceries/fetchGroceries",async(_,thunkAPI)=>{
        try{
            const email = thunkAPI.getState().auth.email;
            const safeEmail = email.replace(/[.]/g,"_");
            const res= await axios.get(`https://capstone-project-b88ca-default-rtdb.firebaseio.com/${safeEmail}/groceries.json`)            
            const list = Object.keys(res.data).map(ele=>{
                return {...res.data[ele],id:ele}
            })
            return list;
        }catch(err){
            thunkAPI.rejectWithValue("Failed to fetch Groceries");
        }

    }
)

export const changeStatus =createAsyncThunk(
    "groceries/changeStatus",async(id,thunkAPI)=>{
        try{
            const email = thunkAPI.getState().auth.email;
            const safeEmail = email.replace(/[.]/g,"_");
            const res= await axios.patch(`https://capstone-project-b88ca-default-rtdb.firebaseio.com/${safeEmail}//groceries/${id}.json`,{status:"bought"})            
            return id
        }catch(err){
            thunkAPI.rejectWithValue("Failed to change the status");
        }
    }
)