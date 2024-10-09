const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io"); // Destructuring to get Server class

const app = express();

const server = http.createServer(app);
const port = 4500;
const users = {}; // Change to an object to store users by socket ID

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

const io = new Server(server); // Instantiate a new SocketIO server

io.on("connection", (socket) => {
  console.log("New Connection");

  // When a user joins
  socket.on("joined", ({ user }) => {
    users[socket.id] = user; // Store the user with their socket ID as the key
    console.log(`${user} has joined`);

    // Notify other users that someone has joined
    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: `${users[socket.id]} has joined`,
    });

    // Welcome the new user
    socket.emit("welcome", {
      user: "Admin",
      message: `Welcome to the chat, ${users[socket.id]}`,
    });
  });

  // When a user sends a message
  socket.on("message", ({ message, id }) => {
    io.emit("sendMessage", { user: users[id], message, id });
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    if (users[socket.id]) {
      socket.broadcast.emit("leave", {
        user: "Admin",
        message: `${users[socket.id]} has left`,
      });
      console.log(`${users[socket.id]} has left`);
      delete users[socket.id]; // Remove the user from the object when they disconnect
    }
  });
});

server.listen(port, () => {
  console.log("Server is working on port", port);
});
