import { useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:8000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`user connected ${socket.id}`);
    });
    socket.on("welcome", (s) => {
      console.log(s);
    });
  }, []);

  return (
    <>
      <h1>sockets</h1>
    </>
  );
}

export default App;
