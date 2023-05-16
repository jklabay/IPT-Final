// const bcrypt = require('bcryptjs');
const db = require("_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.payments.findAll();
}

async function getById(id) {
  return await getUser(id);
}

async function create(params) {
  // validate
  if (
    await db.payments.findOne({ where: { customerNumber: params.customerNumber } })
  ) {
    throw 'custumerNumber  "' + params.customerNumber + '" is already created';
  }

  const customerNumber = new db.payments(params);

  // save Product
  await customerNumber.save();
}

async function update(id, params) {
  const customerNumber = await getUser(id);

  // copy params to Product and save
  Object.assign(customerNumber, params);
  await customerNumber.save();

  return customerNumber.get();
}

async function _delete(id) {
  const customerNumber = await getUser(id);
  await customerNumber.destroy();
}

// helper functions

async function getUser(id) {
  const customerNumber = await db.payments.findByPk(id);
  if (!customerNumber) throw "Product not found";
  return customerNumber;
}


