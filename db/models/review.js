'use strict';
module.exports = (sequelize, DataTypes) => {
    var review = sequelize.define('review', {
        productId: DataTypes.INTEGER,
        review: DataTypes.TEXT
    }, {
        classMethods: {
            associate: function(models) {
                models.review.belongsTo(models.product, { foreignKey: 'productId' });
            }
        }
    });
    return review;
};