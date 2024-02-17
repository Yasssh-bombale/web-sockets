import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
const port = 8000;

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
}); //circuit

io.on("connection", (socket) => {
  console.log(`user connected`);
  console.log(`Id ${socket.id}`);
  socket.emit("welcome", `welcome to the server,${socket.id}`); //it will send msg to the particular circuit
  // broadcast is used to send to other circuites;
  socket.broadcast.emit("welcome", `${socket.id} has just joined the server`);
});

app.get("/", (req, res) => {
  res.send("homePage");
});

server.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
