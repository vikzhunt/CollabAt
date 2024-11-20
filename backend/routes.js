import { Router } from "express";
import { signUp, logIn, getAllUsers,updateUser } from "./Controllers/user.js";
const route = Router();
route.post("/signUp", signUp);
route.post("/logIn", logIn);
route.get("/getAllUsers", getAllUsers);
route.patch("/updateUser",updateUser);

export default route;
