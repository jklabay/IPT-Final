const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const ordersService = require("./orders.service");
const authorize = require("_middleware/authorize");

// routes


router.post("/create", createSchema, create);
router.get("/", authorize, getAll);
router.get("/:id", authorize, getById);
router.put("/:id", authorize, updateSchema, update);
router.delete("/:id", authorize, _delete);

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
    orderNumber: Joi.string().required(),
    orderDate: Joi.string().required(),
    requiredDate: Joi.string().required(),
    shippedDate: Joi.string().required(),
    status: Joi.string().required(),
    comments: Joi.string().required(),
    customerNumber: Joi.string().required(),
    
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    orderNumber: Joi.string().empty(""),
    orderDate: Joi.string().empty(""),
    requiredDate: Joi.string().empty(""),
    shippedDate: Joi.string().empty(""),
    status: Joi.string().empty(""),
    comments: Joi.string().empty(""),
    customerNumber: Joi.string().empty(""),

  })
  validateRequest(req, next, schema);
}