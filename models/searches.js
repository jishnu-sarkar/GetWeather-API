"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Search extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Search.belongsTo(models.User);
      models.User.hasMany(Search);
    }
  }
  Search.init(
    {
      searchItem: DataTypes.STRING,
      userMail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Search",
    }
  );
  return Search;
};
