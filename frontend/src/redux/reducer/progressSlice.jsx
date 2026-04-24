import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Updated to accept an 'args' object containing pageNo, limit, difficulty, etc.
export const fetchSubmissions = createAsyncThunk(
    "progress/submission",
    async (args = {}, thunkAPI) => {
        try {
            const response = await axios.get(`/api/submission`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

const progressSlice = createSlice({
    name: "progress",
    initialState: {
        submissions: [],
        status: "idle",
        error: null,
        totalSolved:0,
        categoryBreakdown: [],
        heatmapData:[],
        streak:0,
        totalQuestion:1,
        difficultyStats: [
            {
                label: "Easy",
                solved: 0,
                total: 16,
                color: "#22c55e",
            },
            {
                label: "Medium",
                solved: 0,
                total: 12,
                color: "#eab308",
            },
            {
                label: "Hard",
                solved: 0,
                total: 10,
                color: "#ef4444",
            },
        ]
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubmissions.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchSubmissions.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.submissions = action.payload.data;
                state.categoryBreakdown = action.payload.categoryBreakdown;
                state.difficultyStats = action.payload.difficultyStats;
                state.totalSolved = action.payload.totalSolved;
                state.heatmapData = action.payload.heatmapData || [];
                state.streak = action.payload.streak || 0;
                state.totalQuestion = action.payload.totalQuestion || 0;
                state.error = null;
            })
            .addCase(fetchSubmissions.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.message || "Failed to fetch problems";
            });
    }
});


export default progressSlice.reducer;