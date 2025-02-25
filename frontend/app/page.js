"use client";
import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const defaultCode = `fn main() {
    println!("Hello, Rust!");
}`;

export default function Home() {
    const [code, setCode] = useState(defaultCode);
    const [output, setOutput] = useState("");

    const runCode = async () => {
        const response = await fetch("http://localhost:8000/api/compile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
        });
        const data = await response.json();
        setOutput(data.output);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Rust Code Editor</h1>

            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4 mb-6">
                <Editor
                    height="400px"
                    defaultLanguage="rust"
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    theme="vs-dark"
                />
            </div>

            <div className="flex flex-col items-center w-full max-w-4xl">
                <button
                    onClick={runCode}
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all mb-4"
                >
                    Run Code
                </button>

                <div className="w-full bg-gray-800 text-white p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Output:</h2>
                    <pre className="whitespace-pre-wrap break-words">{output}</pre>
                </div>
            </div>
        </div>
    );
}
