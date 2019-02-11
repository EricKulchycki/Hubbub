# Hubbub - Backend

This is the backend server for Hubbub.


## Installation

CD into the server folder and run `npm install`

## Running

CD into the server folder and run `node app.js`

## Testing

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

### Get list of all users

POST:

/api/v1/user/create

Body: JSON: {firstName: }

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