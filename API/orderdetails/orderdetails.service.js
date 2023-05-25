const bcrypt = require("bcryptjs");
const db = require("_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.orderDetails.findAll({
    limit: 20,
  });
}

async function getById(id) {
  return await getUser(id);
}

async function create(params) {
  // validate
  if (await db.orderDetails.findOne({ where: { orderNumber : params.orderNumber  } })) {
    throw 'orderNumber "' + params.orderNumber  + '" is already registered';
  }

  const orderdetails = new db.orderDetails(params);

  // save orderdetails
  await orderdetails.save();
}

async function update(id, params) {
  const orderdetails = await getUser(id);

  // copy params to orderdetails and save
  Object.assign(orderdetails, params);
  await orderdetails.save();

  return orderdetails.get();
}

async function _delete(id) {
  const orderdetails = await getUser(id);
  await orderdetails.destroy();
}

// helper functions

async function getUser(id) {
  const orderdetails = await db.orderDetails.findByPk(id);
  if (!orderdetails) throw "Order Details not found";
  return orderdetails;
}

