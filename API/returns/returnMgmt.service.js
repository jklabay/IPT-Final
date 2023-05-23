const db = require("_helpers/db");
const { QueryTypes } = require("sequelize");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
   return await db.Return.findAll({
   include: [
      {
        model: db.Product,
        attributes: ["productCode", "productName", "buyPrice"],
      },
      {
        model: db.Office,
        attributes: ["officeCode", "country", "city", "addressLine1"],
      },
    ],
    where: {isActive: '1'}
  });
}

async function getById(id) {
  return await getReturn(id);
}

async function create(params) {
  const returnMgmt = new db.Return(params);

  // save inventory
  await returnMgmt.save();
}

async function update(id, params) {
  const returnMgmt = await getReturn(id);

  // copy params to inventory and save
  Object.assign(returns, params);
  returnMgmt.returnDate = Date.now();
  await returnMgmt.save();

  return returnMgmt.get();
}

async function _delete(id) {
  const returnMgmt = await getReturn(id);
  
  //const inventory = await getInventory(id);
  
  returnMgmt.isActive = '0';
  await returnMgmt.save();

  return returnMgmt.get();
}

// helper functions

async function getReturn(id) {
  const returnMgmt = await db.Return.findOne({where: {isActive : 1, returnId: id}});
  if (!returnMgmt) throw "Not found";
  return returnMgmt;
}
