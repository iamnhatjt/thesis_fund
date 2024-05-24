const responseApi = require("../config/responseApi");
const { isAdmin } = require("../utils/checkRole");

const isAdminCheck = (req, res, next) => {
  const userInfo = req?.userInfo;
  if (!userInfo) {
    return res
      .status(500)
      .json(responseApi.error({ message: "ur need to check token first" }));
  }

  if (isAdmin(userInfo)) {
    next();
  } else {
    return res
      .status(500)
      .json(responseApi.error({ message: "this api only for admin" }));
  }
};

const roleMiddleWare = {
  isAdminCheck,
};

module.exports = roleMiddleWare;
