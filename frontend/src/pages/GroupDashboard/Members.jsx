import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination/Pagination";
import "./members.css"
import React, { useEffect, useState } from "react";
import { changeLimitMembers, changePageMembers } from "../../redux/reducer/groupSlice";

const groups = ["All", "Frontend", "Backend", "AI"];

const MembersList = () => {
    const [activeGroup, setActiveGroup] = useState("All");
    const [search, setSearch] = useState("");
    const { membersDetails, pageMembers, limitMembers, totalPagesMembers, totalMembers } = useSelector(state => state.groups);
    const dispatch = useDispatch();

    const changePagination = (page) => {
        dispatch(changePageMembers(page));
    }

    const changePaginationLimit = (count) => {
        dispatch(changeLimitMembers(count));
    }
    return (
        <div className="members-container">
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search members..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />
                <p>Total Members {totalMembers}</p>
            </div>

            {/* MEMBERS LIST */}
            <div className="members-list">
                {membersDetails?.map((curr, index) => (
                    <div key={index} className="member-row">
                        <span className="name">
                            {(index + 1) + ((pageMembers - 1) * limitMembers)}. {curr.firstName} {curr.lastName}
                        </span>

                        {
                            curr?.role == "admin" &&
                            <div className="roleAdmin">
                                    {curr?.role}
                            </div>
                        }
                    </div>
                ))}
            </div>

            {/* FOOTER */}
            <div className="footer">
                <Pagination totalPages={totalPagesMembers} initialPage={pageMembers} limit={limitMembers} changePagination={changePagination} changePaginationLimit={changePaginationLimit} />
            </div>
        </div>
    );
};

export default MembersList;