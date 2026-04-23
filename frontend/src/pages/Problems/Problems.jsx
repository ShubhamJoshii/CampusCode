import React, { useEffect, useState } from 'react'
import ProblemList from '../../components/ProblemList';

const Problems = () => {
    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [solvedProblems, setSolvedProblems] = useState(
        JSON.parse(localStorage.getItem("solved_problems")) || []
    );

    // Sync state to LocalStorage whenever solvedProblems updates
    useEffect(() => {
        localStorage.setItem("solved_problems", JSON.stringify(solvedProblems));
    }, [solvedProblems]);

    return (
        <div className="mainContent hide-scrollbar" style={{ backgroundColor: "#f9fafb" }}>
            <div className="controls" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Search problems..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        flex: 1,
                        outline: 'none'
                    }}
                />

                <select
                    onChange={(e) => setDifficulty(e.target.value)}
                    style={{
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        backgroundColor: 'white'
                    }}
                >
                    <option value="">All Difficulty</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb'}}>
                <ProblemList
                    search={search}
                    difficulty={difficulty}
                    solvedProblems={solvedProblems}
                    setSolvedProblems={setSolvedProblems}
                />
            </div>
        </div>
    )
}


export default Problems;