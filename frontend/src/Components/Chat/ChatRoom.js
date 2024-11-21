// src/Components/Chat/ChatRoom.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Typography, TextField, Button, Paper, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

const ChatRoom = () => {
  const [connections] = useState([
    { id: 1, name: 'Alice Johnson' },
    { id: 2, name: 'Bob Smith' },
    { id: 3, name: 'Charlie Brown' },
  ]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8080"); 
    setSocket(newSocket);

    newSocket.on('message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      newSocket.disconnect(); 
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim() && selectedConnection) {
      const newMessage = { username: selectedConnection.name, text: message, time: new Date().toLocaleTimeString() };
      socket.emit('message', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  const handleSelectConnection = (connection) => {
    setSelectedConnection(connection);
    setMessages([]); // Clear messages when switching to a new chat
  };

  return (
    <div className="flex h-screen justify-center">
      <div className="flex h-full max-w-3xl w-full bg-gray-100">
        {/* Connections List */}
        <div className="w-1/3 bg-slate-100 shadow-lg p-4 overflow-y-auto">
          <Typography variant="h5" className="font-bold text-sky-800 mb-4 p-4">Connections</Typography>
          <List>
            {connections.map((connection) => (
              <ListItem
                key={connection.id}
                button
                selected={selectedConnection && selectedConnection.id === connection.id}
                onClick={() => handleSelectConnection(connection)}
                className=" border mb-2 hover:bg-yellow-50/20 hover:border-yellow-500 rounded-md transition duration-200"
              >
                <ListItemAvatar>
                  <Avatar className="bg-blue-500 text-white">{connection.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={connection.name} />
              </ListItem>
            ))}
          </List>
        </div>

        {/* Chat */}
        <div className="w-2/3 p-4 m-4 flex flex-col bg-white shadow-lg rounded-tl-lg">
          {selectedConnection ? (
            <>
              <Typography variant="h5" className="font-bold text-blue-700 mb-4 p-4">
                Chatting with {selectedConnection.name}
              </Typography>
              <Paper elevation={3} className="flex-1 border border-gray-200 rounded-lg p-4 overflow-y-auto mb-4 h-30">
                {messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <div key={index} className="flex items-center space-x-3 mb-3">
                      <Avatar className="bg-blue-500 text-white">{msg.username[0]}</Avatar>
                      <div className="flex flex-col">
                        <Typography variant="subtitle2" className="font-semibold text-blue-600">
                          {msg.username} <span className="text-gray-400 text-xs">{msg.time}</span>
                        </Typography>
                        <Typography variant="body2" className="text-gray-700 ">{msg.text}</Typography>
                      </div>
                    </div>
                  ))
                ) : (
                  <Typography variant="body1" className="text-gray-500 text-center">No messages yet. Start the conversation!</Typography>
                )}
              </Paper>

              <div className="flex items-center space-x-3">
                <TextField
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Message ${selectedConnection.name}...`}
                  variant="outlined"
                  fullWidth
                  className="bg-white rounded-lg"
                />
                <Button
                  onClick={handleSendMessage}
                  variant="contained"
                  className="h-12 w-24 bg-blue-900/90 hover:bg-blue-800/90 transition duration-200"
                >
                  Send
                </Button>
              </div>
            </>
          ) : (
            <Typography variant="h6" className="text-gray-600 self-center mt-10">Select a connection to start chatting.</Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
