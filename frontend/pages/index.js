import { useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { toast, Slide } from 'react-toastify';

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
        .then(() =>
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
          })
        )
        .catch(() =>
          toast.info("Copy manually: " + newRoomId, {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
          })
        );
    } else {
      // Fallback for unsupported browsers
      const textArea = document.createElement("textarea");
      textArea.value = newRoomId;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
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
      } catch {
        toast.info("Copy manually: " + newRoomId, {
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
      }
      document.body.removeChild(textArea);
    }
  };

  const joinRoom = () => {
    if (roomId && username) {
      router.push(`/editor/${roomId}?username=${username}`);
    } else {
      toast.error("Enter username and Room Id", {
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
    }
  };

  return (
    <div className="flex flex-col items-center w-full mx-auto p-0 m-0 bg-[#FBF5E5]">
      <h1 className="text-4xl py-4 font-bold mb-6 text-[#522546]">
        Collaborative Code Editor
      </h1>

      {/* User input section */}
      <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-4 mb-6 px-4">
        <input
          className="w-full sm:w-64 py-3 text-center rounded bg-[#FBF5E5] border-2 border-[#522546] placeholder:text-[#C890A7] text-[#522546]"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full sm:w-64 p-3 text-center rounded bg-[#FBF5E5] border-2 border-[#522546] placeholder:text-[#C890A7] text-[#522546]"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>

      {/* Buttons section */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 w-full">
        <button
          className="w-32 sm:w-36 text-[#522546] p-2 rounded bg-[#FBF5E5] border-2 border-[#522546] hover:scale-105 transition-all duration-150"
          onClick={joinRoom}
        >
          Join Room
        </button>
        <button
          className="w-32 sm:w-36 text-[#522546] p-2 rounded bg-[#FBF5E5] border-2 border-[#522546] hover:scale-105 transition-all duration-150"
          onClick={generateRoomId}
        >
          Create Room
        </button>
      </div>

      {/* Hero image section */}
      <div className="w-full flex justify-center items-center overflow-hidden rounded">
        <img
          src="/1.png"
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
