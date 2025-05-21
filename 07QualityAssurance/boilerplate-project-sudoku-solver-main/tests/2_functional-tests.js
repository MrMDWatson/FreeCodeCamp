const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  suite("/api/solve puzzle string", function() {
    test("Test valid puzzle string", function(done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/solve")
        .send({puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.solution, "135762984946381257728459613694517832812936745357824196473298561581673429269145378");
          done();
        });
    });
    test("Test missing puzzle string", function(done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/solve")
        .send({puzzle: ""})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Required field missing");
          done();
        });
    });
    test("Test invalid characters in puzzle string", function(done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/solve")
        .send({puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2.k9.47...8..1..16....926914.37."})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid characters in puzzle");
          done();
        });
    });
    test("Test invalid incorrect puzzle string length", function(done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/solve")
        .send({puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2.9.47...8..1..16....926914.37."})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
          done();
        });
    });
    test("Test unsolvable puzzle", function(done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/solve")
        .send({puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2.99.47...8..1..16....926914.37."})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Puzzle cannot be solved");
          done();
        });
    });
  });

  suite("/api/check puzzle string", function() {
    test("Test valid puzzle placement", function(done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .send({
          puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: "a2",
          value: "3"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, true);
          done();
        });
    });
    test("Test one placement conflict", function(done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .send({
          puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: "b2",
          value: "3"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, false);
          assert.equal(res.body.conflict.length, 1);
          done();
        });
    });
    test("Test multiple placement conflicts", function(done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .send({
          puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: "b2",
          value: "7"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, false);
          assert.isAtLeast(res.body.conflict.length, 2);
          done();
        });
    });
    test("Test all placement conflicts", function(done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .send({
          puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: "b2",
          value: "2"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.valid, false);
          assert.equal(res.body.conflict.length, 3);
          done();
        });
    });
    test("Test missing required input fields", function(done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .send({
          puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          value: "2"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        });
    });
    test("Test invalid input characters", function(done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .send({
          puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2.k9.47...8..1..16....926914.37.",
          coordinate: "a2",
          value: "3"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid characters in puzzle");
          done();
        });
    });
    test("Test incorrect puzzle length", function(done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .send({
          puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37..",
          coordinate: "a2",
          value: "3"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
          done();
        });
    });
    test("Test invalid placement coordinate", function(done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .send({
          puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: "a22",
          value: "3"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid coordinate");
          done();
        });
    });
    test("Test invalid placement value", function(done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/check")
        .send({
          puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
          coordinate: "a2",
          value: "10"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid value");
          done();
        });
    });
  });

});

