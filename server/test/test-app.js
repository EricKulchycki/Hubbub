process.env['NODE_ENV'] = 'test';


var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);


describe('API Endpoints', function() {
  it('should return user with specified id GET');
});

it('should return user with specified id GET', function(done) {
    chai.request(server)
      .get('/api/v1/user/1')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });