const { DataTypes } = require("sequelize");

module.exports = model;

/*function model(sequelize) {
  const attributes = {
    productCode: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    quantityInStock: { type: DataTypes.INTEGER, allowNull: false },
    officeCode: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define("Inventory", attributes, options);
}*/

function model(sequelize) {
  const attributes = {
    inventoryId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    officeCode: { type: DataTypes.STRING, allowNull: false },
    productCode: { type: DataTypes.STRING, allowNull: false },
    quantityAvailable: { type: DataTypes.INTEGER, allowNull: false },
    lastUpdated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
    isActive: { type: DataTypes.CHAR, defaultValue: '1', allowNull: false}
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define("Inventory", attributes, options);
}
