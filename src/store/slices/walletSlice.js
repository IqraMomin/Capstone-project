import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserPath } from "../../utils/firebaseUrl";

const initialState = {
    loading:false,
    error:null,
    list:[]
}

const walletSlice = createSlice({
    name:"wallet",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addToWallet.pending,(state)=>{
            state.loading=true;
        })
        .addCase(addToWallet.fulfilled,(state,action)=>{
            state.loading=true;
            state.list.push(action.payload);
        })
        .addCase(addToWallet.rejected,(state,action)=>{
            state.loading=true;
            state.error = action.payload;
        })
        .addCase(fetchWallet.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchWallet.fulfilled,(state,action)=>{
            state.loading=false;
            state.list = action.payload || [];
        })
        .addCase(fetchWallet.rejected,(state,action)=>{
            state.loading=true;
            state.error = action.payload;
        })
        .addCase(changeStatus.pending,(state)=>{
            state.loading=true;
        })
        .addCase(changeStatus.fulfilled,(state,action)=>{
            state.loading=false;
            const {id,date} = action.payload;
            const existingItemIndex = state.list.findIndex(ele=>ele.id===id);
            const existingItem = state.list[existingItemIndex];
            let updatedItem;
            if(existingItem){
                updatedItem = {...existingItem,completed:date}
            }
            state.list[existingItemIndex] = updatedItem;
        })
        .addCase(changeStatus.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        })
        .addCase(deleteFromWallet.pending,(state)=>{
            state.loading=true;
        })
        .addCase(deleteFromWallet.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        })
        .addCase(deleteFromWallet.fulfilled,(state,action)=>{
            state.loading=false;
            state.list = state.list.filter(ele=>ele.id!==action.payload);
        })
        .addCase(editWallet.pending,(state)=>{
            state.loading=true;
        })
        .addCase(editWallet.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        })
        .addCase(editWallet.fulfilled,(state,action)=>{
            state.loading=false;
            const {data,id} = action.payload;
            const existingIndex = state.list.findIndex(ele=>ele.id===id);
            if(existingIndex !== -1){
                state.list[existingIndex] = {...data,id}
            }
        })
    }
})

export const walletActions = walletSlice.actions;
export default walletSlice.reducer;

export const addToWallet = createAsyncThunk(
    "wallet/addToWallet", async (data, thunkAPI) => {
        try {
            const email = thunkAPI.getState().auth.email;
            const res= await axios.post(`${getUserPath(email)}/wallet.json`,data)            
            console.log({...data,id:res.data.name});
            return {...data,id:res.data.name}

        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to add to wallet");
        }
    }
)

export const fetchWallet = createAsyncThunk(
    "wallet/fetchWallet",async(_,thunkAPI)=>{
        try{
            const email = thunkAPI.getState().auth.email;
            const res= await axios.get(`${getUserPath(email)}/wallet.json`)            
            const list = Object.keys(res.data).map(ele=>{
                return {...res.data[ele],id:ele}
            })
            return list;
        }catch(err){
            return thunkAPI.rejectWithValue("Failed to fetch Wallet");
        }

    }
)

export const changeStatus =createAsyncThunk(
    "wallet/changeStatus",async(id,thunkAPI)=>{
        try{
            const date=new Date().toISOString().split("T")[0];
            const email = thunkAPI.getState().auth.email;
             await axios.patch(`${getUserPath(email)}/wallet/${id}.json`,{completed:date})            
            return {id,date}
        }catch(err){
            thunkAPI.rejectWithValue("Failed to change the status");
        }
    }
)
export const deleteFromWallet = createAsyncThunk(
    "wallet/deleteFromWallet",async(id,thunkAPI)=>{
        try{
            const email = thunkAPI.getState().auth.email;
            await axios.delete(`${getUserPath(email)}/wallet/${id}.json`)            
            return id;
        }catch(err){
            return thunkAPI.rejectWithValue("Failed to delete from wallet");

        }
    }
)
export const editWallet = createAsyncThunk(
    "wallet/editWallet",async({data,id},thunkAPI)=>{
        try{
            const email = thunkAPI.getState().auth.email;
            await axios.patch(`${getUserPath(email)}/wallet/${id}.json`,data)            
            return {data,id}
        }catch(err){
            return thunkAPI.rejectWithValue("Failed to edit the wallet");
        }
    }
)
