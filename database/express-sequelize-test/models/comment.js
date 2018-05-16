'use strict';
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        x: DataTypes.DOUBLE,
        y: DataTypes.DOUBLE,
        description: DataTypes.STRING
    }, {});
    Comment.associate = function (models) {

        Comment.belongsTo(models.Screenshot, {
            foreignKey: 'ScreenshotId',
            onDelete: 'CASCADE'

        })
    };
    return Comment;
};