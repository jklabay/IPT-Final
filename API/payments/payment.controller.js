const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const paymentService = require("./payment.service");
const authorize = require("_middleware/authorize");

// routes

router.post("/create", authorize, createSchema, create);
router.get("/", authorize, getAll);
router.get("/:id", authorize, getById);
router.put("/:id", authorize, updateSchema, update);
router.delete("/:id", authorize, _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  paymentService
    .getAll()
    .then((products) => res.json(products))
    .catch(next);
}

function getById(req, res, next) {
  paymentService
    .getById(req.params.id)
    .then((product) => res.json(product))
    .catch(next);
}

function create(req, res, next) {
  paymentService
    .create(req.body)
    .then(() => res.json({ message: "payment created" }))
    .catch(next);
}

function update(req, res, next) {
  paymentService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "payment updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  paymentService
    .delete(req.params.id)
    .then(() => res.json({ message: "payment deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    customerNumber: Joi.string().required(),
    checkNumber: Joi.string().required(),
    paymentDate: Joi.string().required(),
    amount: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    customerNumber: Joi.string().required(),
    checkNumber: Joi.string().required(),
    paymentDate: Joi.string().required(),
    amount: Joi.string().required()
  });
  validateRequest(req, next, schema);
}