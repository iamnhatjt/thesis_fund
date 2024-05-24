"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Account.belongsToMany(models.GpCompany, {
        through: models.GPCompanyAccount,
      });
      models.Account.hasMany(models.GPCompanyAccount);

      // associate with Fund
      Account.belongsToMany(models.Fund, {
        through: models.FundAccount,
      });
      Account.hasMany(models.FundAccount);
    }
  }
  Account.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
      },
      address: DataTypes.STRING,
      education: DataTypes.STRING,
      dob: DataTypes.DATE,
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          },
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Account",
    }
  );
  return Account;
};
