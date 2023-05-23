const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const returnService = require("./returnMgmt.service");
const returnMgmtService = require("./returnMgmt.service");

// routes

router.post("/create", createSchema, create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  returnMgmtService
    .getAll()
    .then((returnMgmt) => res.json(returnMgmt))
    .catch(next);
}

function getById(req, res, next) {
  returnMgmtService
    .getById(req.params.id)
    .then((returnMgmt) => res.json(returnMgmt))
    .catch(next);
}

function create(req, res, next) {
  returnMgmtService
    .create(req.body)
    .then(() => res.json({ message: "Return product created" }))
    .catch(next);
}

function update(req, res, next) {
  returnMgmtService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "Return product updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  returnMgmtService
    .delete(req.params.id)
    .then(() => res.json({ message: "Return product is deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    productCode: Joi.string().required(),
    officeCode: Joi.string().required(),
    returnedQuantity: Joi.number().required(),
    reason: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    officeCode: Joi.string().required(),
    returnedQuantity: Joi.number().required(),
    reason: Joi.string().required()
  });
  validateRequest(req, next, schema);
}
