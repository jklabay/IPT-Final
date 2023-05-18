const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const customerService = require("./customers.service");
const authorize = require("_middleware/authorize");

// routes
router.post("/create", createSchema, create);
router.get("/", getAll);    
router.get("/:id", getById);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    customerService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    customerService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    customerService.create(req.body)
        .then(() => res.json({ message: 'Customer Details Has been created' }))
        .catch(next);
}

function update(req, res, next) {
    customerService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Customer Details Has been updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    customerService.delete(req.params.id)
        .then(() => res.json({ message: 'Customer Details Has been deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        customerNumber: Joi.string(),
        customerName: Joi.string().required(),
        contactLastName: Joi.string().required(),
        contactFirstName: Joi.string().required(),
        phone: Joi.string().required(),
        addressLine1: Joi.string().required(),
        addressLine2: Joi.string().allow(null).required(),
        city: Joi.string().required(),
        state: Joi.string().allow(null).required(),  
        postalCode: Joi.string().allow(null).required(),  
        country: Joi.string().required(),  
        salesRepEmployeeNumber: Joi.string().allow(null).required(),  
        creditLimit: Joi.string().allow(null).required(),  
      });
      validateRequest(req, next, schema);
    
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        customerNumber: Joi.string().empty(""),
        customerName: Joi.string().empty(""),
        contactLastName: Joi.string().empty(""),
        contactFirstName: Joi.string().empty(""),
        phone: Joi.string().empty(""),
        addressLine1: Joi.string().empty(""),
        addressLine2: Joi.string().allow(null).empty(""),
        city: Joi.string().empty(""),
        state: Joi.string().allow(null).empty(""),  
        postalCode: Joi.string().allow(null).empty(""),  
        country: Joi.string().empty(""),  
        salesRepEmployeeNumber: Joi.string().allow(null).empty(""),  
        creditLimit: Joi.string().allow(null).empty(""),  
      });
    validateRequest(req, next, schema);
}
