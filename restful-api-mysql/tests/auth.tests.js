//require('mocha');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Auth API Services', function() {
    // run one time then skip once working
    it.skip('should POST a new user', function (done) {
        const testUser  = {
            username:'admin2',
            password:'password',
            email:'admin2@example.com',
        };
        const expected  = {
            msg: 'New user created'
        };

        chai
        .request('http://localhost:3000')
        .post('/api/auth/register')
        //.set('content-Type', 'application/x-www-form-urlencoded')
        .send(testUser)
        .end((err, resp) => {
            console.log(resp.body);
           // expect(resp.body.username).to.eql(expectedUser.username);
            //expect(resp.body.email).to.eql(expectedUser.email);
            expect(resp.body).to.eql(expected);
            done();
        });
    });

    it('should not POST a new user if they already exist', (done) => {
        const testUser  = {
            username:'admin',
            password:'password',
            email:'admin@example.com',
        };
        const expected = {
        //error:{ messsage: 'Ilegal arguments: undefined, string'},
       // msg: 'Password cannot be empty!',
       msg: 'User already exists!'
    };
      
        chai
        .request('http://localhost:3000')
        .post('/api/auth/register')
        .send(testUser)
        .end((err, resp) => {
            expect(resp.body).to.eql(expected);
            done();
        });
    });
    
    it('should POST a login for an exisiting', (done) => {
        const testUser  = {
            username:'admin',
            password:'password',
            email:'admin@example.com',
        };
        chai
        .request('http://localhost:3000')
        .post('/api/auth/login')
        .send(testUser)
        .end(function (err, resp) {
            expect(resp.body.auth).to.be.true;
            expect(resp.body.expires_in).to.be.eql(86400);
            expect(resp.body.access_token).to.be.a('string');
            expect(resp.body.refresh_token).to.be.a('string');
            done();
        });
    });

it("should delete user", (done) => {
    chai
      .request("http://localhost:3000")
      .delete("/api/auth/delete")
      .send({
        userName: "mochatest",
        userPassword: "test",
        userEmail: "test@mocha.com",
      })
      .end((_, resp) => {
        console.log(resp.text);
        expect(resp.body.userEmail).to.be.equal("test@mocha.com");
        done();
      });
  });
 
});