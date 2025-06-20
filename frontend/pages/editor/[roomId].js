"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Editor from "@monaco-editor/react";
import { Copy } from "lucide-react";
import { toast, Slide } from "react-toastify";

const socket = io("http://localhost:4000");

export default function EditorPage() {
  const router = useRouter();
  const { roomId, username } = router.query;
  const [code, setCode] = useState("");
  const [users, setUsers] = useState([]);
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [activeSection, setActiveSection] = useState("roomInfo");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // ensure client-side rendering
  }, []);

  useEffect(() => {
    if (!roomId || !username) return;
    socket.emit("join-room", { roomId, username });

    socket.on("update-code", (newCode) => setCode(newCode));
    socket.on("room-users", (roomUsers) => setUsers(roomUsers));

    return () => socket.disconnect();
  }, [roomId, username]);

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    toast.info("Room Id Copied", {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Slide,
    });
  };

  const downloadCode = () => {
    const extensionMap = {
      javascript: "js",
      python: "py",
      cpp: "cpp",
      java: "java",
      typescript: "ts",
      html: "html",
      css: "css",
    };

    const fileExtension = extensionMap[language] || "txt";
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `code.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Code downloaded successfully!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
      transition: Slide,
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#FBF5E5] text-[#212121]">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 p-4 bg-[#FFF0F6] shadow-md md:shadow-2xl flex flex-col border-b md:border-r md:border-b-0 border-[#E1B7C7]">
        <div className="mb-6 text-center">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-[#C890A7] to-[#A7678C] text-transparent bg-clip-text">
            CodeCollab
          </h1>
          <p className="text-xs text-[#5C5C5C] mt-1 hidden md:block">
            Real-time collaborative editor
          </p>
        </div>

        <nav className="flex md:block">
          {["roomInfo", "participants", "settings"].map((section) => (
            <button
              key={section}
              className={`flex-1 p-2 md:p-3 rounded-lg font-medium flex flex-col md:flex-row items-center justify-center md:justify-start transition-all duration-200 mt-2 ${
                activeSection === section
                  ? "bg-[#EADBE3] shadow-inner text-[#8D4A6A]"
                  : "hover:bg-[#F3E6EB]"
              }`}
              onClick={() => setActiveSection(section)}
            >
              <span className="text-lg md:text-base md:mr-3">
                {section === "roomInfo"
                  ? "🏠"
                  : section === "participants"
                  ? "👥"
                  : "⚙️"}
              </span>
              <span className="text-xs md:text-base capitalize">
                {section.replace("Info", "")}
              </span>
            </button>
          ))}
        </nav>

        <div className="mt-4 md:mt-8 flex-1 overflow-y-auto">
          {activeSection === "roomInfo" && (
            <div className="space-y-4 md:space-y-6 bg-[#F7EBF0] p-3 md:p-4 rounded-xl shadow-md">
              <div>
                <h2 className="text-base md:text-lg font-bold text-[#8D4A6A] mb-2">
                  👤 Username
                </h2>
                <div className="text-sm text-[#5C5C5C] bg-white px-3 py-2 rounded-lg shadow-sm border border-[#E1B7C7]">
                  {username}
                </div>
              </div>
              <div>
                <h2 className="text-base md:text-lg font-bold text-[#8D4A6A] mb-2">
                  # Room ID
                </h2>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-[#5C5C5C] bg-white px-3 py-2 rounded-lg shadow-sm border border-[#E1B7C7] flex-1 truncate">
                    {roomId}
                  </div>
                  <button
                    onClick={copyRoomId}
                    className="p-2 bg-[#C890A7] rounded-lg hover:bg-[#b57a94] transition-all duration-200 shadow-md"
                    title="Copy Room ID"
                  >
                    <Copy size={16} color="white" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "participants" && (
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#8D4A6A]">
                👥 Participants{" "}
                <span className="ml-2 bg-[#C890A7] text-white text-xs px-2 py-1 rounded-full">
                  {users.length}
                </span>
              </h3>
              <div className="space-y-2 max-h-32 md:max-h-64 overflow-y-auto pr-1">
                {users.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 md:p-3 bg-gradient-to-r from-[#E3A5BE] to-[#D8A9CA] rounded-xl text-white font-medium shadow-md transform hover:translate-x-1 transition-all duration-200"
                  >
                    <div className="w-2 md:w-3 h-2 md:h-3 bg-green-400 rounded-full animate-pulse shadow-sm"></div>
                    <span className="text-xs md:text-sm">{user}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "settings" && (
            <div className="space-y-4 md:space-y-5 bg-[#F7EBF0] p-3 md:p-4 rounded-xl shadow-md">
              <div>
                <label className="block text-xs md:text-sm font-medium text-[#8D4A6A] mb-2">
                  Programming Language:
                </label>
                <select
                  className="w-full p-2 md:p-3 rounded-lg bg-white text-[#212121] shadow-sm border border-[#E1B7C7] focus:ring-2 focus:ring-[#C890A7] focus:outline-none text-sm"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                  <option value="typescript">TypeScript</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                </select>
              </div>
              <div className="pt-1 md:pt-2">
                <button
                  className="w-full p-2 md:p-3 bg-[#C890A7] text-white rounded-lg hover:bg-[#b57a94] shadow-md transform hover:scale-105 transition-all duration-200 flex items-center justify-center font-medium text-sm"
                  onClick={() =>
                    setTheme(theme === "vs-dark" ? "light" : "vs-dark")
                  }
                >
                  <span className="mr-2">
                    {theme === "vs-dark" ? "☀️" : "🌙"}
                  </span>
                  {theme === "vs-dark"
                    ? "Switch to Light Mode"
                    : "Switch to Dark Mode"}
                </button>
              </div>
              <div className="pt-1 md:pt-2">
                <button
                  className="w-full p-2 md:p-3 bg-[#C890A7] text-white rounded-lg hover:bg-[#b57a94] shadow-md transform hover:scale-105 transition-all duration-200 flex items-center justify-center font-medium text-sm"
                  onClick={downloadCode}
                >
                  ⬇️ Download Code
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 pt-2 border-t border-[#E1B7C7] hidden md:block">
          <div className="flex items-center text-xs text-[#5C5C5C]">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            Connected
          </div>
        </div>
      </div>

      {/* Editor Section */}
      <div className="w-full md:w-4/5 flex flex-col p-3 md:p-6 flex-1">
        <div className="mb-2 md:mb-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-2 md:h-3 w-2 md:w-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <h2 className="font-bold text-base md:text-lg text-[#8D4A6A]">
              Live Editing
            </h2>
          </div>
          <div className="text-xs md:text-sm text-[#5C5C5C] bg-[#F7EBF0] px-2 md:px-3 py-1 rounded-lg">
            {language.charAt(0).toUpperCase() + language.slice(1)}
          </div>
        </div>

        <div className="flex-1 rounded-xl overflow-hidden shadow-lg md:shadow-2xl border border-[#E1B7C7]">
          {isClient && (
            <Editor
              height="100%"
              width="100%"
              language={language}
              theme={theme}
              value={code}
              onChange={(newCode) => {
                setCode(newCode);
                socket.emit("code-changed", { roomId, code: newCode });
              }}
              options={{
                fontSize: 14,
                fontFamily: "'Fira Code', monospace",
                minimap: {
                  enabled:
                    typeof window !== "undefined" && window.innerWidth > 768,
                },
                scrollBeyondLastLine: false,
                roundedSelection: true,
                padding: { top: 16 },
                cursorBlinking: "smooth",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
