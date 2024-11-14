const express = require('express');
const {MongoClient} = require('mongodb');
const app=express();

app.get('/',(req,res)=>{
    res.send("Welcome to CollabAt API");
})

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