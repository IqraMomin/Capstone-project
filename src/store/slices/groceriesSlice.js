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
            state.list = action.payload || [];
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
            const {id,status} = action.payload;
            const existingItemIndex = state.list.findIndex(ele=>ele.id===id);
            const existingItem = state.list[existingItemIndex];
            let updatedItem;
            if(existingItem){
                updatedItem = {...existingItem,completed:status}
            }
            state.list[existingItemIndex] = updatedItem;
        })
        .addCase(changeStatus.rejected,(state,action)=>{
            state.loading=true;
            state.error = action.payload;
        })
        .addCase(deleteGroceries.pending,(state)=>{
            state.loading=true;
        })
        .addCase(deleteGroceries.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        })
        .addCase(deleteGroceries.fulfilled,(state,action)=>{
            state.loading=false;
            state.list = state.list.filter(ele=>ele.id!==action.payload);
        })
        .addCase(editGroceries.pending,(state)=>{
            state.loading=true;
        })
        .addCase(editGroceries.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        })
        .addCase(editGroceries.fulfilled,(state,action)=>{
            state.loading=false;
            const {data,id} = action.payload;
            const existingIndex = state.list.findIndex(ele=>ele.id===id);
            if(existingIndex !== -1){
                state.list[existingIndex] = {...data,id}
            }
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
    "groceries/changeStatus",async({id,status},thunkAPI)=>{
        try{
            const email = thunkAPI.getState().auth.email;
            const safeEmail = email.replace(/[.]/g,"_");
            const res= await axios.patch(`https://capstone-project-b88ca-default-rtdb.firebaseio.com/${safeEmail}//groceries/${id}.json`,{completed:status})            
            return {id,status}
        }catch(err){
            thunkAPI.rejectWithValue("Failed to change the status");
        }
    }
)
export const deleteGroceries = createAsyncThunk(
    "recipe/deleteGroceries",async(id,thunkAPI)=>{
        try{
            const email = thunkAPI.getState().auth.email;
            const safeEmail = email.replace(/[.]/g,"_");
            await axios.delete(`https://capstone-project-b88ca-default-rtdb.firebaseio.com/${safeEmail}/groceries/${id}.json`)            
            return id;
        }catch(err){
            thunkAPI.rejectWithValue("Failed to delete grocery");

        }
    }
)
export const editGroceries = createAsyncThunk(
    "recipe/editGroceries",async({data,id},thunkAPI)=>{
        try{
            const email = thunkAPI.getState().auth.email;
            const safeEmail = email.replace(/[.]/g,"_");            
            await axios.patch(`https://capstone-project-b88ca-default-rtdb.firebaseio.com/${safeEmail}/groceries/${id}.json`,data)            
            return {data,id}
        }catch(err){
            thunkAPI.rejectWithValue("Failed to edit the recipe");
        }
    }
)
