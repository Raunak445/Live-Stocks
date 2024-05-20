import { configureStore } from "@reduxjs/toolkit"
import stocksReducer from "./slice/liveStocks"
import authReducer from "./slice/authSlice"


export const store= configureStore({
    reducer:{
        stocks:stocksReducer,
        auth: authReducer,
    }
})