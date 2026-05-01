import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import "./ProblemEditor.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCode, updateCustomInput, updateSelectLanguage } from "../../redux/reducer/problemEditorSlice";
import { RestrictUser } from "../../CheckAuth";

const defaultCodeLanugage = {
    "java": `class Solution {
    public int twoSum(int num1, int num2) {
        System.out.println("Hello World");
        return num1 + num2;
    }
}`,
    "cpp": `class Solution {
public:
    int twoSum(int num1, int num2) {
        cout << "Hello World!";
        return num1 + num2;   
    }
};`
}



const WritterScreen = () => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);


    const editorRef = useRef(null);
    const monacoRef = useRef(null);


    const { code, currentLanguage, problemDetails, output, result } = useSelector(state => state.problemEditorDetails);
    const dispatch = useDispatch();

    // Mount editor
    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
        monacoRef.current = monaco;
    }

    // Simple validation
    const validateCode = (code) => {
        const editor = editorRef.current;
        const monaco = monacoRef.current;

        if (!editor || !monaco) return;

        const model = editor.getModel();
        const markers = [];

        if (!code.includes("class")) {
            markers.push({
                startLineNumber: 1,
                startColumn: 1,
                endLineNumber: 1,
                endColumn: 10,
                message: "Missing class keyword",
                severity: monaco.MarkerSeverity.Error,
            });
        }

        if (code.includes("int[]") && !code.includes("return")) {
            markers.push({
                startLineNumber: 3,
                startColumn: 1,
                endLineNumber: 3,
                endColumn: 20,
                message: "Missing return statement",
                severity: monaco.MarkerSeverity.Warning,
            });
        }

        monaco.editor.setModelMarkers(model, "owner", markers);
    };

    return (
        <div className="writtenScreen">
            <RestrictUser text="You need to be logged in to run code and submit solutions." style="flex-1 relative !h-[100%] bg-white" >
                <div className="code-header">
                    <span>Code</span>

                    <select
                        value={currentLanguage}
                        onChange={(e) => {
                            dispatch(updateSelectLanguage(e.target.value))
                            // dispatch(updateCode())
                        }}
                    >
                        <option value={"cpp"}>C++</option>
                        <option value={"java"}>Java</option>
                    </select>

                </div>

                {/* Editor */}
                <div style={{ height: "400px" }}>
                    <Editor
                        height="100%"
                        language={currentLanguage}
                        value={code[currentLanguage]?.text}
                        theme="vs"
                        onMount={handleEditorDidMount}
                        onChange={(value) => {
                            dispatch(updateCode(value || ""));
                            validateCode(value || "");
                        }}
                    />
                </div>


                <div className="space-y-4">
                    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        {
                            result?.error &&
                            <div>
                                <div
                                    className={`mb-3 rounded-md border p-3 text-sm font-semibold shadow-sm ${result?.success
                                        ? "border-green-600 bg-green-50 text-green-800"
                                        : "border-red-600 bg-red-50 text-red-800"
                                        }`}
                                >
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="font-semibold">Output</span>

                                        <span
                                            className={`text-xs font-medium px-2 py-0.5 rounded ${result?.success
                                                ? "bg-green-200 text-green-900"
                                                : "bg-red-200 text-red-900"
                                                }`}
                                        >
                                            {result?.success ? "Passed" : "Failed"}
                                        </span>
                                    </div>

                                    <pre className="mt-1 overflow-x-auto rounded bg-white/80 p-3 text-xs font-mono text-gray-800">
                                        {result?.error}
                                    </pre>
                                </div>
                            </div>
                        }
                        {(result?.length > 0 && result[0]) && (
                            <>
                                <div className="flex flex-wrap gap-2">
                                    {result.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveIndex(idx)}
                                            className={`rounded-full px-4 py-1 text-sm font-medium transition cursor-pointer ${activeIndex === idx
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                                }`}
                                        >
                                            Test {idx + 1}
                                        </button>
                                    ))}
                                </div>

                                {/* Input */}
                                <div className="text-sm font-semibold text-gray-700">
                                    Input
                                    <pre className="mt-1 overflow-x-auto rounded bg-gray-100 p-3 text-xs font-mono text-gray-800">
                                        {result[activeIndex].input}
                                    </pre>
                                </div>

                                {/* Expected */}
                                <div className="text-sm font-semibold text-gray-700">
                                    Expected
                                    <pre className="mt-1 overflow-x-auto rounded bg-gray-100 p-3 text-xs font-mono text-gray-800">
                                        {/* {result[activeIndex]?.expected?.join(" ")} */}
                                        {typeof result[activeIndex].expected === "string" ? result[activeIndex].expected : result[activeIndex].expected.join(" ")}
                                    </pre>
                                </div>

                                {/* Output (clean status badge instead of full background) */}
                                <div
                                    className={`mb-3 rounded-md border p-3 text-sm font-semibold shadow-sm ${result[activeIndex].passed
                                        ? "border-green-600 bg-green-50 text-green-800"
                                        : "border-red-600 bg-red-50 text-red-800"
                                        }`}
                                >
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="font-semibold">Output</span>

                                        <span
                                            className={`text-xs font-medium px-2 py-0.5 rounded ${result[activeIndex].passed
                                                ? "bg-green-200 text-green-900"
                                                : "bg-red-200 text-red-900"
                                                }`}
                                        >
                                            {result[activeIndex].passed ? "Passed" : "Failed"}
                                        </span>
                                    </div>

                                    <pre className="mt-1 overflow-x-auto rounded bg-white/80 p-3 text-xs font-mono text-gray-800">
                                        {typeof result[activeIndex].actual === "string" ? result[activeIndex].actual : result[activeIndex].actual.join(" ")}
                                    </pre>
                                </div>
                            </>

                        )}
                    </div>
                </div>

            </RestrictUser>
        </div>

    );
};

export default WritterScreen;