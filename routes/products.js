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


router.get('/:id', async(req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.render('products/show', {product})
  } catch(error) {
    next(error);
  }
})
module.exports = router;
