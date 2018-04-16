'use strict';
module.exports = (sequelize, DataTypes) => {
  var Screenshot = sequelize.define('Screenshot', {
    title: DataTypes.STRING
  }, {});
  Screenshot.associate = function(models) {
    // associations can be defined here
  };
  return Screenshot;
};