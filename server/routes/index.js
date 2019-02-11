module.exports = (app, db) => {
  app.get( "/", (req, res) => {
  	console.log("Requested root");
  	res.send('Welcome to the back-end Node.js server.');
  });
  
  app.get( "/sayHello", (req, res) => {
	  console.log("Requested say hello");
	  res.send('Hello from the back-end.');
  });
}
