module.exports = (app, db) => {
  
  app.get("/api/v1/friend/:id", (req, res) => {
  	console.log("Getting all friends for user " + req.params.id);
  	db.friend.findAll({
  		where: {
  			userId: req.params.id
  		},
		include: [db.user]
  	}).then( (result) => res.json(result) );
  });
 
  app.post("/api/v1/friend/create", (req, res) => {
    console.log("Requested new friend creation");
  	console.log(req.body);
    db.friend.create({
      userId: req.body.userId,
      friendId: req.body.friendId
    }).then( (result) => res.json(result) );
  });
}
