const jwt = require("jsonwebtoken");

const generateToken = (userId, role) => {
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not set");
    throw new Error("Internal server error");
  }
  const token = jwt.sign({id: userId, role: role}, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

module.exports = generateToken;
