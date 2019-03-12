const providers = ['twitter', 'google', 'facebook', 'github']

const callbacks = providers.map(provider => {
  return process.env.NODE_ENV === 'production'
    ? `http://127.0.0.1:4000/${provider}/callback`
    : `http://127.0.0.1:4000/${provider}/callback`
})

const [twitterURL, googleURL, facebookURL, githubURL] = callbacks

exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
  ? 'http://localhost:3000'
  : ['http://127.0.0.1:3000', 'http://localhost:3000']

exports.TWITTER_CONFIG = {
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: twitterURL,
}

exports.GOOGLE_CONFIG = {
  clientID: "739741427337-op3fon3mfrenq46pb4ntcgjgq5r699tp.apps.googleusercontent.com",
  clientSecret: "m9R04AkJPmY3nFRUVKIwR-vc",
  callbackURL: googleURL
}

exports.FACEBOOK_CONFIG = {
  clientID: process.env.FACEBOOK_KEY,
  clientSecret: process.env.FACEBOOK_SECRET,
  profileFields: ['id', 'emails', 'name', 'picture.width(250)'],
  callbackURL: facebookURL
}

exports.GITHUB_CONFIG = {
  clientID: process.env.GITHUB_KEY,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: githubURL
}
