var faker = require('faker');
var models = require('../../models');

const user = async (props = {}) => {
    const defaultProps = {
        //id: faker.random.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        age: faker.random.number(),
    };
    return Object.assign({}, defaultProps, props);
  };

  module.exports = async (props = {}) => models.user.create(await user(props));