const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    suite("/api/convert Get request test", function() {
        test("Test valid input", function(done) {
            chai
                .request(server)
                .keepOpen()
                .get("/api/convert?input=10L")
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.initNum, 10);
                    assert.equal(res.body.initUnit, "L");
                    assert.equal(res.body.returnNum, 2.64172);
                    assert.equal(res.body.returnUnit, "gal");
                    done();
                });
        });
        test("Test invalid unit input", function(done) {
            chai
                .request(server)
                .keepOpen()
                .get("/api/convert?input=10g")
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body, "invalid unit");
                    done();
                });
        });
        test("Test invalid number input", function(done) {
            chai
                .request(server)
                .keepOpen()
                .get("/api/convert?input=3/2.5/5gal")
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body, "invalid number");
                    done();
                });
        });
        test("Test invalid number and unit", function(done) {
            chai
                .request(server)
                .keepOpen()
                .get("/api/convert?input=3/2.5/5gallon")
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body, "invalid number and unit");
                    done();
                });
        });
        test("Test no number input", function(done) {
            chai
                .request(server)
                .keepOpen()
                .get("/api/convert?input=mi")
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.initNum, 1);
                    assert.equal(res.body.initUnit, "mi");
                    assert.equal(res.body.returnNum, 1.60934);
                    assert.equal(res.body.returnUnit, "km");
                    done();
                });
        });
    });
});
