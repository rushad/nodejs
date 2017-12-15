'use strict';
module.exports = (sequelize, DataTypes) => {
    var user = sequelize.define('user', {
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        gender: DataTypes.BOOLEAN
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return user;
};
