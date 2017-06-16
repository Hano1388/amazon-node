const express = require('express');
const router = express.Router();
const { Product } = require('../models');

const reviews = require('./reviews');

// Delete product routes
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Product
    .findById(id)
      .then(product => {
        return product.destroy();
      })
        .then(() => {
          res.redirect('/products')
        })
          .catch(error => {
            next(error);
          })
})

// Products index routes
router.get('/', (req, res) => {
  Product
    .findAll()
    .then(products => {
      res.render('products/index', { products: products});
    });
});

// Product Edit routes
router.get('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  Product
    .findById(id)
    .then(product => {
      res.render('products/edit', { product })
    })
      .catch(error => {
        next(error);
      })
});

// Product update routes
router.patch('/:id', async function(req, res, next){
  const { id } = req.params;
  const { title, description, price, sale_price } = req.body;
 console.log('asdfasdfasdfd');
  try {
    const product = await Product.findById(id);
    await product.update({ title, description, price, sale_price });
    res.redirect(`/products/${product.id}`);
  } catch (error){
    next(error);
  }
});

// Products new routes
router.get('/new', (req, res) => {
  const product = Product.build();
  res.render('products/new', {product});
})

// Products create routes
router.post('/', (req, res, next) => {
  const { title, description, price, sale_price } = req.body;
  Product
    .create({ title, description, price, sale_price})
    .then(product => {
      res.redirect(`/products/${product.id}`);
    })
    .catch(error => {
      next(error);
    })
})


// Products show routes
router.get('/:id', async(req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    const reviews = await product.getReviews();
    res.render('products/show', {product, reviews});
    // res.send({product, reviews});
  } catch(error) {
    next(error);
  }
})

router.use('/:productId/reviews', reviews);
module.exports = router;
