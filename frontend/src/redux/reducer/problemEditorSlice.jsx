import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

export const runCode = createAsyncThunk(
    "problemEditor/runCode",
    async (args = {}, thunkAPI) => {
        try {
            const state = thunkAPI.getState().problemEditorDetails;
            console.log(state.code);
            const response = await axios.post(`/api/runcode`, {
                code: state.code.text || "",
                language: state.code.language || "das",
                input: state.code.input || 0
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

const problemEditorSlice = createSlice({
    name: "problemEditor",
    initialState: {
        problemDetails: {},
        code: {
            "java": {
                input: "",
                language: "java",
                output: "",
                text: ""
            },
            "cpp": {
                input: "",
                language: "java",
                output: "",
                text: ""
            }
        },
        //     code: {
        //         input: "",
        //         language: "java",
        //         output: "",
        //         text: `class Solution {
        // public int twoSum(int num1, int num2) {
        //     System.out.println("Hello World");
        //     return num1 + num2;
        // }
        status: "idle",
        error: null,
    },
    reducers: {
        updateCode(state, action) {
            state.code.text = action.payload;
        },
        updateCustomInput(state, action) {
            state.code.input = action.payload;
        },
        updateSelectLanguage(state, action) {
            state.code.language = action.payload;
            // state.code
        },
    },
    extraReducers: (builder) => {
        const handlePending = (state) => {
            state.status = "loading";
        };
        const handleRejected = (state, action) => {
            state.status = "failed";
            state.error = action.payload?.msg || "Failed to fetch problems";
        };

        builder
            .addCase(fetchProblemDetails.pending, handlePending)
            .addCase(fetchProblemDetails.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.problemDetails = action.payload;
                // console.log(action.payload.defaultCode);

                const serverResponse = action.payload.defaultCode || {};

                const formatted = Object.fromEntries(
                    Object.entries(serverResponse).map(([serverKey, code]) => {

                        const normalizeLang = (key) => {
                            const map = {
                                c: "cpp",
                                cpp: "cpp",
                                java: "java",
                                js: "javascript",
                                javascript: "javascript",
                                py: "python",
                                python: "python"
                            };
                            return map[key] || key;
                        };

                        const lang = normalizeLang(serverKey);

                        return [
                            lang,
                            {
                                input: "",
                                language: lang,
                                output: "",
                                text: code || ""
                            }
                        ];
                    })
                );

                state.code = formatted;

                state.error = null;
            })
            .addCase(fetchProblemDetails.rejected, handleRejected)
            .addCase(runCode.pending, (state) => {
                state.status = "loadingRun";
            })
            .addCase(runCode.fulfilled, (state, action) => {
                state.status = "succeeded";
                console.log(action.payload);
                state.code.output = action.payload.output || action.payload.error;
                state.error = null;
            })
            .addCase(runCode.rejected, handleRejected);
    }
});

export default problemEditorSlice.reducer;
export const { updateCode, updateCustomInput, updateSelectLanguage } = problemEditorSlice.actions;