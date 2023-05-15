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
  return await db.productLine.findAll();
}

async function getById(id) {
  return await getUser(id);
}

async function create(params) {
  // validate
  if (
    await db.productLine.findOne({ where: { productLine: params.productLine } })
  ) {
    throw 'ProductLine "' + params.productLine + '" is already created';
  }

  const productLine = new db.productLine(params);

  // save Product
  await productLine.save();
}

async function update(id, params) {
  const productLine = await getUser(id);

  // copy params to Product and save
  Object.assign(productLine, params);
  await productLine.save();

  return productLine.get();
}

async function _delete(id) {
  const productLine = await getUser(id);
  await productLine.destroy();
}

// helper functions

async function getUser(id) {
  const productLine = await db.productLine.findByPk(id);
  if (!productLine) throw "Product not found";
  return productLine;
}


