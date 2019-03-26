var Joi = require('joi');

module.exports = {
	body: {

		userId: Joi.number().integer().required(),
		friendId: Joi.number().integer().required()

	}
}; 
