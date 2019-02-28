process.env['NODE_ENV'] = 'test';


var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var should = chai.should();

chai.use(chaiHttp);


describe('Blobs', function() {
  it('should list ALL blobs on /blobs GET');
  it('should list a SINGLE blob on /blob/<id> GET');
  it('should add a SINGLE blob on /blobs POST');
  it('should update a SINGLE blob on /blob/<id> PUT');
  it('should delete a SINGLE blob on /blob/<id> DELETE');
});