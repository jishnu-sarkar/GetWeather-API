"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Searches", {
      fields: ["userId"],
      type: "foreign key",
      name: "user-search-association",
      references: {
        table: "Users",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Searches", {
      fields: ["userId"],
      type: "foreign key",
      name: "user-search-association",
      references: {
        table: "Users",
        field: "id",
      },
    });
  },
};
