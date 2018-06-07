'use strict';
module.exports = (sequelize, DataTypes) => {
  const Response = sequelize.define('Response', {

    description: DataTypes.STRING
  }, {});
  Response.associate = function(models) {

    Response.belongsTo(models.Comment, {
        foreignKey: 'commentId',
        onDelete: 'CASCADE'
    })
  };
  return Response;
};