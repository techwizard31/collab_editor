// import { useEffect, useState } from "react";
// import { initSocket } from "../utils/socket";
// import "codemirror/keymap/sublime";
// import "codemirror/theme/dracula.css";
// import { UnControlled as CodeMirror } from "react-codemirror2";

// export default function EditorPage({ roomId, username }) {
//   const [socket, setSocket] = useState(null);
//   const [code, setCode] = useState("// Start coding...");
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     if (!roomId || !username) return;

//     const socketInstance = initSocket();
//     socketInstance.emit("join", { roomId, username });
//     setSocket(socketInstance);

//     socketInstance.on("code-change", ({ code }) => {
//       setCode(code);
//     });

//     socketInstance.on("user-list", (userList) => {
//       setUsers(userList);
//     });

//     return () => socketInstance.disconnect();
//   }, [roomId, username]);

//   const handleCodeChange = (editor, data, value) => {
//     setCode(value);
//     if (socket) socket.emit("code-change", { roomId, code: value });
//   };

//   return (
//     <div className="editor-container">
//       <div className="room-info">
//         <h2>Room ID: {roomId}</h2>
//         <h3>Users:</h3>
//         <ul>
//           {users.map((user, index) => (
//             <li key={index}>{user}</li>
//           ))} 
//         </ul>
//       </div>
//       <CodeMirror
//         value={code}
//         options={{ mode: "javascript", theme: "dracula", lineNumbers: true }}
//         onChange={handleCodeChange}
//       />
//     </div>
//   );
// }
// import { useState } from "react";
// import { dracula } from "@uiw/codemirror-theme-dracula";
// import { javascript } from "@codemirror/lang-javascript";
// import CodeMirror from "@uiw/react-codemirror";

// export default function EditorPage({ roomId, username }) {
//     const [code, setCode] = useState("// Write your code here...");

//     return (
//         <div className="editor-container" style={{ padding: "20px", background: "#282a36", height: "100vh" }}>
//             <h2 style={{ color: "#f8f8f2" }}>Collaborative Editor - Room: {roomId}</h2>
//             <p style={{ color: "#bd93f9" }}>User: {username}</p>
//             <CodeMirror
//                 value={code}
//                 height="500px"
//                 theme={dracula}
//                 extensions={[javascript()]}
//                 onChange={(value) => setCode(value)}
//             />
//         </div>
//     );
// }



// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { initSocket } from "../utils/socket";
// import { dracula } from "@uiw/codemirror-theme-dracula";
// import { javascript } from "@codemirror/lang-javascript";
// import CodeMirror from "@uiw/react-codemirror";

// export default function EditorPage() {
//     const router = useRouter();
//     const { roomId } = router.query;

//     const [socket, setSocket] = useState(null);
//     const [code, setCode] = useState("// Start coding here...");

//     useEffect(() => {
//         if (!roomId) return;

//         const newSocket = initSocket();
//         newSocket.emit("join-room", roomId);

//         newSocket.on("receive-code", (newCode) => {
//             setCode(newCode);
//         });

//         setSocket(newSocket);

//         return () => {
//             newSocket.disconnect();
//         };
//     }, [roomId]);

//     const handleChange = (newCode) => {
//         setCode(newCode);
//         if (socket) {
//             socket.emit("code-change", { roomId, code: newCode });
//         }
//     };

//     return (
//         <div className="editor-container">
//             <h2>Room ID: {roomId}</h2>
//             <CodeMirror
//                 value={code}
//                 height="500px"
//                 width="1000px"
//                 theme={dracula}
//                 extensions={[javascript()]}
//                 onChange={handleChange}
//             />
//         </div>
//     );
// }



// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import { dracula } from "@uiw/codemirror-theme-dracula";
// import CodeMirror from "@uiw/react-codemirror";
// import { javascript } from "@codemirror/lang-javascript";

// const socket = io('http://localhost:3000'); 

// export default function EditorPage({ roomId, username }) {
//   const [code, setCode] = useState("");
//   const [collaborators, setCollaborators] = useState([]);

//   useEffect(() => {
//     if (!roomId || !username) return;

//     socket.emit("join-room", { roomId, username });

//     socket.on("load-code", (existingCode) => {
//       setCode(existingCode);
//     });

//     socket.on("code-update", (newCode) => {
//       setCode(newCode);
//     });

//     socket.on("user-list", (users) => {
//       setCollaborators(users);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [roomId, username]);

//   const handleCodeChange = (newCode) => {
//     setCode(newCode);
//     socket.emit("code-change", { roomId, code: newCode });
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar for Collaborators */}
//       <div className="w-1/4 bg-gray-100 p-4">
//         <h2 className="text-xl font-bold mb-4">Collaborators</h2>
//         {collaborators.map((user) => (
//           <div key={user.id} className="flex items-center space-x-3 mb-2">
//             <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
//             <span className="font-medium">{user.username}</span>
//           </div>
//         ))}
//       </div>

//       {/* Code Editor */}
//       <div className="flex-1 p-6">
//         <h1 className="text-2xl font-bold">Collaborative Code Editor</h1>
//         <p className="text-gray-500">Write and share code in real-time with your team</p>

//         <div className="mt-4">
//           <CodeMirror
//             value={code}
//             height="500px"
//             theme={dracula}
//             extensions={[javascript()]}
//             onChange={handleCodeChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3001"); // Connect to WebSocket server

// export default function Editor() {
//   const [code, setCode] = useState("");

//   useEffect(() => {
//     // Listen for code updates from the server
//     socket.on("codeUpdate", (newCode) => {
//       setCode(newCode);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const handleCodeChange = (e) => {
//     const newCode = e.target.value;
//     setCode(newCode);
//     socket.emit("codeChange", newCode); // Send new code to server
//   };

//   return (
//     <textarea
//       value={code}
//       onChange={handleCodeChange}
//       placeholder="Write your code here..."
//       style={{ width: "100%", height: "300px" }}
//     />
//   );
// }
import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";

export default function Editor({ code, onChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    editorRef.current = monaco.editor.create(document.getElementById("editor"), {
      value: code,
      language: "javascript",
      theme: "vs-dark"
    });

    editorRef.current.onDidChangeModelContent(() => {
      onChange(editorRef.current.getValue());
    });

    return () => editorRef.current.dispose();
  }, [code, onChange]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setValue(code);
    }
  }, [code]);

  return <div id="editor" style={{ height: "80vh" }}></div>;
}
