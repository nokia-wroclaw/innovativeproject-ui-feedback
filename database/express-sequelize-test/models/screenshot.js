'use strict';
module.exports = (sequelize, DataTypes) => {
	const Screenshot = sequelize.define('Screenshot', {
		title: DataTypes.STRING
	}, {});
	Screenshot.associate = function (models) {
		// associations can be defined here
	};
	return Screenshot;
};