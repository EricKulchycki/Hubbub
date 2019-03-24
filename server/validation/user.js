var Joi = require('joi');

module.exports = {
	body: {

		username: Joi.string().required(),
		password: Joi.string().required(),
		email: Joi.string().required(),

	}
};