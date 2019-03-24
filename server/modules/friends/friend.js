var self = module.exports = {
  
	// Asynch getFriends by userId, returns a promise
	getFriends: function (app, db, usersId) {
		return db.friend.findAll({
			where: {
				userId: usersId
			},
			include: [db.user]
		}).then(foundFriends => {
			return foundFriends; 
		});
	},
}