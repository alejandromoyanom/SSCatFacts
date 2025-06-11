const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");
const User = require("./User");

const CatFact = sequelize.define(
  "CatFact",
  {
    factText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["UserId", "factText"],
      },
    ],
  }
);

User.hasMany(CatFact, { foreignKey: "UserId" });
CatFact.belongsTo(User, { foreignKey: "UserId" });

module.exports = CatFact;
