module.exports = (app, db) => {
  
    app.get("/", (req, res) => {
        res.send('Welcome to the back-end Node.js server. Please read the REST docs for information about the endpoints.');
    });

}
