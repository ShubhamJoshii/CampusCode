import { useEffect, useState } from "react";
import "./ProblemEditor.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProblemDetails, runCode } from "../../redux/reducer/problemEditorSlice";
import Loading from "../Loading";
import WritterScreen from "./WritterScreen";
import { checkAuth } from "../../CheckAuth";

function ProblemEditor() {
    const [activeTab, setActiveTab] = useState("description");
    const { _id } = useParams();
    const { problemDetails, status, code } = useSelector((state) => state.problemEditorDetails);
    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProblemDetails(_id))
    }, [])

    const handleRunCode = async () => {
        dispatch(runCode())
        // console.log(code);

    };

    const handleSubmitCode = async () => {

        console.log(code);

    };

    if (status == "loading") {
        return <Loading style="flex-1 !h-[100%] bg-white" />
    }
    return (
        <div className="mainContent hide-scrollbar ProblemEditor relative ">
            <div className="topbar">
                <h1>{problemDetails?.sno}. {problemDetails?.title}</h1>
                {
                    checkAuth(user) &&
                    <div className="buttons">
                        <button className="run-btn" onClick={handleRunCode}>Run</button>
                        <button className="submit-btn" onClick={handleSubmitCode}>Submit</button>
                    </div>
                }
            </div>
            <div className="main">
                <div className="left">
                    <div className="tabs">
                        <button className={`${activeTab == "description" ? "active" : ""} `} onClick={() => setActiveTab("description")}>
                            Description
                        </button>
                        <button className={`${activeTab == "editorial" ? "active" : ""} `} onClick={() => setActiveTab("editorial")}>
                            Editorial
                        </button>
                        <button className={`${activeTab == "solutions" ? "active" : ""} `} onClick={() => setActiveTab("solutions")}>
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
                                        return <p className="code-box" key={id}>
                                            Input: {curr.input}<br />
                                            Output: {curr.output}
                                        </p>
                                    })
                                }
                            </>
                        )}

                        {activeTab === "editorial" && <p>Editorial content here...</p>}
                        {activeTab === "solutions" && <p>Solutions here...</p>}
                    </div>
                </div>

                {/* RIGHT */}
                <WritterScreen />
            </div>


        </div>
    );
}

export default ProblemEditor;