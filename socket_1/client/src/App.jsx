import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
function App() {
  const socket = useMemo(() => io("http://localhost:8000"), []); //by using useMemo Hook component is prevented from re-rendering it will only re render when component mounts;

  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState("");
  const [socketID, setSocketID] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setSocketID(socket.id);
      console.log(`user connected ${socket.id}`);
    });

    socket.on("recieve-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    socket.emit("message", { message, roomId });
    setMessage("");
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
  };

  return (
    <>
      <h1>sockets</h1>
      <Container maxWidth={"md"}>
        <Typography variant="h5" component={"div"} gutterBottom>
          Welcome to socket.io
        </Typography>
        <Typography variant="h5" component={"div"} gutterBottom>
          {socketID}
        </Typography>

        <form onSubmit={joinRoomHandler}>
          <TextField
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            label="room name"
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary">
            join
          </Button>
        </form>

        <form onSubmit={submitHandler}>
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            label="enter message..."
            variant="outlined"
          />
          <TextField
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            label="enter roomId"
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </form>
        <Stack>
          {messages.map((msg, i) => (
            <Typography variant="h6" key={i} component={"div"} gutterBottom>
              {msg}
            </Typography>
          ))}
        </Stack>
      </Container>
    </>
  );
}

export default App;
