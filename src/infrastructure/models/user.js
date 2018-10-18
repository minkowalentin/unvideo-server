'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false

    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  // User.associate = function(models) {

  // };
  return User;
};