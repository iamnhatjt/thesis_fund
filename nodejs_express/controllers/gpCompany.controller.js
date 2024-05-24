const responseApi = require("../config/responseApi");
const db = require("../db/models");
const { isAdmin } = require("../utils/checkRole");
const gpCompany = db.GpCompany;

const getAllGpCompany = (req, res) => {
  const isAdminRole = isAdmin(req?.userInfo);

  gpCompany
    .findAll({
      where: {
        ...(!isAdminRole &&
          req?.userInfo?.email && {
            "$Accounts.lastName": req?.userInfo?.email,
          }),
        name: {
          [db.Sequelize.Op.like]: `%${req?.query?.searchText ?? ""}%`,
        },
      },
      include: {
        model: db.Account,
        through: {
          attributes: ["role"],
          where: { role: "admin" },
        },
        attribute: ["id", "firstName", "lastName", "email", "role"],
      },

      order: [["id", "ASC"]],
    })
    .then((data) => {
      res.json(responseApi.success({ data: data }));
    })
    .catch((err) =>
      res.status(500).json(responseApi.error({ message: err.message }))
    );
};

const createGPCompany = async (req, res) => {
  try {
    const account = await db.Account.findOne({
      where: { email: req?.body?.emailAccount },
    });
    if (!account) throw new Error("Account not found");

    const newGp = await gpCompany.create({
      name: req?.body?.name,
      category: req?.body?.category,
      status: req?.body?.status,
    });

    await newGp.addAccount(account, { through: { role: "admin" } });

    res.json(responseApi.success({ data: newGp }));
  } catch (err) {
    res.status(500).json(responseApi.error({ message: err.message }));
  }
};

const patchGpCompany = async (req, res) => {
  try {
    const gp = await gpCompany.findByPk(req?.params?.id);
    if (req?.body?.emailAccount) {
      const account = await db.Account.findOne({
        where: { email: req?.body?.emailAccount },
      });
      await db.GPCompanyAccount.destroy({
        where: {
          GpCompanyId: req?.params?.id,
          role: "admin",
        },
      });
      if (!gp) throw new Error("GP Company not found");
      await gp.addAccount(account, { through: { role: "admin" } });
    }

    await gp.update(req.body);
    res.json(responseApi.success({ data: gp }));
  } catch (err) {
    res.status(500).json(responseApi.error({ message: err.message }));
  }
};

const getDetailGPCompany = async (req, res) => {
  try {
    const gp = await gpCompany.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.GPCompanyAccount,
        },
      ],
    });
    const funds = await db.Fund.findAll({
      where: {
        GpCompanyId: req.params.id,
      },
    });
    res.json(responseApi.success({ data: { gp, funds } }));
  } catch (err) {
    res.status(500).json(responseApi.error({ message: err.message }));
  }
};

const getStatusCompany = async (req, res) => {
  const isAdminRole = isAdmin(req?.userInfo);
  let totalCompany;
  let totalFund;
  let totalFundMoney;

  try {
    if (isAdminRole) {
      totalCompany = await gpCompany.count();
      totalFund = await db.Fund.count();
      totalFundMoney = await db.Fund.sum("invested");
    } else {
      totalCompany = await gpCompany.count({
        where: {
          "$Accounts.email": req?.userInfo?.email,
          "Accounts.role": "admin",
        },
      });

      totalFund = await db.Fund.count({
        where: {
          "$GpCompany.Accounts.email": req?.userInfo?.email,
        },
      });
      totalFundMoney = await db.Fund.sum("invested", {
        where: {
          "$GpCompany.Accounts.email": req?.userInfo?.email,
        },
      });
    }

    res.json(
      responseApi.success({
        data: {
          totalCompany,
          totalFund,
          totalFundMoney,
        },
      })
    );
  } catch (err) {
    res.status(500).json(responseApi.error({ message: err.message }));
  }
};

const gpCompanyController = {
  getAllGpCompany,
  createGPCompany,
  patchGpCompany,
  getDetailGPCompany,
  getStatusCompany,
};

module.exports = gpCompanyController;
