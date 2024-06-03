const User = require("../models/User");
const {
  hashPassword,
  comparePassword,
} = require("../services/passwordFunctions");
const generateToken = require("../services/tokenFunctions");

module.exports = {
  createUser: async (req, res) => {
    try {
      const {password, username, email, role} = req.body;
      if (!password || !username || !email || !role) {
        return res.status(400).json({error: "All fields are required."});
      }
      const hashedPassword = await hashPassword(password);
      const newUser = new User({
        username: username,
        password: hashedPassword,
        email: email,
        role: role,
      });
      await newUser.save();
      res.status(201).json({addedUser: newUser._id});
    } catch (error) {
      res.status(500).json(error);
    }
  },

  loginUser: async (req, res) => {
    try {
      const {username, password} = req.body;
      if (username == "" && password == "") {
        res
          .status(400)
          .json({message: "Both username and password must be filled in!"});
        return;
      }
      const user = await User.findOne({username});
      if (user == null) {
        res.status(404).json({message: "User not found"});
        return;
      }
      const correctPassword = await comparePassword(password, user.password);
      if (correctPassword) {
        const token = generateToken(user._id, user.role);
        res.status(200).json({token: token});
      } else {
        res.status(401).json({message: "Incorrect username or password"});
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
