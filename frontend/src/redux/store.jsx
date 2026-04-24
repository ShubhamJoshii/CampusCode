import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./reducer/userSlice";
import problemsSlice from "./reducer/problemsSlice";
import ProblemEditorSlice from "./reducer/problemEditorSlice";
import progressSlice from "./reducer/progressSlice";
import leaderboardSlice from "./reducer/leaderBoardSlice";

const store = configureStore({
    reducer:{
        user : userSlice,
        problems: problemsSlice,
        problemEditorDetails:ProblemEditorSlice,
        progress:progressSlice,
        leaderboard:leaderboardSlice
    }
})

export default store;