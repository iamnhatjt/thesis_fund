"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fund extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Fund.belongsTo(models.GpCompany);

      // associate with account
      Fund.belongsToMany(models.Account, {
        through: models.FundAccount,
      });
      Fund.hasMany(models.FundAccount);
    }
  }
  Fund.init(
    {
      name: DataTypes.STRING,
      status: DataTypes.STRING,
      invested: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      percentUsed: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      GpCompanyId: {
        type: DataTypes.INTEGER,
        references: {
          model: "GpCompanies",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Fund",
    }
  );
  return Fund;
};
