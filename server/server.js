import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

// Configure CORS for your domain
const corsOptions = {
    origin: [
        "http://localhost:3000",
        "https://collabeditor.xyz",
        "http://collabeditor.xyz"
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
};

const io = new Server(server, {
    cors: corsOptions
});

app.use(cors(corsOptions));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

const rooms = {}; // Stores room data

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join-room", ({ roomId, username }) => {
        console.log(`Join room request: ${username} -> ${roomId}`);
        
        socket.join(roomId);

        if (!rooms[roomId]) {
            rooms[roomId] = { users: {}, code: "" };
        }

        rooms[roomId].users[socket.id] = username;

        // Send existing code to the new user
        socket.emit("update-code", rooms[roomId].code);

        // Notify others in the room about the new user
        io.to(roomId).emit("room-users", Object.values(rooms[roomId].users));

        console.log(`${username} joined room: ${roomId}. Total users: ${Object.keys(rooms[roomId].users).length}`);
    });

    socket.on("code-changed", ({ roomId, code }) => {
        console.log(`Code changed in room: ${roomId}`);
        
        if (rooms[roomId]) {
            rooms[roomId].code = code; // Save latest code for new users
        }
        socket.to(roomId).emit("update-code", code); // Broadcast to others
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        
        let roomIdToDelete = null;
        
        for (const roomId in rooms) {
            if (rooms[roomId].users[socket.id]) {
                const username = rooms[roomId].users[socket.id];
                delete rooms[roomId].users[socket.id];

                io.to(roomId).emit("room-users", Object.values(rooms[roomId].users));

                console.log(`${username} left room: ${roomId}. Remaining users: ${Object.keys(rooms[roomId].users).length}`);

                if (Object.keys(rooms[roomId].users).length === 0) {
                    roomIdToDelete = roomId; // Mark room for deletion if empty
                }
            }
        }

        if (roomIdToDelete) {
            delete rooms[roomIdToDelete]; // Remove empty rooms
            console.log(`Room ${roomIdToDelete} deleted (empty)`);
        }
    });

    // Handle connection errors
    socket.on("connect_error", (error) => {
        console.error("Connection error:", error);
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`✅ CORS enabled for: ${corsOptions.origin.join(', ')}`);
});