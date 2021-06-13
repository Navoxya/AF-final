const express = require('express');
const router = express.Router();
const controller = require('../controllers/food.controller');

module.exports = function () {
    router.post('/create', controller.createFood);
    router.get('/', controller.getAllFoods);
    router.post('/calculate', controller.calculateBill);
    return router;
}