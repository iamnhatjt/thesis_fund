"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GpCompany extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.GpCompany.belongsToMany(models.Account, {
        through: models.GPCompanyAccount,
      });
      models.GpCompany.hasMany(models.GPCompanyAccount);

      //Associate with Fund
      GpCompany.hasMany(models.Fund);
      GpCompany.hasMany(models.DocGP);
    }
  }
  GpCompany.init(
    {
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "GpCompany",
    }
  );
  return GpCompany;
};
