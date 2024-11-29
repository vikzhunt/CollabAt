// src/Components/DiscussionRooms/DiscussionRooms.js
import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8080");

const DiscussionRooms = () => {
  const [rooms] = useState([
    {
      name: "AI & Machine Learning",
      image:
        "https://media.istockphoto.com/id/1824739537/photo/ai-chatbot-block-blue-concepts.webp?a=1&b=1&s=612x612&w=0&k=20&c=CAgPYii0_qP8yEWre63J4lguZzVxsdTS4W1LnTE5hvM=",
    },
    {
      name: "Web Development",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdlYiUyMGR8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Data Science",
      image:
        "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGF0YSUyMHNjaWVuY2V8ZW58MHx8MHx8fDA%3D",
    },
  ]);
  const [currentRoom, setCurrentRoom] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const joinRoom = (room) => {
    setMessages([]); // Clear messages on new room selection
    setCurrentRoom(room.name);
    socket.emit("join_room", room.name);
  };

  const sendMessage = () => {
    if ((message || file) && currentRoom) {
      const messageData = {
        room: currentRoom,
        author: localStorage.getItem("name"),
        message,
        time: new Date().toLocaleTimeString(),
        file: file ? URL.createObjectURL(file) : null,
      };
      console.log(message);
      socket.emit("send_message", messageData);
      setMessage("");
      setFile(null);
    }
  };

  return (
    <div className="p-8 bg-slate-100 rounded-lg shadow-xl max-w-2xl mx-auto">
      <Typography
        variant="h4"
        className="text-center font-extrabold text-blue-900/90 mb-4 pb-4"
      >
        Discussion Rooms
      </Typography>

      {/* Room Selection */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {rooms.map((room, index) => (
          <div
            key={index}
            onClick={() => joinRoom(room)}
            className={`flex items-center justify-center p-6 bg-white rounded-lg shadow-lg cursor-pointer hover:bg-yellow-50/20 hover:border-yellow-500 transition-transform duration-200 ease-in-out ${
              currentRoom === room.name
                ? "border-4 border-blue-500/75 transform scale-105"
                : "border border-gray-200"
            }`}
          >
            <img
              src={room.image}
              alt={room.name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <span className="font-semibold text-gray-800">{room.name}</span>
          </div>
        ))}
      </div>

      {/* Chat Interface */}
      {currentRoom && (
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Room: {currentRoom}
          </h3>
          <div className="bg-gray-100 p-6 rounded-lg mb-4 h-64 overflow-y-scroll border border-gray-300">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                {msg.message.trim() && (
                  <p className="text-gray-700">
                    <strong className="text-blue-700">{msg.author}</strong>{" "}
                    <span className="text-xs text-gray-500">[{msg.time}]</span>:
                    <span className="ml-2">{msg.message}</span>
                  </p>
                )}

                {msg.file && (
                  <p className="text-gray-700">
                    <strong className="text-blue-700">{msg.author}</strong>{" "}
                    <span className="text-xs text-gray-500">[{msg.time}]</span>:
                    <a
                      href={msg.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      View File
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="flex space-x-2 items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-gray-500 hover:text-blue-500"
            >
              <AttachFile className="text-red-600/50" />
              <input
                type="file"
                id="file-upload"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </label>
            <button
              onClick={sendMessage}
              className="bg-blue-900/90 hover:bg-blue-800/90 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionRooms;
