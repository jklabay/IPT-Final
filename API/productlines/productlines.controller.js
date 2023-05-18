const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const productLineService = require("./productlines.service");


// routes

router.post("/create", createSchema, create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
  productLineService
    .getAll()
    .then((products) => res.json(products))
    .catch(next);
}

function getById(req, res, next) {
  productLineService
    .getById(req.params.id)
    .then((product) => res.json(product))
    .catch(next);
}

function create(req, res, next) {
  productLineService
    .create(req.body)
    .then(() => res.json({ message: "productLine created" }))
    .catch(next);
}

function update(req, res, next) {
  productLineService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "productLine updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  productLineService
    .delete(req.params.id)
    .then(() => res.json({ message: "productLine deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    productLine: Joi.string().required(),
    textDescription: Joi.string().required(null),
    htmlDescription: Joi.string().required(null),
    image: Joi.string().required(null)
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    productLine: Joi.string().required(),
    textDescription: Joi.string().required(),
    htmlDescription: Joi.string().required(),
    image: Joi.string().required()
  });
  validateRequest(req, next, schema);
}