//socket backend

const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

//establish the connection
io.on("connection", (socket) => {
  //when a user connects
  console.log("a user connected.");
  // console.log(`after a user connects ${users}`);
  //take user id and socket id from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  console.log(`after a user added ${users}`);
  console.log(users);

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, messageBody }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      messageBody,
    });
  });

  //disconnection
  socket.on("disconnect", () => {
    console.log("user has disconnect");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
// io.to(si)("welcome", "this is a socket server")});
