const User = require("../models/User");

const findUser = async (username) => {
  try {
    const user = await User.findOne({username});
    if (user === null) {
      return {found: false, message: "User not found"};
    }
    return {found: true, user};
  } catch (error) {
    throw new Error("Error finding user");
  }
};

const validateInput = (username, password) => {
  if (username === "" || password === "") {
    return {
      valid: false,
      message: "Both username and password must be filled in!",
    };
  }
  return {valid: true};
};

module.exports = {findUser};
