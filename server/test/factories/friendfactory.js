var faker = require('faker');
var models = require('../../models');

const friend = async (props = {}) => {
    const defaultProps = {
        id: 2,
        userId: 1
    };
    return Object.assign({}, defaultProps, props);
  };

  module.exports = async (props = {}) => models.friend.create(await friend(props));