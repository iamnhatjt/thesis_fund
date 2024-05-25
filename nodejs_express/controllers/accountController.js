const responseApi = require("../config/responseApi");
const db = require("../db/models");
const { Account } = require("../db/models");
const bcrypt = require("bcrypt");

const getAllAccount = (req, res) =>
  Account.findAll({
    where: {
      email: {
        [db.Sequelize.Op.like]: `%${req?.query?.email}%`,
      },
    },
  })
    .then((data) => {
      res.json(responseApi.success({ data: data }));
    })
    .catch((err) => {
      res.status(500).json(responseApi.error({ logError: err }));
    });

const updateAccount = async (req, res) => {
  const userInfo = req.userInfo;

  await Account.update(req.body, {
    where: { id: userInfo.id },
  })
    .then((data) => {
      res.json(responseApi.success({ data: data }));
    })
    .catch((err) =>
      res
        .status(500)
        .json(responseApi.error({ logError: err, message: err.message })),
    );
};
const deleteAccount = (req, res) =>
  Account.destroy({ where: { id: req.params.id } })
    .then((data) => res.json(responseApi.success({ data: data })))
    .catch((err) =>
      res.status(500).json(
        responseApi.error({
          logError: err,
          message: err.message,
        }),
      ),
    );

const getAccountById = (req, res) => {
  Account.findByPk(req.params.id, {})
    .then((data) => {
      if (data) {
        res.json(
          responseApi.success({
            data: data,
          }),
        );
      } else {
        res.status(404).json(
          responseApi.error({
            message: "Data not found",
            code: 404,
          }),
        );
      }
    })
    .catch((err) =>
      res.status(500).json(
        responseApi.error({
          logError: err,
          message: err.message,
        }),
      ),
    );
};

const changePassword = async (req, res) => {
  try {
    const user = req.userInfo;
    const { oldPassword, newPassword } = req.body;
    const account = await db.Account.findByPk(user.id);

    if (!account) {
      return res
        .status(404)
        .json(responseApi.error({ message: "Account not found" }));
    }
    const isMatch = await bcrypt.compare(oldPassword, account.password);
    if (!isMatch) {
      return res
        .status(400)
        .json(responseApi.error({ message: "Old password is not match" }));
    }
    const hashPassword = bcrypt.hashSync(
      newPassword,
      parseInt(process.env.BCRYPT_ROUNDS),
    );

    await account.update({ password: hashPassword });
    res.json(
      responseApi.success({
        message: "updated success",
      }),
    );
  } catch (e) {
    res.status(500).json(responseApi.error({ message: e.message }));
  }
};

const me = async (req, res) => {
  try {
    const { id } = req.userInfo;
    console.log(id);

    const user = await db.Account.findByPk(id, {
      include: [
        {
          model: db.FundAccount,
        },
        {
          model: db.GPCompanyAccount,
        },
      ],
    });
    res.json(
      responseApi.success({
        data: user,
      }),
    );
  } catch (err) {
    res.status(500).json(
      responseApi.error({
        message: err.message,
      }),
    );
  }
};

const accountController = {
  getAllAccount,
  updateAccount,
  deleteAccount,
  getAccountById,
  changePassword,
  me,
};

module.exports = accountController;
