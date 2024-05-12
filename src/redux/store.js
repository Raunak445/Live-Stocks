import { configureStore } from "@reduxjs/toolkit"
import stocksReducer from "./slice/liveStocks"


export const store= configureStore({
    reducer:{
        stocks:stocksReducer
    }
})