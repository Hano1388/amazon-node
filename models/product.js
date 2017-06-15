'use strict';
module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DOUBLE,
    sale_price: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Product;
};