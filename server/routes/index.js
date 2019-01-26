module.exports = (app) => {
  app.get( "/sayHello", (req, res) => {
	console.log("Requested say hello");
	res.send('Hello from the back-end.');
  });
}
