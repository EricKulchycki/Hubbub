module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define('friend', {
        id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		userId: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
	  defaultScope: {
		attributes: { exclude: ['id', 'updatedAt'] },
	  }
    }
  );
  
  Friend.associate = (models) => {
	Friend.belongsTo(models.user, {
		foreignKey: 'friendId',
		constraints: false
	});
};

  return Friend;
}