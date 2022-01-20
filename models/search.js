"use strict";
const { Model } = require("sequelize");
const _ = require("lodash");
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
      ...val,
    });
  };

  Search.getSearchHistory = function (val) {
    console.log(val);
    if (_.isEqual(val.limit, 0)) {
      console.log("im mexecuting");
      return this.findAll({
        where: {
          userId: val.userId,
        },
        order: [["createdAt", "DESC"]],
      });
    }
    return this.findAll({
      where: {
        userId: val.userId,
      },
      limit: val.limit,
      order: [["createdAt", "DESC"]],
      // limit: parseInt(val.limit),
    });
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
