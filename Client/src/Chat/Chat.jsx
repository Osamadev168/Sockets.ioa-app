import { useEffect, useState } from "react";
import { io } from "socket.io-client";
export function Image(props) {
  const [imageSrc, setImageSrc] = useState("");
  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(props.blob);
    reader.onloadend = function () {
      setImageSrc(reader.result);
    };
  }, [props.blob]);
  return <img src={imageSrc} style={{ width: 300 }} />;
}
const Chat = ({ userName, room, socket }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    if (file) {
      const messagedata = {
        message: file,
        user: userName,
        type: "file",
        mimtype: file.type,
        room: room,
        fileName: file.name,
      };
      await socket.emit("send-message", messagedata);
      setMessage("");
      setFile();
    } else {
      const messagedata = {
        message: message,
        user: userName,
        type: "text",
        room: room,
      };
      await socket.emit("send-message", messagedata);
      setMessage("");
    }
  };
  function listMesages(message) {
    setMessages((list) => [...list, message]);
  }
  useEffect(() => {
    (async () => {
      if (!socket.current) {
        socket.current = io(`http://localhost:5000`).on("connect", () => {});

        await socket.on("receive-message-room", (data) => {
          listMesages(data);
        });
      }
    })();
  });
  const chooseFile = (e) => {
    setFile(e.target.files[0]);
    setMessage(e.target.files[0].name);
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
      <h1>Welcome to {room}</h1>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={(e) => sendMessage(e)}>Send Message &#9658;</button>
      <input
        type="file"
        onChange={(e) => {
          chooseFile(e);
        }}
      />

      {messages.map((text, index) => {
        if (text.type === "file") {
          const blob = new Blob([text.message], { type: text.type });
          return (
            <div key={index}>
              <Image src={text.fileName} blob={blob} />
              <p>{text.user}</p>
            </div>
          );
        } else {
          return (
            <div key={index}>
              <p
                style={{
                  color: userName === text.user ? "green" : "purple",
                }}
              >
                Message :{text.message}
              </p>
              <p style={{ color: text.user === userName ? "green" : "purple" }}>
                From :{text.user}
              </p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Chat;
