const jwt = require("jsonwebtoken");

const userFromToken = (token) => {
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new Error("token invalid");
    }
    return decoded;
  }
  throw new Error("token invalid");
};

module.exports = { userFromToken };
