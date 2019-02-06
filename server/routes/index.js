module.exports = (app, db) => {
		app.get( "/sayHello", (req, res) => {
		console.log("Requested say hello");
		res.send('Hello from the back-end.');
		});
		
		app.get("/user/:id", (req, res) => 
			db.user.findOne({
				where: {
					id: req.params.id
				}
			}).then( (result) => res.json(result) )
		);

		//create post will have different values send in the message body
		//should be sent in JSON, then must parse and store in db
		app.put("/createpost/", (req, res) => 
			db.posts.store({
				
			});	
		);
	



}
