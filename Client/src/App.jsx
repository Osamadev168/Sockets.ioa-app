import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./Chat/Chat";
import Room from "./Chat/Room";
import io from "socket.io-client";
const socket = io("http://localhost:5000");
socket.on("connect", () => {
  console.log(`connected with id ${socket.id}`);
});
const App = () => {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Room
              setUserName={setUserName}
              setRoom={setRoom}
              room={room}
              socket={socket}
            />
          }
        />
        <Route
          path="/chat"
          element={<Chat userName={userName} room={room} socket={socket} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
