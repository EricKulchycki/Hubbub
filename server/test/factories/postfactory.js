var faker = require('faker');
var models = require('../../models');

const post = async (props = {}) => {
    const defaultProps = {
        //id: faker.random.uuid(),
        category: 'MOVIE',
        title: faker.random.word(),
        rating: 5,
        body: faker.random.words(),
        userId: 1,
    };
    return Object.assign({}, defaultProps, props);
  };

  module.exports = async (props = {}) => models.post.create(await post(props));