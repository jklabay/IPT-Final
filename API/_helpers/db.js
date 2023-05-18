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
    db.Employee = require('../employees/employee.model')(sequelize);
    db.Office = require('../offices/office.model')(sequelize);
    db.Customer = require('../customers/customers.model')(sequelize);
    db.Product = require('../products/products.model')(sequelize);
    db.productLine = require('../productlines/productlines.model')(sequelize);
    db.payments = require('../payments/payment.model')(sequelize);
    db.Orders = require('../orders/orders.model')(sequelize);
    db.orderDetails = require('../orderdetails/orderdetails.model')(sequelize);

    // sync all models with database
    await sequelize.sync();
}