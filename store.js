import { configureStore } from "@reduxjs/toolkit"
import applicatorsReducer from "./data/slices/applicatorsSlice"
import userReducer from "./data/slices/userSlice"
import themeReducer from "./data/slices/themeSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        applicators: applicatorsReducer,
        theme: themeReducer,
    },
})
