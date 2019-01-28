module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: DataTypes.STRING,
	  password: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {
      freezeTableName: true,
    }
  );

  return User;
}