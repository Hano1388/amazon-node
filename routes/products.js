const express = require('express');
const router = express.Router();
const { Product } = require('../models');

router.get('/', (req, res) => {
  Product
    .findAll()
    .then(products => {
      res.render('products/index', { products: products});
    });
});

module.exports = router;
