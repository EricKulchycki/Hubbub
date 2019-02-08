module.exports = (app, db) => {
	
  const Op = db.Sequelize.Op;
  
  app.get("/api/v1/user/:id", (req, res) => {
	console.log("Requested user " + req.params.id);
  	db.user.findOne({
  		where: {
  			id: req.params.id
  		}
  	}).then( (result) => res.json(result) );
  });
  
  app.post("/api/v1/user/create", (req, res) => {
    console.log("Requested new user creation");
    db.user.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then( (result) => res.json(result) );
  });
  
  app.post("/api/v1/user/list", (req, res) => {
    console.log("Requested user");
	console.log(req.body);
	let firstNameValue = req.body.firstName.toLowerCase();
  	db.user.findAll({
		where: {
			firstName: db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('firstName')), 'LIKE', '%' + firstNameValue + '%')
		}
  	}).then( (result) => res.json(result) );
  });
}
