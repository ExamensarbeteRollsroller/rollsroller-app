import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./data/slices/userSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        // Add reducer for applicators
    },
})
