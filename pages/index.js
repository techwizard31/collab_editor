import { useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Hero from "../public/9959236.jpg";
import Left from "../public/In progress-pana.svg";
import Right from "../public/Coding-amico.svg";
import Right1 from "../public/10276612_4421959.svg";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const generateRoomId = () => {
    const newRoomId = uuidv4();
    setRoomId(newRoomId);

    if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      navigator.clipboard
        .writeText(newRoomId)
        .then(() => alert("Room ID copied to clipboard!"))
        .catch(() => alert("Copy manually: " + newRoomId));
    } else {
      // Fallback for unsupported browsers
      const textArea = document.createElement("textarea");
      textArea.value = newRoomId;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        alert("Room ID copied to clipboard!");
      } catch {
        alert("Copy manually: " + newRoomId);
      }
      document.body.removeChild(textArea);
    }
  };

  const joinRoom = () => {
    if (roomId && username) {
      router.push(`/editor/${roomId}?username=${username}`);
    } else {
      alert("Enter username and room ID");
    }
  };

  return (
    <div className="flex flex-col items-center w-full mx-auto p-0 m-0 bg-[#FBF5E5]">
      <h1 className="text-4xl py-4 font-bold mb-6 text-[#212121]">Collaborative Code Editor</h1>

     {/* User input section */}
<div className="flex flex-col sm:flex-row justify-center items-center w-full gap-4 mb-6 px-4">
  <input
    className="w-full sm:w-64 py-3 text-center rounded bg-[#FBF5E5] border-2 border-[#C890A7]"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
  <input
    className="w-full sm:w-64 p-3 text-center rounded bg-[#FBF5E5] border-2 border-[#C890A7]"
    placeholder="Room ID"
    value={roomId}
    onChange={(e) => setRoomId(e.target.value)}
  />
</div>



     {/* Buttons section */}
<div className="flex flex-wrap justify-center gap-4 mb-8 w-full">
  <button
    className="w-32 sm:w-36 text-[#C890A7] p-2 rounded bg-[#FBF5E5] border-2 border-[#C890A7]"
    onClick={joinRoom}
  >
    Join Room
  </button>
  <button
    className="w-32 sm:w-36 text-[#C890A7] p-2 rounded bg-[#FBF5E5] border-2 border-[#C890A7]"
    onClick={generateRoomId}
  >
    Create Room
  </button>
</div>



      {/* Hero image section */}
<div className="w-full flex justify-center items-center overflow-hidden rounded">
  <img
    src="/4b7b8722-bd86-4ed2-a387-c550f87fc9db_removalai_preview.png"
    alt="Collaborative coding"
    width={1000}
    height={550}
    loading="lazy"
    className="object-cover rounded"
  />
</div>

    </div>
  );
}