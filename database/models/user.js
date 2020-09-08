module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Todo, {
      foreignKey: 'userId',
      as: 'todos',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
