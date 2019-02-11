var bodyParser = require("body-parser"); 
var createError = require('http-errors');
var express = require('express'); 
var path = require('path');
var cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
const http = require('http')
const socketio = require('socket.io')
const authRouter = require('./lib/auth.router')
const passportInit = require('./lib/passport.init')
const { SESSION_SECRET, CLIENT_ORIGIN } = require('./config/socialmedia')
const app = express()

app.use(morgan('combined'));

// Constants
const APP_PORT = 4000;
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const friendRouter = require("./routes/friend");
const db = require("./models");

var server = http.createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize())
passportInit();

// Accept requests from our client
app.use(cors({
  origin: CLIENT_ORIGIN
})) 

// saveUninitialized: true allows us to attach the socket id to the session
// before we have athenticated the user
app.use(session({ 
  secret: "super-secret-session-key-here", 
  resave: true, 
  saveUninitialized: true
}))

// Connecting sockets to the server and adding them to the request 
// so that we can access them later in the controller
const io = socketio(server)
app.set('io', io)

// Direct other requests to the auth router
app.use('/', authRouter)


// Routes
indexRouter(app, db);
userRouter(app, db);
postRouter(app, db);
friendRouter(app, db);


db.sequelize.sync().then( () => {
	server.listen(APP_PORT, () => {
		console.log('Webserver listening to port', APP_PORT)
	});
});
