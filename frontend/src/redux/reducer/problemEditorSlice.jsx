import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Updated to accept an 'args' object containing pageNo, limit, difficulty, etc.
export const fetchProblemDetails = createAsyncThunk(
    "problemEditor/problemDetails",
    async (args = {}, thunkAPI) => {
        try {
            const response = await axios.get(`/api/problemDetails/${args}`);
            // console.log(response.data);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

const problemEditorSlice = createSlice({
    name: "problemEditor",
    initialState: {
        problemDetails: {},
        staus: "idle",
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProblemDetails.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProblemDetails.fulfilled, (state, action) => {
                state.status = "succeeded";
                
                state.problemDetails = action.payload;
                state.error = null;
            })
            .addCase(fetchProblemDetails.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.message || "Failed to fetch problems";
            });
    }
});

export default problemEditorSlice.reducer;