const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    returnId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,allowNull: false },
    productCode: { type: DataTypes.STRING, allowNull: false },
    officeCode: { type: DataTypes.STRING, allowNull: false },
    returnedQuantity: { type: DataTypes.INTEGER, allowNull: false },
    returnDate: { type: DataTypes.DATE, allowNull: false },
    reason: { type: DataTypes.STRING, allowNull: false }
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define("Return", attributes, options);
}
