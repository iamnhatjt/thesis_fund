const responseApi = require("../config/responseApi");
const { userFromToken } = require("../utils/veryfyToken");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  try {
    const userInfo = userFromToken(token);
    req.userInfo = userInfo;
    next();
  } catch (err) {
    res.status(403).send(responseApi.error({ message: err.message }));
  }
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
