"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class docGP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      docGP.belongsTo(models.GpCompany);
    }
  }
  docGP.init(
    {
      doc: DataTypes.STRING,
      description: DataTypes.STRING,
      fileName: DataTypes.STRING,
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
      modelName: "DocGP",
    }
  );
  return docGP;
};
