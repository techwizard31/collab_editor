import { io } from "socket.io-client";
const socket = io("http://localhost:3001");
export { socket };

// frontend/pages/index.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const handleJoin = () => {
    if (roomId) router.push(`/room/${roomId}`);
  };

  return (
    <div>
      <h1>Collaborative Code Editor</h1>
      <input value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="Enter Room ID" />
      <button onClick={handleJoin}>Join Room</button>
    </div>
  );
}