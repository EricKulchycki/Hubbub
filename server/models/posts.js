module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('posts', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        //Attributes go here
      },
      {
        freezeTableName: true,
      }
    );
  
    return User;
  }