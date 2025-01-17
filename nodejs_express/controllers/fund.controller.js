const { Sequelize, where } = require("sequelize");
const responseApi = require("../config/responseApi");
const db = require("../db/models");
const { isOwnerFund, isAdmin } = require("../utils/checkRole");

const fund = db.Fund;

const getAllFund = (req, res) => {
  const userId = req?.userInfo.id;
  const isAd = isAdmin(req?.userInfo);

  fund
    .findAll({
      where: {
        name: {
          [db.Sequelize.Op.like]: `%${req.query.searchText}%`,
        },
      },
      include: [
        {
          model: db.GpCompany,
          include: {
            model: db.GPCompanyAccount,
          },
        },
      ],
      order: [["id", "ASC"]],
    })
    .then((data) => {
      if (isAdmin) {
        // return res.json(responseApi.success({ data: data }));
      }

      const filterDB = data.filter((item) => {
        return item?.GpCompany?.GPCompanyAccounts?.pop()?.AccountId == userId;
      });
      return res.json(responseApi.success({ data: filterDB }));
    })
    .catch((err) =>
      res.status(500).json(responseApi.error({ message: err.message }))
    );
};

const createFund = async (req, res) => {
  fund
    .create(req.body)
    .then((data) => res.json(responseApi.success({ data: data })))
    .catch((err) =>
      res.status(500).json(responseApi.error({ message: err.message }))
    );
};

const updateFund = (req, res) => {
  fund
    .update(req.body, {
      where: { id: req.params.id },
    })
    .then((data) => res.json(responseApi.success({ data: data })))
    .catch((err) =>
      res.status(500).json(responseApi.error({ message: err.message }))
    );
};

const deleteFund = (req, res) => {
  fund
    .destroy({
      where: { id: req.params.id },
    })
    .then((data) => res.json(responseApi.success({ data: data })))
    .catch((err) =>
      res.status(500).json(responseApi.error({ message: err.message }))
    );
};

const moneyFund = async (req, res) => {
  try {
    const userInfo = req?.userInfo;
    const fundId = req.params.id;
    const isOwner = await isOwnerFund(fundId, userInfo.id);
    const isNotProvider = req.body.status === "extract";
    let account;
    if (!isOwner) {
      throw Error("You must be manager to do this");
    }
    if (!isNotProvider) {
      account = await db.Account.findOne({
        where: { email: req.body.accountEmail },
      });
    }

    await db.FundAccount.create({
      FundId: fundId,
      AccountId: isNotProvider ? userInfo.id : account.id,
      money: req.body.money,
      description: req.body.description,
      status: req.body.status,
    });
    const operatorWithFund = isNotProvider ? "-" : "+";

    await db.Fund.update(
      {
        invested: Sequelize.literal(
          `invested ${operatorWithFund} ${req.body.money}`
        ),
      },
      {
        where: {
          id: fundId,
        },
      }
    );

    res.json(responseApi.success({ data: "success" }));
  } catch (err) {
    res
      .status(500)
      .json(responseApi.error({ logError: err, message: err.message }));
  }
};
const historyFund = async (req, res) => {
  try {
    const userInfo = req?.userInfo;
    const fundId = req.params.id;
    const isOwner = await isOwnerFund(fundId, userInfo.id);
    if (!isOwner) {
      throw Error("You must be manager to do this");
    }

    const data = await db.FundAccount.findAll({
      where: {
        FundId: fundId,
      },
      order: [["id", "DESC"]],
    });
    res.json(responseApi.success({ data: data }));
  } catch (err) {
    res
      .status(500)
      .json(responseApi.error({ logError: err, message: err.message }));
  }
};

const getDetailFund = async (req, res) => {
  try {
    const fundId = req.params.id;
    const isOwner = await isOwnerFund(fundId, req.userInfo.id);

    const fundData = await db.Fund.findByPk(fundId, {
      include: {
        model: db.GpCompany,
      },
    });
    const historyData = await db.FundAccount.findAll({
      where: {
        FundId: fundId,
        ...(!isOwner && {
          AccountId: req.userInfo.id,
        }),
      },
      include: {
        model: db.Account,
      },
      order: [["id", "DESC"]],
    });

    res.json(responseApi.success({ data: { fundData, historyData } }));
  } catch (e) {
    res.status(500).json(responseApi.error({ message: e.message }));
  }
};

const fundController = {
  getAllFund,
  createFund,
  updateFund,
  deleteFund,
  getDetailFund,
  moneyFund,
  historyFund,
};

module.exports = fundController;
