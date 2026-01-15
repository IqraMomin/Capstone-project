import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    error: null,
    loading: null,
    list: []
}

const choresSlice = createSlice({
    name: "chores",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(addChores.pending,(state)=>{
            state.loading=true;
        })
        .addCase(addChores.fulfilled,(state,action)=>{
            state.loading=true;
            state.list.push(action.payload);
        })
        .addCase(addChores.rejected,(state,action)=>{
            state.loading=true;
            state.error = action.payload;
        })
        .addCase(fetchChores.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchChores.fulfilled,(state,action)=>{
            state.loading=false;
            state.list = action.payload || [];
        })
        .addCase(fetchChores.rejected,(state,action)=>{
            state.loading=true;
            state.error = action.payload;
        })
        .addCase(changeStatus.pending,(state)=>{
            state.loading=true;
        })
        .addCase(changeStatus.fulfilled,(state,action)=>{
            state.loading=false;
            const {id,date,reminded} = action.payload;
            const existingItemIndex = state.list.findIndex(ele=>ele.id===id);
            const existingItem = state.list[existingItemIndex];
            let updatedItem;
            if(existingItem){
                updatedItem = {...existingItem,completed:date,reminded:true}
            }
            state.list[existingItemIndex] = updatedItem;
        })
        .addCase(changeStatus.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        })
        .addCase(deleteChores.pending,(state)=>{
            state.loading=true;
        })
        .addCase(deleteChores.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        })
        .addCase(deleteChores.fulfilled,(state,action)=>{
            state.loading=false;
            state.list = state.list.filter(ele=>ele.id!==action.payload);
        })
        .addCase(editChores.pending,(state)=>{
            state.loading=true;
        })
        .addCase(editChores.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        })
        .addCase(editChores.fulfilled,(state,action)=>{
            state.loading=false;
            const {data,id} = action.payload;
            const existingIndex = state.list.findIndex(ele=>ele.id===id);
            if(existingIndex !== -1){
                state.list[existingIndex] = {...data,id}
            }
        })
        .addCase(markReminded.fulfilled, (state, action) => {
            const task = state.list.find(ele => ele.id === action.payload);
            if (task) {
              task.reminded = true;
            }
          })
    }
})
export const choresActions = choresSlice.actions;
export default choresSlice.reducer


export const addChores = createAsyncThunk(
    "chores/addChores", async (data, thunkAPI) => {
        try {
            const email = thunkAPI.getState().auth.email;
            const safeEmail = email.replace(/[.]/g,"_");
            const res= await axios.post(`https://capstone-project-b88ca-default-rtdb.firebaseio.com/${safeEmail}/chores.json`,data)            
            console.log({...data,id:res.data.name});
            return {...data,id:res.data.name}

        } catch (err) {
            thunkAPI.rejectWithValue("Failed to add Chores");
        }
    }
)

export const fetchChores = createAsyncThunk(
    "chores/fetchChores",async(_,thunkAPI)=>{
        try{
            const email = thunkAPI.getState().auth.email;
            const safeEmail = email.replace(/[.]/g,"_");
            const res= await axios.get(`https://capstone-project-b88ca-default-rtdb.firebaseio.com/${safeEmail}/chores.json`)            
            const list = Object.keys(res.data).map(ele=>{
                return {...res.data[ele],id:ele}
            })
            return list;
        }catch(err){
            thunkAPI.rejectWithValue("Failed to fetch Chores");
        }

    }
)

export const changeStatus =createAsyncThunk(
    "chores/changeStatus",async(id,thunkAPI)=>{
        try{
            const date=new Date().toISOString().split("T")[0];
            const email = thunkAPI.getState().auth.email;
            const safeEmail = email.replace(/[.]/g,"_");
            await axios.patch(`https://capstone-project-b88ca-default-rtdb.firebaseio.com/${safeEmail}/chores/${id}.json`,{completed:date,reminded:true})            
            return {id,date,reminded:true}
        }catch(err){
            thunkAPI.rejectWithValue("Failed to change the status");
        }
    }
)
export const deleteChores = createAsyncThunk(
    "chores/deleteChores",async(id,thunkAPI)=>{
        try{
            const email = thunkAPI.getState().auth.email;
            const safeEmail = email.replace(/[.]/g,"_");
            await axios.delete(`https://capstone-project-b88ca-default-rtdb.firebaseio.com/${safeEmail}/chores/${id}.json`)            
            return id;
        }catch(err){
            thunkAPI.rejectWithValue("Failed to delete chores");

        }
    }
)
export const editChores = createAsyncThunk(
    "chores/editChores",async({data,id},thunkAPI)=>{
        try{
            const email = thunkAPI.getState().auth.email;
            const safeEmail = email.replace(/[.]/g,"_");            
            await axios.patch(`https://capstone-project-b88ca-default-rtdb.firebaseio.com/${safeEmail}/chores/${id}.json`,data)            
            return {data,id}
        }catch(err){
            thunkAPI.rejectWithValue("Failed to edit the chore");
        }
    }
)
export const markReminded = createAsyncThunk(
    "chores/markReminded",
    async (taskId,thunkAPI) => {
        const email = thunkAPI.getState().auth.email;
        const safeEmail = email.replace(/[.]/g,"_");            
        await axios.patch(`https://capstone-project-b88ca-default-rtdb.firebaseio.com/${safeEmail}/chores/${taskId}.json`,{
          reminded: true
        }
      );
  
      return taskId;
    }
  );
