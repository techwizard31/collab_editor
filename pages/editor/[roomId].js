// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import io from "socket.io-client";
// import Editor from "@monaco-editor/react";

// const socket = io("http://localhost:3001");

// export default function EditorPage() {
//     const router = useRouter();
//     const { roomId, username } = router.query;
//     const [code, setCode] = useState("");
//     const [users, setUsers] = useState([]);
//     const [language, setLanguage] = useState("javascript");

//     useEffect(() => {
//         if (!roomId || !username) return;
//         socket.emit("join-room", { roomId, username });

//         socket.on("update-code", (newCode) => setCode(newCode));
//         socket.on("room-users", (roomUsers) => setUsers(roomUsers));

//         return () => socket.disconnect();
//     }, [roomId, username]);

//     return (
//         <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
//             <h2 className="text-lg font-bold">Room ID: {roomId}</h2>
//             <h3 className="text-md mb-2">Users: {users.join(", ")}</h3>
//             <select className="mb-2 p-2 bg-gray-700 text-white rounded" value={language} onChange={(e) => setLanguage(e.target.value)}>
//                 <option value="javascript">JavaScript</option>
//                 <option value="python">Python</option>
//                 <option value="cpp">C++</option>
//                 <option value="java">Java</option>
//             </select>
//             <Editor
//                 height="80vh"
//                 theme="vs-dark"
//                 language={language}
//                 value={code}
//                 onChange={(newCode) => {
//                     setCode(newCode);
//                     socket.emit("code-changed", { roomId, code: newCode });
//                 }}
//             />
//         </div>
//     );
// }


// collab_editor/pages/editor/[roomId].js

// collab_editor/pages/editor/[roomId].js

// collab_editor/pages/editor/[roomId].js

// collab_editor/pages/editor/[roomId].js

// collab_editor/pages/editor/[roomId].js

// collab_editor/pages/editor/[roomId].js

// collab_editor/pages/editor/[roomId].js

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Editor from "@monaco-editor/react";
import { Copy } from "lucide-react";

const socket = io("http://localhost:3001");

export default function EditorPage() {
    const router = useRouter();
    const { roomId, username } = router.query;
    const [code, setCode] = useState("");
    const [users, setUsers] = useState([]);
    const [language, setLanguage] = useState("javascript");
    const [theme, setTheme] = useState("vs-dark");
    const [activeSection, setActiveSection] = useState("roomInfo");

    useEffect(() => {
        if (!roomId || !username) return;
        socket.emit("join-room", { roomId, username });

        socket.on("update-code", (newCode) => setCode(newCode));
        socket.on("room-users", (roomUsers) => setUsers(roomUsers));

        return () => socket.disconnect();
    }, [roomId, username]);

    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
        alert("Room ID copied to clipboard!");
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white"> {/* Added h-screen for full height */}
            {/* Sidebar Navigation */}
            <div className="w-1/5 p-6 bg-gray-800 shadow-2xl flex flex-col"> {/* Removed rounded-r-lg */}
                <nav className="space-y-2">
                    <button
                        className={`w-full p-3 rounded-lg text-left ${activeSection === "roomInfo" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                        onClick={() => setActiveSection("roomInfo")}
                    >
                        Room Info
                    </button>
                    <button
                        className={`w-full p-3 rounded-lg text-left ${activeSection === "participants" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                        onClick={() => setActiveSection("participants")}
                    >
                        Participants
                    </button>
                    <button
                        className={`w-full p-3 rounded-lg text-left ${activeSection === "settings" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                        onClick={() => setActiveSection("settings")}
                    >
                        Settings
                    </button>
                </nav>

                <div className="mt-4">
                    {activeSection === "roomInfo" && (
                        <div className="space-y-4">
                            <div className="relative transform-style-3d perspective-1000">
                                <h2 className="text-lg font-bold">Username</h2>
                                <span className="text-sm text-gray-300 bg-gray-600 px-2 py-1 rounded-lg shadow-md transform-3d rotate-x-10 hover:rotate-x-0 transition-transform duration-300">
                                    {username}
                                </span>
                            </div>
                            <div className="relative transform-style-3d perspective-1000">
                                <h2 className="text-lg font-bold">Room ID</h2>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-300 bg-gray-600 px-2 py-1 rounded-lg shadow-md transform-3d rotate-y-10 hover:rotate-y-0 transition-transform duration-300">
                                        {roomId}
                                    </span>
                                    <button onClick={copyRoomId} className="p-2 bg-blue-500 rounded-full hover:bg-blue-400 transition">
                                        <Copy size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === "participants" && (
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold mb-3">Participants</h3>
                            {users.map((user, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-center font-semibold shadow-lg transform hover:scale-105 transition">
                                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-md text-white">{user}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeSection === "settings" && (
                        <div className="mt-6">
                            <label className="block text-sm mb-2">Language:</label>
                            <select
                                className="w-full p-2 rounded bg-gray-700 text-white shadow-md"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                                <option value="cpp">C++</option>
                                <option value="java">Java</option>
                            </select>
                            <button
                                className="w-full mt-4 p-2 bg-blue-500 rounded-lg hover:bg-blue-600 shadow-lg transform hover:scale-105 transition"
                                onClick={() => setTheme(theme === "vs-dark" ? "light" : "vs-dark")}
                            >
                                Toggle Theme
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Editor Section (Right Side) */}
            <div className="w-4/5 p-6">
                <Editor
                    height="85vh"
                    width="100%"
                    language={language}
                    theme={theme}
                    value={code}
                    onChange={(newCode) => {
                        setCode(newCode);
                        socket.emit("code-changed", { roomId, code: newCode });
                    }}
                />
            </div>
        </div>
    );
}

