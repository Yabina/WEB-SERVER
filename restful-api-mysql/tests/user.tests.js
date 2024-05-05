//require('mocha');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
 
const token =
 ''
describe('User API Services', () => {
it.skip("should GET a logged in user's unique id, username, and password",  (done) => {
        const expected = [ 
            {
            user_id:1,
            username:'admin',
            email:'admin@example.com',
        },
    ];

        chai
        .request('http://localhost:3000')
        .get('/api/user/me')
        .set('Authorization', `Bearer ${token}`)
       
        .end((err, resp) => {
            expect(resp.body).to.eql(expected);
            done();
        });
    });
// run one time then skip once working
it.skip('should PUT updated credetials for a logged in user', (done) => {
    const updatedUser = {
        username:'admin',
        password:'password',
        email:'admin@example.com',
};
const expected = 
    {
   msg: 'Updated successfully'
};
chai
.request('http://localhost:3000')
.get('/api/user/me/update')
.set('Authorization', `Bearer ${token}`)
.send(updatedUser)
.end((err, resp) => {
    expect(resp.body).to.eql(expected);
    done();
});
});

it('should PUT updated credetials for a logged in user', (done) => {
    const updatedUser = {
        username:'admin',
        password:'password',
        email:'admin@example.com',
};
        const expected = {
         messsage: 'Nothing to update...'};
      
        chai
        .request('http://localhost:3000')
        .put('/api/user/me/update')
        .set('Authorization', `Bearer ${token}`)
        .send(updatedUser)
        .end((err, resp) => {
            expect(resp.body).to.eql(expected);
            done();
        });
    });
    it.skip('should PUT updated credentials for a logged in user', (done) => {
        // Test code for updating user credentials...
    });

    it('should PUT updated credentials for a logged in user', (done) => {
        const updatedUser = {
            username: 'admin',
            password: 'password',
            email: 'admin@example.com',
        };
        const expected = {
            message: 'Nothing to update...'
        };
      
        chai
        .request('http://localhost:3000')
        .put('/api/user/me/update')
        .set('Authorization', `Bearer ${token}`)
        .send(updatedUser)
        .end((err, resp) => {
            expect(resp.body).to.eql(expected);
            done();
        });
    });

    it('should PUT updated credentials for a logged in user', (done) => {
        const updatedUser = {
            username: 'admin',
            password: 'password',
            email: 'admin@example.com',
        };
        const expected = {
            msg: 'Updated successfully'
        };
       
        chai
        .request('http://localhost:3000')
        .put('/api/user/me/update')
        .set('Authorization', `Bearer ${token}`)
        .send(updatedUser)
        .end((err, resp) => {
            expect(resp.body).to.eql(expected);
            done();
        });
    });
});