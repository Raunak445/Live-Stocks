import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchStocks = createAsyncThunk('fetchStocks', async (page) => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/stock-prices?page=${page}`);
    return response.data; // Return the entire response data including data and totalPages
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw error;
  }
});

const liveStockSlice = createSlice({
  name: "stocks",
  initialState:{
    isLoading:false,
    data:null,
    isError:false,
    currentPage: 1, // Initial current page is 1
    totalPages: 1 // Initial total pages is 1
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchStocks.pending,(state,action)=>{
        state.isLoading=true;
    })
    builder.addCase(fetchStocks.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.data=action.payload.data; // Extract data from the response
        state.totalPages = action.payload.totalPages; // Extract totalPages from the response
    })
    builder.addCase(fetchStocks.rejected,(state,action)=>{
        console.log("Error",action.payload)
        state.isError=true
    })
  }
});

export default liveStockSlice.reducer;
