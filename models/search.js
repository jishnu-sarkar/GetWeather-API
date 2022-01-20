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
    }
  }
  Search.insertSearchData = function (val) {
    return this.create({
      // id: val.id,
      // searchItem: val.searchItem,
      // userId: val.userId,
      ...val,
    });
  };

  Search.getSearchHistory = function (id) {
    return this.findByPk(id);
  };

  Search.init(
    {
      searchItem: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Search",
    }
  );
  return Search;
};
