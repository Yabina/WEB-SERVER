//require('mocha');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Tasks API Services', function() {
   // describe('GET methods', function () {
    it('should GET all tasks', function (done) {
        chai
        .request('http://localhost:3000')
        .get('/api/tasks')
        .end(function (err, resp) {
            expect(resp.status).to.be.eql(200);
            expect(resp.body).to.be.a('array');
            expect(resp.body.length).to.not.be.eql(0);
            //expect(resp.body[0]).to.be.eql({});
            done();
        });
    });
//});
//describe('POST methods', function () {}); 

    it('should GET a single task', function (done) {
        const expected =[
            {
                id:1,
                name: "I'm the first task!",
                created_date: '2024-04-20T05:09:49.0002',
                status: 'completed',
            },
        ];
        chai
        .request('http://localhost:3000')
        .get('/api/tasks/1')
        .end(function (err, resp) {
            expect(resp.status).to.be.eql(200);
            expect(resp.body).to.be.a('array');
            expect(resp.body.length).to.not.be.eql(0);
            expect(resp.body).to.be.eql(expected);
            done();
});
    });
    it('should POST a single task', function (done) {
        const newTask =
            {
                
                name: "New test task!",
            
            };
            const expected = { message: 'Add task successfully!'};
       
     chai
        .request('http://localhost:3000')
        .get('/api/tasks/createTask')
        .send(newTask)
        .end(function (err, resp) {
            expect(resp.status).to.be.eql(200);
            expect(resp.body).to.be.eql(expected);
            done();
});
    });

    it('should PUT a single task', function (done) {
        const updateTask =
            {
                
                name: "Task has been Updated!",
            
            };
            const expected = { message: 'Updated task successfully!'};
       
     chai
        .request('http://localhost:3000')
        .put('/api/tasks/1')
        .send(updateTask)
        .end(function (err, resp) {
            expect(resp.status).to.be.eql(200);
            expect(resp.body).to.be.eql(expected);
            done();
});
    });
    it("should delete a single task", (done) => {

      const expected = { message: 'Add task successfully!'};
      
        chai
          .request("http://localhost:3000")
          .delete("/api/tasks/1")
          
          .end((_, resp) => {
            console.log(resp.text);
            expect(resp.status).to.be.eql(200);
            expect(resp.body.name).to.be.eql(expected);
            done();
          });
      });
     
});