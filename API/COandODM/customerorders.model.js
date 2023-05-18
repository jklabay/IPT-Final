const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        customerNumber: { type: DataTypes.STRING, allowNull: false , foriegnKey: true},
        orderNumber: { type: DataTypes.STRING, allowNull: false , primaryKey: true},
        quantityOrdered: { type: DataTypes.STRING, allowNull: false},
        orderDate: { type: DataTypes.DATE, allowNull: false},
        status: { type: DataTypes.STRING, allowNull: false},
        comments: { type: DataTypes.STRING, allowNull: false},
    };

    const options = {
        timestamps: false
      };

    return sequelize.define("customerorder", attributes, options);
}
