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
      <h1 className="text-2xl font-bold mb-6 text-[#A35C7A]">Collaborative Code Editor</h1>

      {/* User input section */}
      <div className="flex flex-col sm:flex-row gap-4 w-full mb-6">
        <input
          className="p-2 rounded flex-1 bg-[#FBF5E5] border-2 border-[#C890A7]"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="p-2 bg-[#FBF5E5] border-2 border-[#C890A7] rounded flex-1 "
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>

      {/* Buttons section */}
      <div className="flex gap-8 mb-8 w-full">
        <button
          className="text-[#C890A7] p-2 rounded flex-1 bg-[#FBF5E5] border-2 border-[#C890A7]"
          onClick={joinRoom}
        >
          Join Room
        </button>
        <button
          className="text-[#C890A7] p-2 rounded flex-1 bg-[#FBF5E5] border-2 border-[#C890A7]"
          onClick={generateRoomId}
        >
          Create Room
        </button>
      </div>

      {/* Hero image section */}
      <div className="w-full h-fit overflow-hidden rounded">
        {/* <Image
          src={Right}
          alt="Collaborative coding"
          width={300}
          height={550}
          loading="lazy"
          className="object-cover"
        /> */}
        <img
          src="/9959236.jpg"
          alt="Collaborative coding"
          width={1000}
          height={550}
          loading="lazy"
          className="object-cover"
        />
        {/* <Image
          src={Left}
          alt="Collaborative coding"
          width={200}
          height={550}
          loading="lazy"
          className="object-cover"
        /> */}
      </div>
    </div>
  );
}
