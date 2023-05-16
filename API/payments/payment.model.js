const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    customerNumber: { type: DataTypes.STRING, allowNull: false,  primaryKey: true},
    checkNumber: { type: DataTypes.STRING, allowNull: false },
    paymentDate: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.STRING, allowNull: false }

  };

  const options = {
    timestamps: false,
  };

  return sequelize.define("payments", attributes, options);
}