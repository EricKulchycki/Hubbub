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
}
