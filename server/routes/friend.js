module.exports = (app, db) => {
	
	const friendModule = require("../modules/friends/friend");
  
	app.get("/api/v1/friend/:id", (req, res) => {
		console.log("Getting all friends for user " + req.params.id);
		friendModule.getFriends(app, db, req.params.id).then( (result) => res.json(result) );
	});
	
	app.post("/api/v1/friend/create", (req, res) => {
		console.log("Requested new friend creation");
		console.log(req.body);
		if (!req.body.userId || !req.body.friendId) {
			res.send("Missing userId or friendId");
			return;
		}
		db.friend.create({
			userId: req.body.userId,
			friendId: req.body.friendId
		}).then( (result) => res.json(result) );
	});

	app.post("/api/v1/friend/delete", (req, res) => {
		console.log("Requested friend deletion");
		console.log(req.body);
		if (!req.body.userId || !req.body.friendId) {
			res.send("Missing userId or friendId");
			return;
		}
		db.friend.destroy({
			where: {
				userId: req.body.userId,
				friendId: req.body.friendId
			}
		}).then( (result) => res.json(result) );
	});
}
