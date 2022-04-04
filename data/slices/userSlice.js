import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: null,
    fname: null,
    lname: null,
    company: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setFname: (state, action) => {
            state.fname = action.payload
        },
        setLname: (state, action) => {
            state.fname = action.payload
        },
        setCompany: (state, action) => {
            state.company = action.payload
        },
    },
})

export const { setEmail, setFname, setLname, setCompany } = userSlice.actions

export const selectEmail = (state) => state.user.email
export const selectFname = (state) => state.user.fname
export const selectLname = (state) => state.user.lname
export const selectCompany = (state) => state.user.company

export default userSlice.reducer
