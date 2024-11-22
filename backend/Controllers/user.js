import User from "./../Modals/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const user = await User.findOne({ email });
    if (user) return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, name, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ message: "User registered", user: newUser, token });
  } catch (error) {
    return res.status(500).json({ message: "Error during signup", error });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User does not exist", status: -1 });

    const isPwdValid = await bcrypt.compare(password, user.password);
    if (!isPwdValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ message: "Login Successful", user, token });
  } catch (error) {
    return res.status(500).json({ message: "Error during login" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const userList = await User.find({});
    return res.status(200).json({ message: "Users found", userList });
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve users", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { email, degree, interest, techSkills } = req.body.profile;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only allow updating non-unique fields like degree, interest, and techSkills
    await User.findOneAndUpdate(
      { email },
      { $set: { degree, interest, techSkills } }
    );

    return res.status(200).json({ message: "User updated" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update user", error });
  }
};

export const getConnections = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email })
      .populate('connectionRequests.from', 'name email')
      .populate('connections', 'name email'); // Populate connections as well

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Connections retrieved successfully",
      connections: user.connections,
      connectionRequests: user.connectionRequests,
    });
  } catch (error) {
    console.error("Error fetching connections:", error);
    return res.status(500).json({ message: "Failed to retrieve connections", error: error.message });
  }
};

export const updateConnections = async (req, res) => {
  const { email, connectTo } = req.body;

  if (!email || !connectTo) {
    return res.status(400).json({ message: "Email and connectTo are required" });
  }

  try {
    const user = await User.findOne({ email });
    const connectToUser = await User.findById(connectTo);

    if (!user || !connectToUser) {
      return res.status(404).json({ message: "User or target user not found" });
    }

    // Prevent duplicate pending requests
    const existingRequest = user.connectionRequests.find(request => request.from.toString() === connectTo);
    if (existingRequest && existingRequest.status === 'pending') {
      return res.status(400).json({ message: "Connection request already sent" });
    }

    const newRequest = { from: user._id, status: 'pending' };
    connectToUser.connectionRequests.push(newRequest);
    await connectToUser.save();

    return res.status(200).json({ message: "Connection request sent" });
  } catch (error) {
    console.error("Error sending connection request:", error);
    return res.status(500).json({ message: "Failed to send connection request", error: error.message });
  }
};

export const acceptConnection = async (req, res) => {
  const { userId, connectionRequestId } = req.body;

  if (!userId || !connectionRequestId) {
    return res.status(400).json({ message: "User ID and connection request ID are required" });
  }

  try {
    const user = await User.findById(userId);
    const request = user.connectionRequests.id(connectionRequestId);

    if (!request || request.status !== 'pending') {
      return res.status(400).json({ message: "Invalid or expired request" });
    }

    // Accept the connection
    request.status = 'accepted';
    await user.save();

    // Add both users to each other's connections
    user.connections.push(request.from);
    await user.save();

    const fromUser = await User.findById(request.from);
    fromUser.connections.push(userId);
    await fromUser.save();

    return res.status(200).json({ message: "Connection accepted" });
  } catch (error) {
    console.error("Error accepting connection:", error);
    return res.status(500).json({ message: "Failed to accept connection", error: error.message });
  }
};

export const sendConnectionRequest = async (req, res) => {
  console.log(req.body);

  const { currEmail, userId } = req.body;

  // Validate request body
  if (!currEmail || !userId) {
    return res.status(400).json({
      message: "Both email and userId are required.",
    });
  }

  try {
    // Find the requesting user and the target user
    const user1 = await User.findOne({ email: currEmail }); // Requesting user
    const connectToUser = await User.findById(userId); // Target user

    if (!user1 || !connectToUser) {
      return res.status(404).json({
        message: "Requesting user or target user not found.",
      });
    }

    // Ensure target user has a `connectionRequests` array
    if (!Array.isArray(connectToUser.connectionRequests)) {
      connectToUser.connectionRequests = [];
    }

    // Check if there's already a pending request
    const existingRequest = connectToUser.connectionRequests.find(
      request => request.from.toString() === user1._id.toString()
    );

    if (existingRequest && existingRequest.status === "pending") {
      return res.status(400).json({
        message: "Connection request already sent.",
      });
    }

    // Create and add the new connection request
    const newRequest = {
      from: user1._id,
      status: "pending",
    };

    connectToUser.connectionRequests.push(newRequest);
    await connectToUser.save();
// console.log("*")
    return res.status(200).json({
      message: "Connection request sent successfully.",
    });
  } catch (error) {
    // console.log("*")
    console.error("Error sending connection request:", error);
    return res.status(500).json({
      message: "Failed to send connection request.",
      error: error.message,
    });
  }
};
