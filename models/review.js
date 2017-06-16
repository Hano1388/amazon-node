'use strict';
module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    content: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  });
  Review.associate = function({ Product }) {
    Review.belongsTo(Product);
  };
  return Review;
};
