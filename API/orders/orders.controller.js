const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const ordersService = require("./orders.service");


// routes


router.post("/create", createSchema, create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  ordersService
    .getAll()
    .then((orders) => res.json(orders))
    .catch(next);
}

function getById(req, res, next) {
  ordersService
    .getById(req.params.id)
    .then((order) => res.json(order))
    .catch(next);
}

function create(req, res, next) {
  ordersService
    .create(req.body)
    .then(() => res.json({ message: "orders created" }))
    .catch(next);
}

function update(req, res, next) {
  ordersService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "orders updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  ordersService
    .delete(req.params.id)
    .then(() => res.json({ message: "orders deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    orderNumber: Joi.number().required(),
    orderDate: Joi.date().required(),
    requiredDate: Joi.date().required(),
    shippedDate: Joi.date().allow(null).required(),
    status: Joi.string().required(),
    comments: Joi.string().allow(null).required(),
    customerNumber: Joi.number().required(),
    
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    orderNumber: Joi.string().empty(""),
    orderDate: Joi.date().empty(""),
    requiredDate: Joi.date().empty(""),
    shippedDate: Joi.date().empty(""),
    status: Joi.string().empty(""),
    comments: Joi.string().empty(""),
    customerNumber: Joi.number().empty(""),

  })
  validateRequest(req, next, schema);
}