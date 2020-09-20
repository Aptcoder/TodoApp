'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    todoAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
      onDelete: 'CASCADE'
    })
  };
  return Todo;
};