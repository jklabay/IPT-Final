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
    inventoryId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    officeCode: { type: DataTypes.STRING, allowNull: false },
    productCode: { type: DataTypes.STRING, allowNull: false },
    quantityAvailable: { type: DataTypes.INTEGER, allowNull: false },
    lastUpdated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW ,allowNull: true }
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define("Inventory", attributes, options);
}
