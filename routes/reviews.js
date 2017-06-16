const express = require('express');
const router = express.Router({mergeParams: true });

const { Review } = require('../models');

// Delete review routes
router.delete('/:id', (req, res, next) => {
  const { id, productId } = req.params;
  Review
    .findById(id)
    .then(review => {
      return review.destroy();
    })
      .then(() => {
        res.redirect(`/products/${productId}`)
      })
        .catch(error => {
          next(error);
        })
});

// Edit review routes
router.get('/:id/', (req, res, next) => {
  const { id } = req.params;

  Review
    .findById(id)
    .then(review => {
      res.render('reviews/edit', { review });
    })
      .catch(error => {
        next(error);
      })
});

// update review routes
router.patch('/:id', async function (req, res, next) {
  const { id } = req.params;
  const { content, rating } = req.body;

  try {
    const review = await Review.findById(id);
    await review.update({ content, rating });
    // res.redirect(`/reviews/${review.id}`);
    res.redirect(`/products/${review.ProductId}`);
  } catch (error) {
    next(error);
  }
});

// create Review routes
router.post('/', async(req, res, next) => {
  const{ productId } = req.params;
  const{ content, rating } = req.body;

  try {
    const review = await Review.create({
      ProductId: productId,
      content: content,
      rating: rating
    });
    res.redirect(`/products/${productId}`);
    // res.send(review);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
