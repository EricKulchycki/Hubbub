# Hubbub - Backend

This is the backend server for Hubbub.


## Installation

CD into the server folder and run `npm install`

## Running

CD into the server folder and run `node app.js`

## Run Automated Tests

CD into the server folder and run 'npm test'

## In-Browser Testing

Install the ARC ([Advanced Rest Client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo/)) in your chrome browser:


![Post Request](https://i.imgur.com/7gabsN9.png)


Select the request method type, i.e POST or GET, and choose the point. If doing a POST request, make sure you include the data you want to send.

Or just use Postman

## Endpoint URIs

### Get user by id

GET:

/api/v1/user/:id

### Create new user

POST:

/api/v1/user/create

Body: JSON: {
    username:
    password:
    email:
}

### Update a user

POST:

/api/v1/user/update

Body: JSON: {
    userId: (Required)
    username: (Optional)
    age: (Optional)
    picture: (Optional)
}

### Get list of all users

POST:

/api/v1/user/list

Body: JSON: {
    firstName:
}

### Get all friends for given user

GET:

/api/v1/friend/:id

### Create a friendship (one user follows another)

POST:

/api/v1/friend/create

Body: JSON: {
    userId:
    friendId:
}

### Delete a friendship

POST:

/api/v1/friend/delete

Body: JSON: {
    userId:
    friendId:
}

### Get all posts from a given category

GET:

/api/v1/posts/categories/:cat

Where :cat is one of
- 'movie'
- 'tv-show'
- 'video game'
- 'comic'
- 'anime'

### Get post by id

GET:

/api/v1/post/:id

### Create new post

POST:

/api/v1/post/create

Body: JSON: {
    title:
    category:
    body:
    userId:
    rating:
}

### Delete a post

POST:

/api/v1/post/delete

Body: JSON: {
    id:
}

### Get all of a users friends posts

GET:

/api/v1/posts/allFriends/:userId

userId is the ID of the currently logged in user, the posts from all the currently logged in users friends will be sent back in json format.

### Get all posts for a specified user

GET:

/api/v1/posts/user/:id

id is the id of the user that you want to get all posts for.
