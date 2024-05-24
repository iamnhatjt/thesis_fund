const db = require("../db/models");

const isAdmin = (userInfo) => {
  return userInfo?.email?.toLowerCase().startsWith("admin");
};

const isOwnerFund = async (fundId, userId) => {
  const fundInfo = await db.Fund.findByPk(fundId);
  const gpId = fundInfo?.GpCompanyId;
  const gpCompanyAccountInfo = await db.GPCompanyAccount.findOne({
    include: {
      model: db.Account,
    },
    where: {
      role: "admin",
      GpCompanyId: gpId,
    },
  });
  const account = gpCompanyAccountInfo?.Account;

  return !(!account || userId !== account.id);
};

const isOwnerGP = async (gpId, userId) => {
  //todo: check here
  return true;
};

module.exports = {
  isAdmin,
  isOwnerFund,
  isOwnerGP,
};