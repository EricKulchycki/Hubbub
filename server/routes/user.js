module.exports = (app, db) => {
	
  const Op = db.sequelize.Op;
  
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
    console.log("Requested users");
  	console.log(req.body);
  	let firstNameValue = req.body.firstName.toLowerCase();
  	db.user.findAll({
	  	where: {
		  	firstName: db.Sequelize.where(db.Sequelize.fn('LOWER', db.Sequelize.col('firstName')), 'LIKE', '%' + firstNameValue + '%')
	  	}
  	}).then( (result) => res.json(result) );
  });
  
  app.post("/api/v1/user/update", (req, res) => {
    console.log("Requested update user: " + req.body.userId);
	if(!req.body.userId) {
		res.send("Missing userId dingus");
		return;
	}
  	db.user.findOne({ where: { id: req.body.userId }}).then( (user) => {
			if(!user || user === null) {
				res.send("User not found for ID " + req.body.userId);
				return;
			}
		    user.update({
				username: req.body.username ? req.body.username : user.username,
				age: req.body.age ? req.body.age : user.age,
				picture: req.body.picture ? req.body.picture : user.picture
			}).then( (result) => res.json(result) );
	} );
  });


}