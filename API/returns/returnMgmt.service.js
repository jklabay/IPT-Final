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
        attributes: ["officeCode", "city", "country"],
      },
    ],
  });
  /*return await db.sequelize.query(
    `SELECT  i.inventoryId, country, CONCAT(o.city, ", ", o.addressLine1) as officeAddress,
            p.productName, i.quantityAvailable, i.lastUpdated
    FROM inventories i JOIN offices o ON i.officeCode = o.officeCode
                       JOIN products p ON i.productCode = p.productCode
    ORDER BY country,productName`,
    {
      type: QueryTypes.SELECT,
    }
  );*/
}

async function getById(id) {
  return await getInventory(id);
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
  await returnMgmt.save();

  return returnMgmt.get();
}

async function _delete(id) {
  const returnMgmt = await getReturn(id);
  await returnMgmt.destroy();
}

// helper functions

async function getReturn(id) {
  const returnMgmt = await db.Return.findByPk(id);
  if (!returnMgmt) throw "Not found";
  return returnMgmt;
}
