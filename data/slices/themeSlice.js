import { createSlice } from "@reduxjs/toolkit"
import { LIGHT, DARK } from "../../styles/themes"

const initialState = {
    theme: LIGHT,
}

export const themesSlice = createSlice({
    name: "themes",
    initialState,
    reducers: {
        switchTheme: (state, action) => {
            // For some reason this does not seem to work
            if (state.theme === LIGHT) state.theme = DARK
            else state.theme = LIGHT
        },
    },
})

export const { switchTheme } = themesSlice.actions

export const selectTheme = (state) => state.theme

export default themesSlice.reducer
