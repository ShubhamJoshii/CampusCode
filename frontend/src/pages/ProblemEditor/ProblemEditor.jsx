import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import "./ProblemEditor.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProblemDetails } from "../../redux/reducer/problemEditor";
import Loading from "../Loading";
import { RestrictUser } from "../../CheckAuth";

function ProblemEditor() {
    const [activeTab, setActiveTab] = useState("description");
    const { _id } = useParams();
    const { problemDetails, status } = useSelector((state) => state.problemEditorDetails);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProblemDetails(_id))
        console.log(_id);
    }, [])

    useEffect(() => {
        console.log(problemDetails);
    }, [problemDetails])

    if (status == "loading") {
        return <Loading style="flex-1 !h-[100%] bg-white" />
    }
    return (
        <div className="mainContent hide-scrollbar ProblemEditor relative ">
            <RestrictUser text="Problem question" style="flex-1 !h-[100%] bg-white" />
            <div className="topbar">
                <h1>1. {problemDetails?.title}</h1>
                <div className="buttons">
                    <button className="run-btn">Run</button>
                    <button className="submit-btn">Submit</button>
                </div>
            </div>
            <div className="main">
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
                                {/* <h2>1. {problemDetails?.title}</h2> */}
                                <p>{problemDetails?.description}</p>
                                <h3>Test Cases:</h3>
                                {
                                    problemDetails?.testCases?.map((curr, id) => {
                                        return <>
                                            <p className="code-box">
                                                Input: {curr.input}<br />
                                                Output: {curr.output}
                                            </p>
                                        </>

                                    })
                                }
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