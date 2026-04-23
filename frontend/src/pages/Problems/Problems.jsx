import React, { useEffect, useState } from 'react'
import ProblemList from './ProblemList';
import { useDispatch, useSelector } from 'react-redux';

import "./Problems.css"
import { fetchProblems, searchProblems } from '../../redux/reducer/problemsSlice';
import Loading from '../Loading';

const Problems = () => {
    const [search, setSearch] = useState("");
    const [solvedProblems, setSolvedProblems] = useState([]);

    const { problemsList, pageNo, limit, difficulty, tag } = useSelector((state) => state.problems)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProblems());
    }, [pageNo, limit, difficulty, tag]);

    useEffect(() => {
        dispatch(searchProblems(search));
    }, [search]);
    
    return (
        <div className="mainContent hide-scrollbar">
            <div className="controls">
                <input
                    type="text"
                    placeholder="Search problems..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="searchInput"
                />

                <select
                    // onChange={() => ()}
                    // onChange={(e) => (setDifficulty(e.target.value))}
                    className="difficultySelect"
                >
                    <option value="">All Difficulty</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>
            </div>

            <div className="problemContainer">
                <ProblemList
                    solvedProblems={solvedProblems}
                    setSolvedProblems={setSolvedProblems}
                />
            </div>
        </div>
    );
}


export default Problems;