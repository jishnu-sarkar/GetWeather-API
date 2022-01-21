"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.findUser = function (val) {
    // console.log(val);
    return this.findOne({ where: { email: val } });
  };

  User.createUser = function (val) {
    return this.create({
      ...val,
    });
  };

  // User.fetchUser = function (val) {
  //   // console.log(val);
  //   return this.findAll({
  //     where: {
  //       email: val.email,
  //     },
  //   });
  // };

  // User.deleteUsers = function () {
  //   return this.destroy({
  //     where: {},
  //     truncate: true,
  //   });
  // };

  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
