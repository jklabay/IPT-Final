const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const orderDetailsService = require("./orderdetails.service");

// routes


router.post("/create", createSchema, create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  orderDetailsService
    .getAll()
    .then((orderdetails) => res.json(orderdetails))
    .catch(next);
}

function getById(req, res, next) {
  orderDetailsService
    .getById(req.params.id)
    .then((orderdetail) => res.json(orderdetail))
    .catch(next);
}

function create(req, res, next) {
  orderDetailsService
    .create(req.body)
    .then(() => res.json({ message: "orders created" }))
    .catch(next);
}

function update(req, res, next) {
  orderDetailsService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "orders updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  orderDetailsService
    .delete(req.params.id)
    .then(() => res.json({ message: "orders deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    orderNumber: Joi.string().empty(""),
    productCode: Joi.string().empty(""),
    quantityOrdered: Joi.string().empty(""),
     priceEach: Joi.string().empty(""),
    orderLineNumber: Joi.string().allow().empty(""),

    
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
   orderNumber: Joi.string().empty(""),
    productCode: Joi.string().empty(""),
    quantityOrdered: Joi.string().empty(""),
     priceEach: Joi.string().empty(""),
    orderLineNumber: Joi.string().allow().empty(""),


  })
  validateRequest(req, next, schema);
}