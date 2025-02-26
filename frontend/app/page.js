"use client";
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import PlaygroundSwitcher from "@/app/playground_switcher";

const starterCode = `fn main() {
    println!("Hello, Rust!");
}`;

export default function Home() {
    const [code, setCode] = useState(starterCode);
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-orange-200 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Rust Sandbox</h1>

            <div className="w-full max-w-4xl bg-gray-100 shadow-lg rounded-lg p-4 mb-6">
                <Editor
                    height="400px"
                    defaultLanguage="rust"
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    theme="vs-dark"
                />
            </div>

            <PlaygroundSwitcher code={code} setCode={setCode} />

            <div className="flex flex-col items-center w-full max-w-4xl mt-4">
                <button
                    onClick={runCode}
                    className="px-6 py-3 bg-gray-100 text-black font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition-all mb-4"
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