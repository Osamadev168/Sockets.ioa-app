import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Room = ({ setUserName, setRoom, room, socket }) => {
  const navigate = useNavigate();
  const joinRoom = () => {
    socket.emit("join-room", room);
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
        onChange={(e) => setUserName(e.target.value)}
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
