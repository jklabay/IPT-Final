const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        orderNumber: { type: DataTypes.STRING, allowNull: false , primaryKey: true},
        orderDate: { type: DataTypes.DATE, allowNull: false},
        requiredDate: { type: DataTypes.DATE, allowNull: false},
        shippedDate: { type: DataTypes.DATE, allowNull: false},
        status: { type: DataTypes.STRING, allowNull: false},
        comments: { type: DataTypes.STRING, allowNull: false},
        customerNumber:{ type: DataTypes.STRING, allowNull: false, foriegnKey: true}
    };

    const options = {
        timestamps: false
      };

    return sequelize.define("Orders", attributes, options);
}
