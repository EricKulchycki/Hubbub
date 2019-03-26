module.exports = (app, db) => {

    const friendModule = require("../modules/friends/friend");

    var validate = require('express-validation');
    var validation = require('../validation/friend.js');

    app.get("/api/v1/friend/:id", (req, res) => {
        friendModule.getFriends(app, db, req.params.id).then((result) => res.json(result));
    });

    app.post("/api/v1/friend/create", validate(validation), (req, res) => {
        if (!req.body.userId || !req.body.friendId) {
            res.send("Missing userId or friendId");
            return;
        }
        db.friend.create({
            userId: req.body.userId,
            friendId: req.body.friendId
        }).then((result) => res.json(result));
    });

    app.post("/api/v1/friend/delete", (req, res) => {
        if (!req.body.userId || !req.body.friendId) {
            res.send("Missing userId or friendId");
            return;
        }
        db.friend.destroy({
            where: {
                userId: req.body.userId,
                friendId: req.body.friendId
            }
        }).then((result) => res.json(result));
    });
}