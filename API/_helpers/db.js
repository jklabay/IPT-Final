const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.sequelize = sequelize; //for raw query
    db.Employee = require('../employees/employee.model')(sequelize);
    db.Office = require('../offices/office.model')(sequelize);
    db.Customer = require('../customers/customers.model')(sequelize);
    db.Product = require('../products/products.model')(sequelize);
    db.productLine = require('../productlines/productlines.model')(sequelize);
    db.payments = require('../payments/payment.model')(sequelize);
    db.Orders = require('../orders/orders.model')(sequelize);
    db.orderDetails = require('../orderdetails/orderdetails.model')(sequelize);
    db.Inventory = require("../inventories/inventory.model")(sequelize);
    db.Return = require("../returns/returnMgmt.model")(sequelize);

    db.Employee.belongsTo(db.Office, { foreignKey: "officeCode" });
    db.Inventory.belongsTo(db.Product, { foreignKey: "productCode" });
    db.Inventory.belongsTo(db.Office, { foreignKey: "officeCode" });
    db.Inventory.belongsTo(db.Product, { foreignKey:"productName" });
    db.Return.belongsTo(db.Product, { foreignKey: "productCode" });
    db.Return.belongsTo(db.Office, { foreignKey: "officeCode" });

    // sync all models with database
    await sequelize.sync();
}