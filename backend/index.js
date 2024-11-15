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
app.listen(8000, () => {
  console.log("connected to backend");
});
