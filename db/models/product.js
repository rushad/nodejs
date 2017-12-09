'use strict';
module.exports = (sequelize, DataTypes) => {
    var product = sequelize.define('product', {
        manufacturer: DataTypes.STRING,
        model: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                models.product.hasMany(models.review, { foreignKey: 'productId' });
            }
        }
    });
    return product;
};