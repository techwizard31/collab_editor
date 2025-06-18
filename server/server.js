import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins (modify for production)
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
});

app.use(cors());

const rooms = {}; // Stores room data

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join-room", ({ roomId, username }) => {
        socket.join(roomId);

        if (!rooms[roomId]) {
            rooms[roomId] = { users: {}, code: "" };
        }

        rooms[roomId].users[socket.id] = username;

        // Send existing code to the new user
        socket.emit("update-code", rooms[roomId].code);

        // Notify others in the room about the new user
        io.to(roomId).emit("room-users", Object.values(rooms[roomId].users));

        console.log(`${username} joined room: ${roomId}`);
    });

    socket.on("code-changed", ({ roomId, code }) => {
        if (rooms[roomId]) {
            rooms[roomId].code = code; // Save latest code for new users
        }
        socket.to(roomId).emit("update-code", code); // Broadcast to others
    });

    socket.on("disconnect", () => {
        let roomIdToDelete = null;
        
        for (const roomId in rooms) {
            if (rooms[roomId].users[socket.id]) {
                delete rooms[roomId].users[socket.id];

                io.to(roomId).emit("room-users", Object.values(rooms[roomId].users));

                if (Object.keys(rooms[roomId].users).length === 0) {
                    roomIdToDelete = roomId; // Mark room for deletion if empty
                }
            }
        }

        if (roomIdToDelete) {
            delete rooms[roomIdToDelete]; // Remove empty rooms
        }

        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
