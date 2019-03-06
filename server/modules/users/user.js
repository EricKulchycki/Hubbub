var self = module.exports = {
  
  // Asynch getUser by email, returns a promise
  getUser: function (app, db, userEmail) {
	return db.user.findOne({
  		where: {
  			email: userEmail
		}
  	}).then(foundUser => {
		return foundUser; 
	});
  },
  
  // Asynch createUser by email, returns a promise
  createUser: function (app, db, user) {
	var currentTimeStamp = new Date();
	return db.user.create({
      username: user.emails[0].value,
      password: "",
      email: user.emails[0].value,
      firstName: user.name.givenName,
	  lastName: user.name.familyName,
	  picture: user.photos[0].value,
      createdAt: currentTimeStamp.toISOString(),
      updatedAt: currentTimeStamp.toISOString()
  	}).then(createdUser => {
		return createdUser; 
	});
  },

}