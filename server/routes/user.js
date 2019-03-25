module.exports = (app, db) => {
  
    const Op = db.sequelize.Op;

    var validate = require('express-validation');
    var validation = require('../validation/user.js');

    app.get("/api/v1/user/:id", (req, res) => {
        db.user.findOne({
            where: {
                id: req.params.id
            }
        }).then((result) => res.json(result));
    });

    app.post("/api/v1/user/create", validate(validation), (req, res, next) => {
        db.user.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            createdAt: new Date(),
            updatedAt: new Date()
        }).then((result) => res.json(result));
    });

    app.post("/api/v1/user/list", (req, res) => {
        let firstNameValue = req.body.firstName.toLowerCase();
        db.user.findAll({
            where: {
                firstName: db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('firstName')), 'LIKE', '%' + firstNameValue + '%')
            }
        }).then((result) => res.json(result));
    });

    app.post("/api/v1/user/update", (req, res) => {
        if (!req.body.userId) {
            res.send("Missing userId dingus");
            return;
        }
        db.user.findOne({
            where: {
                id: req.body.userId
            }
        }).then((user) => {
            if (!user || user === null) {
                res.send("User not found for ID " + req.body.userId);
                return;
            }
            user.update({
                username: req.body.username ? req.body.username : user.username,
                age: req.body.age ? req.body.age : user.age,
                picture: req.body.picture ? req.body.picture : user.picture,
                firstName: req.body.firstName ? req.body.firstName : user.firstName,
                lastName: req.body.lastName ? req.body.lastName : user.lastName
            }).then((result) => res.json(result));
        });
    });

}
