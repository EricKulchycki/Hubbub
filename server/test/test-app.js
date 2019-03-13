process.env['NODE_ENV'] = 'test';
process.env.NODE_ENV = 'test';

var truncate = require('../test/truncate');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();


chai.use(chaiHttp);

function validUser( res ){
	res.should.have.property('id');
    res.should.have.property('username');
    res.should.have.property('password');
    res.should.have.property('email');
    res.should.have.property('firstName');
    res.should.have.property('lastName');
}

function validPost( res ){
	res.should.have.property('id');
	res.should.have.property('category');
	res.should.have.property('title');
	res.should.have.property('body');
	//Rating is allowed to be null, do not check
	res.should.have.property('userId');
} 

function printObj( obj ){
	var ret = "";
	for( var prop in obj){
		ret += prop + ": "+ obj[prop]+': ';
	}
	alert(ret);
}

var abort = false;

describe('Testing environment',function(){


  it('should only be running in a test environment',function(){
    if(process.env.NODE_ENV !== 'test'){
    console.log("not running test in testing environment! Killing test to safeguard DB \n NODE_ENV="+process.env.NODE_ENV);
    chai.assert.fail();
    abort = true;
    }
  });
});


beforeEach(async () => {
  await truncate();
  //user = await userFactory();
});


if(abort == false){
  describe('API Endpoints', function() {

    it('should create a 5 users', function(done){

      for(i=0;i<5;i++){
        var user = {
          'username': 'user'+i,
          'password': 'password'+i,
          'email': 'email'+i+'@gmail.com'
        }

      chai.request(server)
      .post('/api/v1/user/create')
      .send(user)
      .end(function(err,res){
        res.should.have.status(200);
      });

      }
      done();            
    });

    it('should return user with specified id', function(done) {

      chai.request(server)
        .get('/api/v1/user/1')
        .end(function(err, res){
          res.should.have.status(200);
          res = res.body;

          validUser(res);

          done();
        });
    });

    it('should return list of all users', function(done){
    	chai.request(server)
    		.post('/api/v1/user/list')
    		.send({'firstName': ''})
    		.end(function(err,res){
    			res.should.have.status(200);
    			res = res.body;
    			res.should.be.a('array');
    			done();
    		});
    });

    it('should get all friends of user', function(done){
    	chai.request(server)
    		.get('/api/v1/friend/1')
    		.end(function(err,res){
    			res.should.have.status(200);
    			res = res.body;

    			res.should.be.a('array');
    			done();
    		});
    });  

    //"Create a friendship" - (User follows another)

    it('should make some posts for our users', function(done){

      //REPLACE WITH ITERATIVE POST GENERATOR

      chai.request(server)
      .post('/api/v1/post/create')
      .send({ 'title': 'title1',
              'category': 'movie',
              'body': 'body1',
              'userId': 1,
              'rating': 5})
      .end(function(err,res){
        res.should.have.status(200);
      });
      done();
    });

    it('should get all posts of a category and only posts of that category', function(done){
      chai.request(server)
      .get('/api/v1/posts/categories/movie')
      .end(function(err,res){
        res.should.have.status(200);
        res = res.body;
        res.should.be.a('array');

        //Iterate over posts in this category and check they're what we're looking for
        for(i=0;i<res.length;i++){
          validPost(res[i]);
          chai.assert.equal(res[i].category.toLowerCase(),'movie', "category should be movie");
        }

        done();

      });
    });

    it('should get a particular post with an id', function(done){
    	chai.request(server)
    		.get('/api/v1/post/1')
    		.end(function(err,res){
    			res.should.have.status(200);
    			res = res.body;

    			validPost(res);
    			done();
    		});
    });

    //Delete a friendship

    //Delete a post

    //Get all posts from a friend

  });

}