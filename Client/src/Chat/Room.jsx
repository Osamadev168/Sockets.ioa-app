import { useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
const Room = () => {
  const navigate = useNavigate();

  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");

  const joinRoom = () => {
    socket.emit("join_room", room);
    navigate("/chat");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        margin: "auto",
      }}
    >
      <h1>Join a room!</h1>
      <input
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username...."
      />
      <input
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Room Id...."
      />

      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
};

export default Room;
