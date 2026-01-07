import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    error:null,
    loading:null,
    list:[]
}

const recipeSlice = createSlice({
    name:"recipe",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addRecipe.pending,(state)=>{
            state.loading=true;
        })
        .addCase(addRecipe.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        })
        .addCase(addRecipe.fulfilled,(state,action)=>{
            state.loading=false;
            state.list.push(action.payload);
        })
        .addCase(deleteRecipe.pending,(state)=>{
            state.loading=true;
        })
        .addCase(deleteRecipe.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        })
        .addCase(deleteRecipe.fulfilled,(state,action)=>{
            state.loading=false;
            state.list = state.list.filter(ele=>ele.id!==action.payload);
        })
        .addCase(fetchRecipes.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchRecipes.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        })
        .addCase(fetchRecipes.fulfilled,(state,action)=>{
            state.loading=false;
            state.list = action.payload ||[];
        })
        .addCase(editRecipe.pending,(state)=>{
            state.loading=true;
        })
        .addCase(editRecipe.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        })
        .addCase(editRecipe.fulfilled,(state,action)=>{
            state.loading=false;
            const {data,id} = action.payload;
            const existingIndex = state.list.findIndex(ele=>ele.id===id);
            console.log(existingIndex);
            if(existingIndex !== -1){
                state.list[existingIndex] = {...data,id}
            }
            console.log({...data,id});
        })
    }
})

export const addRecipe = createAsyncThunk(
    "recipe/addRecipe",async(data,thunkAPI)=>{
        try{
            const email = thunkAPI.getState().auth.email;
            const safeEmail = email.replace(/[.]/g,"_");
            const res= await axios.post(`https://capstone-project-b88ca-default-rtdb.firebaseio.com/${safeEmail}/recipes.json`,data)            
            return {...data,id:res.data.name}
        }catch(err){
            thunkAPI.rejectWithValue("Failed to add recipe");
        }
    }
)

export const deleteRecipe = createAsyncThunk(
    "recipe/deleteRecipe",async(id,thunkAPI)=>{
        try{
            const email = thunkAPI.getState().auth.email;
            const safeEmail = email.replace(/[.]/g,"_");
            await axios.delete(`https://capstone-project-b88ca-default-rtdb.firebaseio.com/${safeEmail}/recipes/${id}.json`)            
            return id;
        }catch(err){
            thunkAPI.rejectWithValue("Failed to delete recipe");

        }
    }
)
export const fetchRecipes = createAsyncThunk(
    "recipe/fetchRecipes",async(_,thunkAPI)=>{
        try{
            const email = thunkAPI.getState().auth.email;
            const safeEmail = email.replace(/[.]/g,"_");
            const res= await axios.get(`https://capstone-project-b88ca-default-rtdb.firebaseio.com/${safeEmail}/recipes.json`)            
            const list = Object.keys(res.data).map(ele=>{
                return {...res.data[ele],id:ele}
            })
            return list;
        }catch(err){
            thunkAPI.rejectWithValue("Failed to fetch recipes");
        }
    }
)

export const editRecipe = createAsyncThunk(
    "recipe/editRecipe",async({data,id},thunkAPI)=>{
        try{
            const email = thunkAPI.getState().auth.email;
            const safeEmail = email.replace(/[.]/g,"_");            
            await axios.patch(`https://capstone-project-b88ca-default-rtdb.firebaseio.com/${safeEmail}/recipes/${id}.json`,data)            
            return {data,id}
        }catch(err){
            thunkAPI.rejectWithValue("Failed to edit the recipe");
        }
    }
)
export const recipeActions= recipeSlice.actions;
export default recipeSlice.reducer;