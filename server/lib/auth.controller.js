const userClass = require("../modules/users/user");
const db = require("../models");

exports.twitter = (req, res) => {
	const io = req.app.get('io')
	const user = { 
		name: req.user.username,
		photo: req.user.photos[0].value.replace(/_normal/, '')
	}
	io.in(req.session.socketId).emit('twitter', user)
	res.end()
}

exports.google = (req, res) => {
	const io = req.app.get('io')
	//foundUser is a user from the database
	userClass.getUser(req.app, db, req.user.emails[0].value).then((foundUser) => {
			if (foundUser) {
				console.log("User Exists");
				//.dataValues is part of the sequelize library, accesses values of the user.
				foundUser.dataValues.photo = req.user.photos[0].value.replace(/sz=50/gi, 'sz=250');
				//emit sends the data over the socket to the client
				io.in(req.session.socketId).emit('google', foundUser);
			} else {
				userClass.createUser(req.app, db, req.user).then((createdUser) => {
					console.log("Created User");
					createdUser.dataValues.photo = req.user.photos[0].value.replace(/sz=50/gi, 'sz=250');
					io.in(req.session.socketId).emit('google', createdUser);
				});
			}
  });
  res.end()
}

exports.facebook = (req, res) => {
	const io = req.app.get('io')
	const { givenName, familyName } = req.user.name
	const user = { 
		name: `${givenName} ${familyName}`,
		photo: req.user.photos[0].value
	}
	io.in(req.session.socketId).emit('facebook', user)
	res.end()
}

exports.github = (req, res) => {
	const io = req.app.get('io')
	const user = { 
		name: req.user.username,
		photo: req.user.photos[0].value
	}
	io.in(req.session.socketId).emit('github', user)
	res.end()
} 