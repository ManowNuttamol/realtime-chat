const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

var key = {};

app.use(express.urlencoded({ extended: "false" }));
app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/chatroom", (req, res) => {
  uname = req.body.uname;
  res.sendFile(__dirname + "/chatroom.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  key[socket.id] = uname;
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", key[socket.id] + ": " + msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
