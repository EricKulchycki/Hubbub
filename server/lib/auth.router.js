const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('./auth.controller')

// Setting up the passport middleware for each of the OAuth providers
//const twitterAuth = passport.authenticate('twitter')
const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] })
//const facebookAuth = passport.authenticate('facebook')
const githubAuth = passport.authenticate('github')

// Routes that are triggered by the callbacks from each OAuth provider once 
// the user has authenticated successfully
router.get('/google/callback', googleAuth, authController.google)


// This custom middleware allows us to attach the socket id to the session
// With that socket id we can send back the right user info to the right 
// socket
router.use((req, res, next) => {
	req.session.socketId = req.query.socketId
	next()
})

router.get('/google', googleAuth)

module.exports = router