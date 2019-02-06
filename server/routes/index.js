module.exports = (app, db) => {
  app.get( "/", (req, res) => {
	console.log("Requested root");
	res.send('Welcome to the back-end Node.js server.');
  });
  
  app.get( "/sayHello", (req, res) => {
	console.log("Requested say hello");
	res.send('Hello from the back-end.');
  });
		//create post will have different values send in the message body
		//should be sent in JSON, then must parse and store in db
		app.put("/createpost/", (req, res) => 
			db.posts.store({
				
			});	
		);
}
