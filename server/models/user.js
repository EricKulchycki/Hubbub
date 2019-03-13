module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: DataTypes.STRING,
	  password: DataTypes.STRING,
      email: DataTypes.STRING,
	  firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
	  picture: DataTypes.STRING,
	  age: DataTypes.INTEGER
    },
    {
      freezeTableName: true,
    }
  );

  return User;
}