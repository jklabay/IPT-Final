const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    orderNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    orderDate: { type: DataTypes.DATE, allowNull: false },
    requiredDate: { type: DataTypes.DATE, allowNull: false },
    shippedDate: { type: DataTypes.DATE, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: false },
    comments: { type: DataTypes.STRING, allowNull: true },
    customerNumber: { type: DataTypes.INTEGER, allowNull: false },
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define("Order", attributes, options);
}