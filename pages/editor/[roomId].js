import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001", {
    transports: ["websocket", "polling"],
    withCredentials: true
});

export default function EditorPage() {
    const router = useRouter();
    const { roomId, username } = router.query;
    const [code, setCode] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!roomId || !username) return;

        socket.emit("join-room", { roomId, username });

        socket.on("update-code", (newCode) => setCode(newCode));
        socket.on("room-users", (roomUsers) => setUsers(roomUsers));

        return () => {
            socket.off("update-code");
            socket.off("room-users");
        };
    }, [roomId, username]);

    return (
        <div>
            <h2>Room ID: {roomId}</h2>
            <h3>Users: {users.join(", ")}</h3>
            <textarea
                value={code}
                onChange={(e) => {
                    setCode(e.target.value);
                    socket.emit("code-changed", { roomId, code: e.target.value });
                }}
                rows="10"
                cols="80"
            />
        </div>
    );
}

// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:3001");

// export default function EditorPage() {
//     const router = useRouter();
//     const { roomId, username } = router.query;
//     const [code, setCode] = useState("");
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         if (!roomId || !username) return;
        
//         console.log(`Joining room: ${roomId} as ${username}`);

//         socket.emit("join-room", { roomId, username });

//         socket.on("update-code", (newCode) => setCode(newCode));
//         socket.on("room-users", (roomUsers) => setUsers(roomUsers));

//         return () => {
//             console.log(`Leaving room: ${roomId}`);
//             socket.disconnect();
//         };
//     }, [roomId, username]);

//     return (
//         <div>
//             <h2>Room ID: {roomId}</h2>
//             <h3>Users: {users.join(", ")}</h3>
//             <textarea
//                 value={code}
//                 onChange={(e) => {
//                     setCode(e.target.value);
//                     socket.emit("code-changed", { roomId, code: e.target.value });
//                 }}
//                 rows="10"
//                 cols="80"
//             />
//         </div>
//     );
// }
