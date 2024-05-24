"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GPCompanyAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      GPCompanyAccount.belongsTo(models.Account);
      GPCompanyAccount.belongsTo(models.GpCompany);
    }
  }
  GPCompanyAccount.init(
    {
      AccountId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Accounts",
          key: "id",
        },
      },
      GpCompanyId: {
        type: DataTypes.INTEGER,
        references: {
          model: "GpCompanies",
          key: "id",
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "GPCompanyAccount",
    }
  );
  return GPCompanyAccount;
};
