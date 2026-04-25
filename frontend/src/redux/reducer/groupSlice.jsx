import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGroups = createAsyncThunk(
    "groups/fetchGroups",
    async (args = {}, thunkAPI) => {
        try {
            const response = await axios.get(`/api/groups`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

export const fetchGroupDetails = createAsyncThunk(
    "groups/fetchGroupDetails",
    async (args = {}, thunkAPI) => {
        console.log(args);
        try {
            const response = await axios.get(`/api/groupdetails/${args}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

export const createNewGroup = createAsyncThunk(
    "groups/createGroup",
    async (args = {}, thunkAPI) => {
        const state = thunkAPI.getState().groups;
        try {
            const response = await axios.post(`/api/creategroup`, {
                name: state.groupName
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

export const joinNewGroup = createAsyncThunk(
    "groups/joingroup",
    async (args = {}, thunkAPI) => {
        try {
            const response = await axios.post(`/api/joingroup`, {
                invitationCode: args
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

const groupSlice = createSlice({
    name: "groups",
    initialState: {
        groups: [],
        groupDetails: [],
        status: "idle",
        error: null,
        groupName: "",
        invitationCode: ""
    },
    reducers: {
        createGroupName(state, action) {
            state.groupName = action.payload;
        },
    },
    extraReducers: (builder) => {
        const handlePending = (state) => {
            state.status = "loading";
        };
        const handleRejected = (state, action) => {
            state.status = "failed";
            state.error = action.payload?.msg || "Failed to fetch";
        };
        builder
            .addCase(fetchGroups.pending, handlePending)
            .addCase(fetchGroups.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.groups = action.payload.data || [];
                state.error = null;
            })
            .addCase(fetchGroups.rejected, handleRejected)
            .addCase(createNewGroup.pending, handlePending)
            .addCase(createNewGroup.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.invitationCode = action.payload.invitationCode;
                state.error = null;
            })
            .addCase(createNewGroup.rejected, handleRejected)
            .addCase(fetchGroupDetails.pending, handlePending)
            .addCase(fetchGroupDetails.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.groupDetails = action.payload.data;
                state.error = null;
            })
            .addCase(fetchGroupDetails.rejected, handleRejected)
            .addCase(joinNewGroup.pending, handlePending)
            .addCase(joinNewGroup.fulfilled, (state, action) => {
                state.status = "succeeded";
                // state.groupDetails = action.payload.data;
                state.error = null;
            })
            .addCase(joinNewGroup.rejected, handleRejected);
    }
});


export default groupSlice.reducer;

export const { createGroupName} = groupSlice.actions;