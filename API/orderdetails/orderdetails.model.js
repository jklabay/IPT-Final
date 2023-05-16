const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    orderNumber: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    productCode: { type: DataTypes.STRING, allowNull: false },
    quantityOrdered: { type: DataTypes.STRING, allowNull: false },
    priceEach: { type: DataTypes.DECIMAL, allowNull: false },
    orderLineNumber: { type: DataTypes.INTEGER, allowNull: false },


  };

  const options = {
    timestamps: false,
  };

  return sequelize.define("orderDetails", attributes, options);
}