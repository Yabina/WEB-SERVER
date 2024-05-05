const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Auth API Services', function() {
    // Register a new user
    it.skip('should POST a new user', function (done) {
        const testUser = {
            username: 'admin2',
            password: 'password',
            email: 'admin2@example.com',
        };
        const expected = {
            msg: 'New user created'
        };

        chai.request('http://localhost:3000')
            .post('/api/auth/register')
            .send(testUser)
            .end((err, resp) => {
                console.log(resp.body);
                expect(resp.body).to.eql(expected);
                done();
            });
    });

    // Attempt to register an existing user
    it('should not POST a new user if they already exist', (done) => {
        const testUser = {
            username: 'admin',
            password: 'password',
            email: 'admin@example.com',
        };
        const expected = {
            msg: 'User already exists!'
        };

        chai.request('http://localhost:3000')
            .post('/api/auth/register')
            .send(testUser)
            .end((err, resp) => {
                expect(resp.body).to.eql(expected);
                done();
            });
    });

    // Log in an existing user with correct credentials
    it('should POST a login for an existing user', (done) => {
        const testUser = {
            username: 'admin',
            password: 'password'
        };

        chai.request('http://localhost:3000')
            .post('/api/auth/login')
            .send(testUser)
            .end((err, resp) => {
                expect(resp).to.have.status(200);
                expect(resp.body.auth).to.be.true;
                expect(resp.body.expires_in).to.be.eql(86400);
                expect(resp.body.access_token).to.be.a('string');
                expect(resp.body.refresh_token).to.be.a('string');
                done();
            });
    });

    // Delete a user
    it("should delete user", (done) => {
        const testUser = {
            userName: "mochatest",
            userPassword: "test",
            userEmail: "test@mocha.com",
        };

        chai.request("http://localhost:3000")
            .delete("/api/auth/delete")
            .send(testUser)
            .end((_, resp) => {
                expect(resp.body.userEmail).to.be.equal("test@mocha.com");
                done();
            });
    });
});