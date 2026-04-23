import { useState } from "react";
import Editor from "@monaco-editor/react";
import "./ProblemEditor.css";

function ProblemEditor() {
    const [activeTab, setActiveTab] = useState("description");

    return (
        <div className="mainContent hide-scrollbar ProblemEditor">

            {/* Top Bar */}
            <div className="topbar">
                <h1>Problem List</h1>

                <div className="buttons">
                    <button className="run-btn">Run</button>
                    <button className="submit-btn">Submit</button>
                </div>
            </div>

            {/* Main */}
            <div className="main">

                {/* LEFT */}
                <div className="left">

                    <div className="tabs">
                        <button onClick={() => setActiveTab("description")}>
                            Description
                        </button>
                        <button onClick={() => setActiveTab("editorial")}>
                            Editorial
                        </button>
                        <button onClick={() => setActiveTab("solutions")}>
                            Solutions
                        </button>
                    </div>

                    <div className="content">
                        {activeTab === "description" && (
                            <>
                                <h2>1. Two Sum</h2>
                                <p>
                                    Given an array of integers <b>nums</b> and an integer <b>target</b>, return indices of the two numbers such that they add up to target.
                                </p>
                                <h3>Example:</h3>
                                <p className="code-box">
                                    Input: nums = [2,7,11,15], target = 9 <br /> Output: [0,1]
                                </p>
                            </>
                        )}

                        {activeTab === "editorial" && <p>Editorial content here...</p>}
                        {activeTab === "solutions" && <p>Solutions here...</p>}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="right">

                    <div className="code-header">
                        <span>Code</span>
                        <select className="dropdown">
                            <option>Java</option>
                            <option>Python</option>
                        </select>
                    </div>

                    <div style={{ flex: 1 }}>
                        <Editor
                            height="100%"
                            defaultLanguage="java"
                            defaultValue={`class Solution {
    public int[] twoSum(int[] nums, int target) {
    
    }
}`}
                        />
                    </div>

                    <div className="testcase">
                        <p>Testcase</p>
                        <p>You must run your code first</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProblemEditor;