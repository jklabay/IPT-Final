const db = require("_helpers/db");
const { QueryTypes } = require("sequelize");

module.exports = {
  getAll,
  getCustomerOrder,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  // return await db.sequelize.query(
  //   `SELECT o.*, od.* FROM orders o JOIN orderdetails od ON o.orderNumber = od.orderNumber`,
  //   {
  //     type: QueryTypes.SELECT,
  //   }
  // );

  return await db.Orders.findAll();
}

async function getCustomerOrder(id) {
  return await db.Orders.findAll({ where: { customerNumber: id } });
}

async function getById(id) {
  return await getOrder(id);
}

async function create(params) {
  // validate
  if (await db.Orders.findOne({ where: { orderNumber: params.orderNumber } })) {
    throw 'Order "' + params.orderNumber + '" is already registered';
  }

  const order = new db.Orders(params);
  // db.sequelize.query(`INSERT INTO payments (customerNumber,checkNumber,paymentDate,amount,paymentType,status) VALUES (${params.customerNumber},${(Math.random()*1000).toString()},null,${params. )`)
  // save order
  await order.save();
}

async function update(id, params) {
  const order = await getOrder(id);

  // validate
  const orderChanged =
    params.orderNumber && order.orderNumber !== params.orderNumber;
  if (
    orderChanged &&
    (await db.Orders.findOne({ where: { orderNumber: params.orderNumber } }))
  ) {
    throw 'Order "' + params.orderNumber + '" is already registered';
  }

  // copy params to order and save
  Object.assign(order, params);
  await order.save();

  return order.get();
}

async function _delete(id) {
  const order = await getOrder(id);
  await order.destroy();
}

// helper functions

async function getOrder(id) {
  const order = await db.Orders.findByPk(id);
  if (!order) throw "Order not found";
  return order;
}