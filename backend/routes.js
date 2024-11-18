import { Router } from "express";
import { signUp, logIn, getAllUsers } from "./Controllers/user.js";
const route = Router();
route.post("/signUp", signUp);
route.post("/logIn", logIn);
route.get("/getAllUsers", getAllUsers);

export default route;
