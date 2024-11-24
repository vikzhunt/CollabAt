import { Router } from "express";
import { signUp, logIn, getAllUsers,updateUser, getConnections, updateConnections, acceptConnectionRequest, sendConnectionRequest, getPendingRequests } from "./Controllers/user.js";
const route = Router();
route.post("/signUp", signUp);
route.post("/logIn", logIn);
route.get("/getAllUsers", getAllUsers);
route.patch("/updateUser",updateUser);
route.get("/getConnections",getConnections);
route.patch("/updateConnections",updateConnections);
route.post("/acceptConnectionRequest",acceptConnectionRequest);
route.post("/sendConnectionRequest", sendConnectionRequest);
route.get("/pendingRequests/:userId", getPendingRequests);

export default route;
