var map = require('lodash/map');
var models = require('../models');


module.exports = async function truncate() {
  return await Promise.all(
    map(Object.keys(models), (key) => {
      if (['sequelize', 'Sequelize'].includes(key)) return null;
      return models[key].destroy({ where: {}, force: true, restartIdentity: true });
    })
  );
}