module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      category: {
        type: DataTypes.ENUM('MOVIE', 'TV-SHOW', 'VIDEO GAME', 'COMIC')
      },
	  title: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      body: DataTypes.STRING,
	  spoiler: DataTypes.BOOLEAN,
    },
    {
      freezeTableName: true,
    }
  );
  
  Post.associate = (models) => {
	  Post.belongsTo(models.user, {
		  foreignKey: 'userId',
		  constraints: false
  	});
};

  return Post;
}