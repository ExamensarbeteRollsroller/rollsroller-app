import { configureStore } from "@reduxjs/toolkit"
import applicatorsReducer from "./data/slices/applicatorsSlice"
import userReducer from "./data/slices/userSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        applicators: applicatorsReducer,
    },
})
