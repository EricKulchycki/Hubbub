process.env['NODE_ENV'] = 'test';
process.env.NODE_ENV = 'test';

var truncate = require('../test/truncate');
var createUser = require('../test/factories/userfactory');
var createPost = require('../test/factories/postfactory');
var createFriend = require('../test/factories/friendfactory');



var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();


chai.use(chaiHttp);


function validPost( res ){
	res.should.have.property('id');
	res.should.have.property('category');
	res.should.have.property('title');
	res.should.have.property('body');
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


  it('should only be running in a test environment',function(done){
    if(process.env.NODE_ENV !== 'test'){
    console.log("not running test in testing environment! Killing test to safeguard DB \n NODE_ENV="+process.env.NODE_ENV);
    chai.assert.fail();
    abort = true;
    }
    done();
  });
});


if(abort == false){
  describe('API Endpoints', function() {

    this.timeout(20000);

    let user, post;

    beforeEach(async (done) => {
      //await truncate();
      for(let x = 0; x < 5; x++) {
        user = await createUser();
        post = await createPost();
      }
      friend = await createFriend();
      done();
    });

    afterEach(async (done) => {
      await truncate();
      done();
    });

    it('should return user with specified id', function(done) {

      chai.request(server)
        .get('/api/v1/user/1')
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res = res.body;

          res.should.have.property('id');
          res.should.have.property('username');
          res.should.have.property('password');
          res.should.have.property('email');
          res.should.have.property('firstName');
          res.should.have.property('lastName');
          res.should.have.property('picture');

          res.id.should.equal(1);

          res.username.should.be.a('string');

          res.email.should.be.a('string');

          res.firstName.should.be.a('string');

          res.lastName.should.be.a('string');
          done();
        });
    });

    it('should return list of all users with specified firstname', function(done){
    	chai.request(server)
    		.post('/api/v1/user/list')
    		.send({'firstName': ''})
    		.end(function(err,res){
    			res.should.have.status(200);
    			res = res.body;
          res.should.be.a('array');
          res.length.should.equal(5)
    			done();
    		});
    });

    it('should get all friends of specified user', function(done){
    	chai.request(server)
    		.get('/api/v1/friend/1')
    		.end(function(err,res){
    			res.should.have.status(200);
    			res = res.body;
    			res.should.be.a('array');
    			done();
    		});
    });

    it('should make a post for user 1', function(done){
      chai.request(server)
      .post('/api/v1/post/create')
      .send({ 'title': 'title1',
              'category': 'movie',
              'body': 'body1',
              'userId': 1,
              'rating': 5})
      .end(function(err,res){
        res.should.have.status(200);
        res = res.body;

        res.should.have.property('title');
        res.should.have.property("category");
        res.should.have.property("body");
        res.should.have.property("userId");
        res.should.have.property("rating");

        res.title.should.equal('title1');
        res.category.should.equal('movie');
        res.body.should.equal('body1');
        res.userId.should.equal(1);
        res.rating.should.equal(5);

        done();
      });
    });

    it('should fail to make a post for user 1', function(done){
      chai.request(server)
      .post('/api/v1/post/create')
      .send({ 'title': 'title1',
              'category': 'movie',
              'description': 10,
              'userId': 1,
              'rating': 5})
      .end(function(err,res){
        res.should.have.status(400);
      });
      done();
    });

    it('should fail to make a user without an email', function(done){
      chai.request(server)
      .post('/api/v1/user/create')
      .send({ 'username': 'dude mcguy',
              'password': 'ISureHopeWeArentStoringPlainTextPasswords'})
      .end(function(err,res){
        res.should.have.status(400);
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

    it('should delete an embarassing post with an id', function(done){
      chai.request(server)
        .post('/api/v1/post/delete')
        .send({'id': 2})
        .end(function(err,res){
          res.should.have.status(200);
          res = res.body;
        });

      chai.request(server)
        .get('/api/v1/post/2')
        .end(function(err,res){
          res.should.have.status(400);
          res = res.body;
          res.should.have.property('message');
          res.message.should.equal('post does not exist');
        });
        done();
    });

    it('should get all posts from a friend', function(done){
    	chai.request(server)
    		.get('/api/v1/posts/allFriends/1')
    		.end(function(err,res){
    			res.should.have.status(200);
          res = res.body;
          res.should.be.a('array');

          for(let iter = 0; iter < 5; iter++) {
            validPost(res[iter]);
            res[iter].id.should.equal(iter + 1);
          }
    			done();
    		});
    });

    it('should get all friends for user 1', function(done) {
      chai.request(server)
        .get('/api/v1/friend/1')
        .end(function(err, res) {
          res.should.have.status(200);
          res = res.body;
          res.should.be.a('array');

          res.length.should.equal(1);
          done();
        });
    });


    it('should delete an embarassing post with an id', function(done){
      chai.request(server)
        .post('/api/v1/friend/delete')
        .send({'id': 2, 'userId': 2})
        .end(function(err,res){
          res.should.have.status(200);
          res = res.body;
        });

      chai.request(server)
        .get('/api/v1/friend/1')
        .end(function(err, res) {
          res.should.have.status(200);
          res = res.body;
          res.should.be.a('array');

          res.length.should.equal(0);
      });
      done();
    });

    it('should update a users information', function(done){
      chai.request(server)
        .post('/api/v1/user/update')
        .send({'userId': 1, 'username': 'squirt', 'age': 69})
        .end(function(err,res){
          res.should.have.status(200);
          res = res.body;
          //validate user
          res.should.have.property('id');
          res.should.have.property('username');
          res.should.have.property('password');
          res.should.have.property('firstName');
          res.should.have.property('lastName');
          res.should.have.property('picture');
          res.should.have.property('age');

          res.id.should.equal(1);
          res.username.should.equal('squirt');
          res.age.should.equal(69);
        });

      chai.request(server)
        .get('/api/v1/user/1')
        .end(function(err, res) {
          res.should.have.status(200);
          res = res.body;
          res.should.have.property('id');
          res.should.have.property('username');
          res.should.have.property('age');

          res.id.should.equal(1);
          res.username.should.equal('squirt');
          res.age.should.equal(69);
      });
      done();
    });

    
    


  });

}