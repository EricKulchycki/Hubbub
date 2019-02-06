var self = module.exports = {

  checkUser: function (app, db, user) {
	if(user) {
		console.log("Done Printing User");
		console.log(user.emails[0].value);
		var email = user.emails[0].value;
		if (email) {
			return self.getUser(app, db, email).then((foundUser) => {
				if (foundUser == undefined || foundUser == null) {
					self.createUser(app, db, user).then((createdUser) => {
						console.log("Created User is: " + createdUser.username);
						app.locals.user = createdUser;
					});
				} else {
					console.log("User Exists, not registering");
					app.locals.user = foundUser;
				}
					
			});
		}
	} else {
		console.log("Warning: Recieved an undefined user");
		app.locals.user = null;
	}
  },
  
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
      createdAt: currentTimeStamp.toISOString(),
      updatedAt: currentTimeStamp.toISOString()
  	}).then(createdUser => {
		return createdUser; 
	});
  },

}