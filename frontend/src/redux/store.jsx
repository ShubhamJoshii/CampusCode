import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./reducer/userSlice";
import problemsSlice from "./reducer/problemsSlice";
import ProblemEditor from "./reducer/problemEditorSlice";
import progress from "./reducer/progressSlice";

const store = configureStore({
    reducer:{
        user : userSlice,
        problems: problemsSlice,
        problemEditorDetails:ProblemEditor,
        progress:progress,
    }
})

export default store;