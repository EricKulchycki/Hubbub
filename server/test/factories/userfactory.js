var faker = require('faker');
var models = require('../../models');

const user = async (props = {}) => {
    const defaultProps = {
        //id: faker.random.uuid(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: faker.random.number(),
        picture: faker.image.image(),
    };
    return Object.assign({}, defaultProps, props);
  };

  module.exports = async (props = {}) => models.user.create(await user(props));