import express from "express";
import database from "./database.js";
import Routes from "./routes.js";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", Routes);
app.use(express.json());

database();
app.get('/',(req,res)=>{
  res.send("CollabAt is Live")
})
app.listen(8080, () => {
  console.log("connected to backend");
});
