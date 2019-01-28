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
  var user = { 
    name: req.user.displayName,
    photo: req.user.photos[0].value.replace(/sz=50/gi, 'sz=250')
  }
  userClass.getUser(req.app, db, req.user.emails[0].value).then((foundUser) => {
		if(foundUser) {
			console.log("User Exists");
			io.in(req.session.socketId).emit('google', user);
		} else {
			userClass.createUser(req.app, db, req.user).then((createdUser) => {
				console.log("Created User");
				console.log(createdUser);
				io.in(req.session.socketId).emit('google', user);
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