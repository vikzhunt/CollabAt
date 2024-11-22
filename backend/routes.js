import { Router } from "express";
import { signUp, logIn, getAllUsers,updateUser, getConnections, updateConnections, acceptConnection, sendConnectionRequest } from "./Controllers/user.js";
const route = Router();
route.post("/signUp", signUp);
route.post("/logIn", logIn);
route.get("/getAllUsers", getAllUsers);
route.patch("/updateUser",updateUser);
route.get("/getConnections",getConnections);
route.patch("/updateConnections",updateConnections);
route.patch("/acceptConnection",acceptConnection);
route.post("/sendConnectionRequest", sendConnectionRequest);

export default route;
