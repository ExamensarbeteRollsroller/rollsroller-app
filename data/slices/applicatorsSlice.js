import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    applicators: null,
}

export const applicatorsSlice = createSlice({
    name: "applicators",
    initialState,
    reducers: {
        setApplicators: (state, action) => {
            state.applicators = action.payload
        },
    },
})

export const { setApplicators } = applicatorsSlice.actions

export const selectApplicators = (state) => state.applicators.applicators

export default applicatorsSlice.reducer
