var Joi = require('joi');

module.exports = {
	body: {

		title: Joi.string().required(),
		category: Joi.string().required(),
		body: Joi.string().required(),
		spoiler: Joi.boolean().required(),
		userId: Joi.number().integer().required(),
		rating: Joi.number().integer().required(),

	}
};