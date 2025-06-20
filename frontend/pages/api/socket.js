import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("User connected", socket.id);

      socket.on("join-room", (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).emit("user-joined", userId);
      });

      socket.on("code-change", (roomId, code) => {
        socket.to(roomId).emit("code-update", code);
      });
    });
  }
  res.end();
}