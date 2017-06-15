'use strict';
const faker = require('faker');
const { Product } = require('../models');

const products = Array.from({length: 100})
  .map(() => {
    return Product.create({
      title: faker.hacker.noun(),
      description: faker.hacker.phrase(),
      price: Math.floor(Math.random() * 1000),
      sale_price: Math.floor(Math.random() * 1000)
    });
  })

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all(products);
  },

  down: function (queryInterface, Sequelize) {
    return Product.destroy({where: {}})
  }
};
