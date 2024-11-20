import User from "./../Modals/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    console.log(email);
    
    const user = await User.findOne({ email: email });
    if (user) return res.status(201).json({ message: "user already exist" });
    else {
      const hashedpassword = await bcrypt.hash(password,10);
      console.log(hashedpassword)
      const newUser = new User({ email, name, password:hashedpassword });
      await newUser.save();
      const token = jwt.sign({ email },process.env.JWT_SECRET,{ expiresIn: '1h' });
      return res.status(200).json({ message: "user registered", user: newUser,token });
    }
  } catch (error) {
    return res.status(500).json({ message: "not auth", error });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(201).json({ message: "user does not exist", status: -1 });
    else {
      const ispwdvalid = await bcrypt.compare(password,user.password);
      if(!ispwdvalid){
        return res.status(400).json({message:"Invalid email or password"});
      }
      const token = jwt.sign({ email },process.env.JWT_SECRET,{ expiresIn:'1h' });
      return res.status(200).json({ message: "Login Successful",user, token });
    }
  } catch (error) {
    return res.status(500).json({ message: "not auth" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const userList = await User.find({ });
    return res.status(200).json({ message: "Users found", userList });
  } catch (error) {
    return res.status(500).json({ message: "not auth", status: null });
  }
};
