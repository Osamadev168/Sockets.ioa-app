import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:5000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    await socket.emit("send_message", {
      message: message,
      user: "Osama",
      room: "Osama123",
    });
    setMessages((list) => [
      ...list,
      {
        message: message,
        user: "Osama",
        room: "Osama123",
      },
    ]);
    console.log(messages);
  };
  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessages((list) => [...list, data]);
    });
    console.log(messages);
  }, [socket]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        margin: "auto",
      }}
    >
      <h1>Welcome to chats</h1>
      <input onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send Message</button>
      {messages.map((text) => {
        return (
          <div>
            <h1>Message :{text.message}</h1>
            <h1>From :{text.user}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
