const io = require("socket.io")(5000, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });
  console.log(`user with id ${socket.id} is connected`);
  socket.on("send-message", (message) => {
    io.to(message.room).emit("receive-message-room", message);
  });
  socket.on("join-room", (room) => {
    socket.join(room);
  });
});
