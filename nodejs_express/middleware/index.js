const authJwtMiddleware = require("./authJwt.middleware");
const roleMiddleWare = require("./role.middleware");

const middleware = {
  checkToken: authJwtMiddleware.verifyToken,
  isAdmin: roleMiddleWare.isAdminCheck,
};

module.exports = middleware;
