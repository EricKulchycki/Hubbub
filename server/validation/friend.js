var Joi = require('joi');

module.exports = {
	body: {

		userId: Joi.integer().required(),
		friendId: Joi.integer().required()

	}
}; 
