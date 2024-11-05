const express = require('express');
const {MongoClient} = require('mongodb');
const app=express();

app.get('/',(req,res)=>{
    res.send("Welcome to CollabAt API");
})

// server.js
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React app URL
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('message', (message) => {
    console.log('Server received message:', message); // Debugging line
    io.emit('message', message); // Broadcast the message to all users
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

async function connectToDatabase() {
    const uri="mongodb://localhost:27017/temp"
    const client= new MongoClient(uri);
    try {
      await client.connect();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }  
connectToDatabase();

const PORT=8080
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})