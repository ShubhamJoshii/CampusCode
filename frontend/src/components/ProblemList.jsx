import React, { useState, useRef } from 'react';
import { problems } from '../assets/Problem'; // Matches your plural filename
import { ChevronLeft, ChevronRight } from 'lucide-react';

const getDiffStyle = (diff) => {
    switch (diff) {
        case 'Easy': return { bg: '#e7f3ef', text: '#00af9b' };
        case 'Medium': return { bg: '#fff7e6', text: '#ffb800' };
        case 'Hard': return { bg: '#fff1f0', text: '#ff2d55' };
        default: return { bg: '#f3f4f6', text: '#374151' };
    }
};

const ProblemList = ({ search, difficulty, solvedProblems, setSolvedProblems }) => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const scrollRef = useRef(null);

    const categories = ["All", "Array", "String", "DP", "Math", "Linked List", "Stack", "Backtracking", "Tree", "Binary Search", "Heap", "Hash Table", "Sorting", "Two Pointers", "Bit Manipulation", "Graph"];

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: direction === 'left' ? -200 : 200, behavior: 'smooth' });
        }
    };

    const handleSolve = (title) => {
        if (!solvedProblems.includes(title)) {
            setSolvedProblems([...solvedProblems, title]);
        } else {
            setSolvedProblems(solvedProblems.filter(t => t !== title));
        }
    };

    const filtered = problems.filter((p) => {
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
        const matchesDifficulty = difficulty === "" || p.difficulty === difficulty;
        const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
        return matchesSearch && matchesDifficulty && matchesCategory;
    });

    return (
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            {/* Integrated Topic Bar */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid #f3f4f6', gap: '15px' }}>
                <span style={{ fontWeight: '600', color: '#374151', fontSize: '14px' }}>Topics</span>
                <div style={{ display: 'flex', alignItems: 'center', flex: 1, overflow: 'hidden', position: 'relative' }}>
                    <button onClick={() => scroll('left')} style={{ background: 'white', border: 'none', cursor: 'pointer' }}><ChevronLeft size={18} color="#9ca3af" /></button>
                    <div ref={scrollRef} className="no-scrollbar" style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {categories.map((cat) => (
                            <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ whiteSpace: 'nowrap', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', border: 'none', backgroundColor: selectedCategory === cat ? '#1f2937' : '#f3f4f6', color: selectedCategory === cat ? 'white' : '#4b5563', cursor: 'pointer' }}>{cat}</button>
                        ))}
                    </div>
                    <button onClick={() => scroll('right')} style={{ background: 'white', border: 'none', cursor: 'pointer' }}><ChevronRight size={18} color="#9ca3af" /></button>
                </div>
            </div>

            {/* List Body */}
            <div style={{ padding: '0 20px' }}>
                <div style={{ margin: '12px 0', fontSize: '12px', color: '#9ca3af', textAlign: 'right' }}>Solved: {solvedProblems.length} / {problems.length}</div>
                <div style={{ border: '1px solid #f3f4f6', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px' }}>
                    {filtered.map((p, index) => {
                        const style = getDiffStyle(p.difficulty);
                        return (
                            <div key={p.id} style={{ display: 'flex', alignItems: 'center', padding: '12px 15px', backgroundColor: index % 2 === 0 ? 'white' : '#fafafa', borderBottom: '1px solid #f3f4f6' }}>
                                <div style={{ width: '30px', cursor: 'pointer' }} onClick={() => handleSolve(p.title)}>{solvedProblems.includes(p.title) ? '✔' : '○'}</div>
                                <div style={{ flex: 1, fontSize: '14px' }}>{p.id}. {p.title}</div>
                                <span style={{ width: '70px', textAlign: 'center', borderRadius: '4px', fontSize: '12px', backgroundColor: style.bg, color: style.text }}>{p.difficulty}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        </div>
    );
};

export default ProblemList;