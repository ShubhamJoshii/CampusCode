import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./reducer/userSlice";
import problemsSlice from "./reducer/problemsSlice";
import ProblemEditor from "./reducer/problemEditor";

const store = configureStore({
    reducer:{
        user : userSlice,
        problems: problemsSlice,
        problemEditorDetails:ProblemEditor
    }
})

export default store;