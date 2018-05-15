'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    topic: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {

      Comment.belongsTo(models.User,{
          foreignKey: 'UserId'

      })
  };
  return Comment;
};