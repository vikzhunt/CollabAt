import User from "./../Modals/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import cloudinary from "../cloudconfig.js";

export const signUp = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const user = await User.findOne({ email });
    if (user) return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, name, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res
      .status(200)
      .json({ message: "User registered", user: newUser, token });
  } catch (error) {
    return res.status(500).json({ message: "Error during signup", error });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "User does not exist", status: -1 });

    const isPwdValid = await bcrypt.compare(password, user.password);
    if (!isPwdValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ message: "Login Successful", user, token });
  } catch (error) {
    console.error("Error during login: ", error);
    return res.status(500).json({ message: "Error during login" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const userList = await User.find({});
    return res.status(200).json({ message: "Users found", userList });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to retrieve users", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  
  const { email, degree, interest, techSkills } = req.body;
  const { resume } = req.files || {}; 
  console.log(req.files);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let resumeUrl;
    if (resume) {
      if (resume.tempFilePath) {
        const uploadResult = await cloudinary.uploader.upload(resume.tempFilePath, {
          folder: 'resumes',
          resource_type: 'image',
          format: 'png',
        });
        resumeUrl = uploadResult.secure_url;
      } else {
        throw new Error('No temporary file path available');
      }
    }

    console.log(resumeUrl);
    user.degree = degree;
    user.interest = interest;
    user.techSkills = techSkills;
    if(resumeUrl){
      user.resume = resumeUrl;
    }

    await user.save();
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update user", error: error.message });
  }
};

export const getConnections = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const user = await User.findById(userId).populate(
      "connections",
      "name email degree techSkills interest"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Connections retrieved successfully",
      connections: user.connections,
    });
  } catch (error) {
    console.error("Error fetching connections:", error);
    return res.status(500).json({
      message: "Failed to retrieve connections",
      error: error.message,
    });
  }
};

export const acceptConnectionRequest = async (req, res) => {
  const { userId, requesterId } = req.body;
  // console.log(userId);
  // console.log(requesterId);
  try {
    const user = await User.findById(userId);
    const requester = await User.findById(requesterId);
    console.log(user);
    console.log(requester);
    if (!user || !requester) {
      return res.status(404).json({ message: "User(s) not found" });
    }
    const requestIndex = user.connectionRequests.findIndex(
      (req) => req.from == requesterId.toString() && req.status === "pending"
    );
    console.log(requestIndex);
    console.log("hey");
    if (requestIndex === -1) {
      return res.status(404).json({ message: "No pending request found" });
    }

    user.connectionRequests[requestIndex].status = "accepted";
    user.connections.push(requesterId);
    requester.connections.push(userId);

    await user.save();
    await requester.save();

    return res
      .status(200)
      .json({ message: "Connection accepted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error accepting connection", error });
  }
};

export const sendConnectionRequest = async (req, res) => {
  const { fromId, toId, message } = req.body;

  try {
    if (
      !mongoose.Types.ObjectId.isValid(fromId) ||
      !mongoose.Types.ObjectId.isValid(toId)
    ) {
      return res.status(400).json({ message: "Invalid user IDs provided" });
    }
    const sender = await User.findById(fromId);
    const receiver = await User.findById(toId);
    // console.log(sender);
    // console.log(receiver);
    if (!sender || !receiver) {
      return res.status(404).json({ message: "User(s) not found" });
    }
    if (!Array.isArray(receiver.connectionRequests)) {
      receiver.connectionRequests = [];
    }
    const existingRequest = receiver.connectionRequests.find((req) => {
      if (!req || !req.from) return false;
      return req.from.toString() === fromId && req.status === "pending";
    });
    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }
    receiver.connectionRequests.push({ from: fromId, message });
    sender.connectionRequests.push({ to: toId });
    await receiver.save();
    await sender.save();

    return res.status(200).json({ message: "Request sent successfully" });
  } catch (error) {
    console.error("Error in sendConnectionRequest:", error);
    return res.status(500).json({ message: "Error sending request", error });
  }
};

export const removeConnectionRequest = async (req, res) => {
  const { fromId, toId } = req.body;

  try {
    const sender = await User.findById(fromId);
    const receiver = await User.findById(toId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "User(s) not found" });
    }

    sender.connectionRequests = sender.connectionRequests.filter(
      (request) =>
        !(request.to?.toString() === toId || request.from?.toString() === toId)
    );

    sender.connections = sender.connections.filter(
      (request) => !(request.toString() === toId || request.toString() === toId)
    );

    receiver.connectionRequests = receiver.connectionRequests.filter(
      (request) =>
        !(
          request.to?.toString() === fromId ||
          request.from?.toString() === fromId
        )
    );

    receiver.connections = receiver.connections.filter(
      (request) =>
        !(request.toString() === fromId || request.toString() === fromId)
    );

    await sender.save();
    await receiver.save();

    return res
      .status(200)
      .json({ message: "Connection request removed successfully" });
  } catch (error) {
    console.error("Error in removeConnectionRequest:", error);
    return res.status(500).json({ message: "Error removing request", error });
  }
};

export const getPendingRequests = async (req, res) => {
  const { userId } = req.params;
  // console.log("ehll");
  try {
    // const user = await User.findById(userId).populate("connectionRequests.from", "name email");
    const user = await User.findById(userId);
    // console.log(user);
    // console.log(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const pendingRequests = user.connectionRequests.filter(
      (req) => req.status === "pending"
    );

    return res.status(200).json({ pendingRequests });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching requests", error });
  }
};
