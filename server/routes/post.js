module.exports = (app, db) => {

    const Op = db.sequelize.Op;
    const friendModule = require("../modules/friends/friend");

    var validate = require('express-validation');
    var validation = require('../validation/post.js');

    //Get a post given an id
    app.get("/api/v1/post/:id", (req, res) => {
        console.log("Requested post " + req.params.id);
        db.post.findOne({
            where: {
                id: req.params.id
            },
            include: [db.user]
        }).then((result) => {
            if (result != null) {
                res.json(result);
            } else {
                return res.status(400).json({
                    message: "post does not exist"
                });
            }

        })
    });

    //Create a new post
    app.post("/api/v1/post/create", validate(validation), (req, res, next) => {
        console.log("Requested new post creation");
        console.log(req.body);
        db.post.create({
            title: req.body.title,
            category: req.body.category,
            body: req.body.body,
            userId: req.body.userId,
            rating: req.body.rating,
            spoiler: req.body.spoiler,
            createdAt: new Date(),
            updatedAt: new Date()
        }).then((result) => {
            if (result != null) {
                res.json(result);
            } else {
                return res.status(400).json({
                    message: "post does not exist"
                });
            }

        })
    });


    app.post("/api/v1/post/delete", (req, res) => {
        if (!req.body.id) {
            return res.status(400).json({
                'message': "Could not delete post! Missing ID"
            });
        }
        db.post.destroy({
            where: {
                id: req.body.id
            }
        }).then((result) => res.json(result));
    });

    //Create a new post
    app.post("/api/v1/post/create", validate(validation), (req, res, next) => {
        db.post.create({
            title: req.body.title,
            category: req.body.category,
            body: req.body.body,
            userId: req.body.userId,
            rating: req.body.rating,
            spoiler: req.body.spoiler,
            createdAt: new Date(),
            updatedAt: new Date()
        }).then((result) => res.json(result));
    });

    //Get all posts of friends given a userId
    app.get("/api/v1/posts/allFriends/:userId", (req, res) => {
        let userId = req.params.userId;
        // Get the users friends, store the ids in a list, and then get a list of posts using those ids
        friendModule.getFriends(app, db, userId).then((friends) => {
            if (!friends || !friends.length) {
                res.json([]);
                return;
            }
            var friendIds = friends.map(function(friend) {
                return friend.user.id;
            });
            db.post.findAll({
                where: {
                    userId: {
                        [Op.or]: friendIds
                    }
                },
                include: [db.user]
            }).then((result) => res.json(result));
        });
    });

    //Get all posts of a given category
    app.get("/api/v1/posts/categories/:cat", (req, res) => {
        db.post.findAll({
            where: {
                category: req.params.cat
            },
            include: [db.user]
        }).then((result) => {
            if (result.length != 0) {
                res.json(result)
            } else {
                return res.status(400).json({
                    message: "category does not exist"
                });
            }
        });
    });

    //Get all posts for a specified user
    app.get("/api/v1/posts/user/:id", (req, res) => {
        db.post.findAll({
            where: {
                userId: req.params.id
            },
            include: [db.user]
        }).then((result) => res.json(result));
    });
}