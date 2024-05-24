"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FundAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FundAccount.belongsTo(models.Fund);
      FundAccount.belongsTo(models.Account);
    }
  }
  FundAccount.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      FundId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Funds",
          key: "id",
        },
      },
      AccountId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Accounts",
          key: "id",
        },
      },
      money: DataTypes.INTEGER,
      description: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "FundAccount",
    }
  );
  return FundAccount;
};
