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
    const [language, setLanguage] = useState("java");
    const [code1, setCode] = useState(``);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const editorRef = useRef(null);
    const monacoRef = useRef(null);


    const { code } = useSelector(state => state.problemEditorDetails);
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

    // Run Code API call


    return (
        <div className="writtenScreen">
            <RestrictUser text="You need to be logged in to run code and submit solutions." style="flex-1 relative !h-[100%] bg-white" >
                <div className="code-header">
                    <span>Code</span>

                    <select
                        value={code.language}
                        onChange={(e) => {
                            dispatch(updateSelectLanguage(e.target.value))
                            dispatch(updateCode(defaultCodeLanugage[e.target.value]))
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
                        language={language}
                        value={code?.text}
                        theme="vs"
                        onMount={handleEditorDidMount}
                        onChange={(value) => {
                            dispatch(updateCode(value || ""));
                            validateCode(value || "");
                        }}
                    />
                </div>

                {/* Input */}
                <div className="input-box">
                    <p>Custom Input</p>
                    <textarea
                        value={code?.input}
                        onChange={(e) => dispatch(updateCustomInput(e.target.value))}
                        placeholder="Enter input here..."
                    />
                </div>

                {/* Output */}
                <div className="output-box">
                    <p>Output</p>
                    <pre>{code?.output}</pre>
                </div>

            </RestrictUser>
        </div>

    );
};

export default WritterScreen;