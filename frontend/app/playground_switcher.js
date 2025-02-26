import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export default function PlaygroundSwitcher({ code, setCode }) {
    const [playgrounds, setPlaygrounds] = useState([
        { id: 1, code: `fn main() {\n    println!("Hello, Rust!");\n}` },
    ]);
    const [currentPlayground, setCurrentPlayground] = useState(playgrounds[0]);

    const switchPlayground = (id) => {
        setPlaygrounds(playgrounds.map(pg =>
            pg.id === currentPlayground.id ? { ...pg, code } : pg
        ));
        const selectedPlayground = playgrounds.find((pg) => pg.id === id);
        setCurrentPlayground(selectedPlayground);
        setCode(selectedPlayground.code);
    };

    const addPlayground = () => {
        const newPlayground = {
            id: playgrounds.length + 1,
            code: `fn main() {\n    println!("Hello, Rust!");\n}`,
        };
        setPlaygrounds([...playgrounds, newPlayground]);
        setCurrentPlayground(newPlayground);
        setCode(newPlayground.code);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-orange-200 p-2">
            <div className="flex space-x-2 mb-2">
                {playgrounds.map((pg) => (
                    <button
                        key={pg.id}
                        onClick={() => switchPlayground(pg.id)}
                        className={`px-2 py-1 ${
                            currentPlayground.id === pg.id ? "bg-gray-300" : "bg-gray-100"
                        } text-black font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition-all`}
                    >
                        Playground {pg.id}
                    </button>
                ))}
            </div>

            <button
                onClick={addPlayground}
                className="px-4 py-2 bg-gray-100 text-black font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition-all"
            >
                Add Playground
            </button>
        </div>
    );
}