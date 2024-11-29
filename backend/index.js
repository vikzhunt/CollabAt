import express from "express";
import database from "./database.js";
import Routes from "./routes.js";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import fileUpload from "express-fileupload";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
);

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", Routes);
app.use(express.json());

database();

io.on("connection", (socket) => {
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

  socket.on("typing", (data) => {
    socket.to(data.room).emit("display_typing", data.username);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    try {
      if (data.room && data.text) {
        io.to(data.room).emit("receive_message", data);
        console.log("Message sent to room:", data.room);
      } else {
        throw new Error("Invalid data for send_message event");
      }
    } catch (error) {
      console.error("Error handling the send_message:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("CollabAt is Live");
});

server.listen(8080, () => {
  console.log("connected to backend");
});
