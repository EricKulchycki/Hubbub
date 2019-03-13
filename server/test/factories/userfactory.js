import faker from 'faker';
import models from '/server/models/';

const data = async (props = {}) => {
    const defaultProps = {
        id: faker.random.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        age:
    };
    return Object.assign({}, defaultProps, props);
  };