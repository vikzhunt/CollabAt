import { Router } from "express";
import { signUp, logIn, getAllUsers, updateUser, getConnections, acceptConnectionRequest, sendConnectionRequest, removeConnectionRequest, getPendingRequests } from "./Controllers/user.js";
import { getAllResources, uploadResource } from "./Controllers/resource.js";
import { getAllBlogs, uploadBlog } from "./Controllers/blog.js";
import { createTeam, getAllTeams, joinTeam, sendMessage } from "./Controllers/team.js";


const route = Router();
route.post("/signUp", signUp);
route.post("/logIn", logIn);
route.get("/getAllUsers", getAllUsers);
route.patch("/updateUser", updateUser);
route.get("/getConnections/:userId", getConnections);
route.post("/acceptConnectionRequest", acceptConnectionRequest);
route.post("/sendConnectionRequest", sendConnectionRequest);
route.post("/removeConnectionRequest", removeConnectionRequest);
route.get("/pendingRequests/:userId", getPendingRequests);

route.post("/uploadResource", uploadResource);
route.get("/getAllResources", getAllResources);

route.post("/uploadBlog", uploadBlog);
route.get("/getAllBlogs", getAllBlogs);

route.post("/teams", createTeam);
route.post("/teams/join", joinTeam);
route.post("/teams/sendMessage", sendMessage);
route.get("/getAllTeams", getAllTeams);


export default route;
