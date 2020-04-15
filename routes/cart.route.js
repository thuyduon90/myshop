var express = require('express');

var controller = require('../controllers/cart.controller');

var router = express.Router();

router.get('/', controller.addToCart);

module.exports = router;