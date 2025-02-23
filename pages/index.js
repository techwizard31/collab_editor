
import { useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");
    const router = useRouter();

    const generateRoomId = () => {
        const newRoomId = uuidv4();
        setRoomId(newRoomId);

        if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
            navigator.clipboard.writeText(newRoomId)
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
        <div>
            <h1>Collaborative Code Editor</h1>
            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                placeholder="Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
            />
            <button onClick={joinRoom}>Join Room</button>
            <button onClick={generateRoomId}>Create Room</button>
        </div>
    );
}

