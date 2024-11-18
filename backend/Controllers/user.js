import User from "./../Modals/user.js";

export const signUp = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    console.log(email);
    const user = await User.findOne({ email: email });
    if (user) return res.status(201).json({ message: "user already exist" });
    else {
      const newUser = new User({ email, name, password });
      await newUser.save();
      return res.status(200).json({ message: "user registered" });
    }
  } catch (error) {
    return res.status(500).json({ message: "not auth" });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(201)
        .json({ message: "user does not exist", status: -1 });
    else {
      if (user.password == password)
        return res
          .status(200)
          .json({ message: "Correct password", status: 1, user });
      return res.status(200).json({ message: "Incorrect password", status: 0 });
    }
  } catch (error) {
    return res.status(500).json({ message: "not auth", status: null });
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
