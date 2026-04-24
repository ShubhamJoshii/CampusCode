import React, { useState, useRef } from 'react';
import { NavLink } from "react-router-dom";
import { problems } from '../../assets/Problem';
import { AlertTriangle, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../components/Pagination/Pagination';
import { changeLimit, changePage, changeTag } from '../../redux/reducer/problemsSlice';
import Loading from '../Loading';
import { CheckCircle, XCircle, Circle } from "lucide-react";

const getDiffStyle = (diff) => {
    switch (diff) {
        case 'Easy': return { bg: '#e7f3ef', text: '#00af9b' };
        case 'Medium': return { bg: '#fff7e6', text: '#ffb800' };
        case 'Hard': return { bg: '#fff1f0', text: '#ff2d55' };
        default: return { bg: '#f3f4f6', text: '#374151' };
    }
};

const statusIcon = {
    "Accepted": <CheckCircle className="text-green-500  w-3.5 h-3.5" />,
    "Wrong Answer": <XCircle className="text-red-500  w-3.5 h-3.5" />,
    "TLE": <Clock className="text-yellow-500  w-3.5 h-3.5" />,
    "Runtime Error": <AlertTriangle className="text-orange-500  w-3.5 h-3.5" />,
};



const ProblemList = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const scrollRef = useRef(null);

    const { problemsList, totalPages, attemptedProblemsCount, status, totalProblems, limit, pageNo, categories } = useSelector((state) => state.problems);
    const dispatch = useDispatch();

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: direction === 'left' ? -200 : 200, behavior: 'smooth' });
        }
    };

    const changePagination = (page) => {
        dispatch(changePage(page));
    }

    const changePaginationLimit = (count) => {
        dispatch(changeLimit(count));
    }

    const handleSelectCategory = (text) => {
        dispatch(changeTag(text));
        setSelectedCategory(text);
    }

    if (status == "loading") {
        return <Loading style="flex-1 !h-[100%] bg-white" />
    }

    return (
        <div className="problemListContainer">
            <div className="topicBar">
                <span className="topicTitle">Topics</span>
                <div className="topicScrollWrapper">
                    <button onClick={() => scroll('left')} className="scrollBtn">
                        <ChevronLeft size={18} color="#9ca3af" />
                    </button>

                    <div ref={scrollRef} className="topicScroll">
                        {categories.map((curr) => (
                            <button
                                key={curr}
                                onClick={() => handleSelectCategory(curr)}
                                className={`topicBtn ${selectedCategory === curr ? 'active' : ''}`}
                            >
                                {curr}
                            </button>
                        ))}
                    </div>

                    <button onClick={() => scroll('right')} className="scrollBtn">
                        <ChevronRight size={18} color="#9ca3af" />
                    </button>
                </div>
            </div>

            <div className="listBody">
                <div className="solvedText">
                    Solved: {attemptedProblemsCount} / {totalProblems}
                </div>

                <div className="problemBox">
                    {problemsList?.map((curr, id) => {
                        const diffClass = curr.difficulty;
                        // console.log(curr.attempt);

                        return (
                            <NavLink to={`/problems/${curr._id}`} key={curr._id} className="problemRow">
                                <div className="attemptIcon relative inline-block">
                                    {statusIcon[curr.attempt] || (
                                        <Circle className="text-gray-400 w-3.5 h-3.5" />
                                    )}

                                    <span className="tooltip">
                                        {curr.attempt == "TLE" ? "Time Limit Exceeded" : curr.attempt || "Not Attempted"}
                                    </span>
                                </div>

                                <div className="problemTitle">
                                    {(id + 1) + ((pageNo - 1) * limit)}. {curr.title}
                                </div>
                                <div className='listRight'>
                                    <span className={`difficultyTag ${diffClass}`}>
                                        {curr.difficulty}
                                    </span>
                                    <span className='categoryTag'>
                                        {curr.tags[0]}
                                    </span>
                                </div>
                            </NavLink>
                        );
                    })}
                </div>
                <Pagination totalPages={totalPages} initialPage={pageNo} limit={limit} changePagination={changePagination} changePaginationLimit={changePaginationLimit} />
            </div>
        </div>
    );
};

export default ProblemList;