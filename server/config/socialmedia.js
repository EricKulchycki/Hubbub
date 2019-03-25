const providers = ['google']

const callbacks = providers.map(provider => {
return process.env.NODE_ENV === 'production'
	? `http://hubbub.gersh.in:4000/${provider}/callback`
	: `http://hubbub.gersh.in:4000/${provider}/callback`
})

const [googleURL] = callbacks

exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
	? 'http://localhost:3000'
	: ['http://127.0.0.1:3000', 'http://localhost:3000']


exports.GOOGLE_CONFIG = {
	clientID: "739741427337-op3fon3mfrenq46pb4ntcgjgq5r699tp.apps.googleusercontent.com",
	clientSecret: "m9R04AkJPmY3nFRUVKIwR-vc",
	callbackURL: googleURL
}


