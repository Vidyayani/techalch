
let user = require('../models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

describe('/GET login', () => {
  let existingUser = { email: "user1@webmail.com", password: "user1" }
  let passwordWrong = { email: "user1@webmail.com", password: "pass" }
  let nonExistUser = { email: "user", password: "pass" }
  let malformedReq = { test: "test" }

  it('it should GET token of existing user', (done) => {
    chai.request(server)
      .get('/auth/login')
      .send(existingUser)
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        done();
      });
  });

  it('it should return error if password doesnt match', (done) => {
    chai.request(server)
      .get('/auth/login')
      .send(passwordWrong)
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('it should return error if user doesnt exist', (done) => {
    chai.request(server)
      .get('/auth/login')
      .send(nonExistUser)
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });

  it('it should return error if malformed request', (done) => {
    chai.request(server)
      .get('/auth/login')
      .send(malformedReq)
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });

});

describe('/POST signup', () => {
  let newUser = { email: "test@gmail.com", password: "test" }
  let malformedReq = { test: "test" }
  it('it should add user ,get token and check is user is added to memory', (done) => {
    chai.request(server)
      .post('/auth/signup')
      .send(newUser)
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        user.getUser(newUser.email).then((usr) => {
          if (usr.email == newUser.email)
            done()
        });
      });
  });

  it('it should show error for malformed user model', (done) => {
    chai.request(server)
      .get('/auth/login')
      .send(malformedReq)
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });

  });
});

describe('/GET news', () => {
  let user = { email: "user1@webmail.com", password: "user1" }
  it('it should authorize jwt token and fetch news', (done) => {
    chai.request(server)
      .get('/auth/login')
      .send(user)
      .end((err, res) => {

        let jwttoken = "JWT " + res.body.token
        chai.request(server)
          .get('/api/news?search=covid')
          .set('Authorization', jwttoken)
          .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data').with.lengthOf(20);
            // res.body.count.should.equal(5);
            done();
          });

      });

  });
});


describe('/GET weather', () => {
  it('it should GET weather of next five days', (done) => {
    chai.request(server)
      .get('/api/weather')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data').with.lengthOf(5);
        res.body.count.should.equal(5);
        done();
      });

  });
});