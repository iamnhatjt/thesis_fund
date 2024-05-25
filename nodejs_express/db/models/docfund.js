"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class docFund extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      docFund.belongsTo(models.Fund);
    }
  }
  docFund.init(
    {
      doc: DataTypes.STRING,
      description: DataTypes.STRING,
      fileName: DataTypes.STRING,
      FundId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Funds",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "docFund",
    }
  );
  return docFund;
};
