import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../redux/fearures/auth/authSlice"



export const store = configureStore({
    reducer:{
        auth: authReducer
    }
})