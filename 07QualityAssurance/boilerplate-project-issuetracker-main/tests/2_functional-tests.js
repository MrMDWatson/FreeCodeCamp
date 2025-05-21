const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let testIssue1;
let testIssue2;

suite('Functional Tests', function() {
  this.timeout(10000);
  suite("/api/issues/:project Post request test", function() {
    test("Test Post with all input fields", function(done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/issues/:project")
        .send({
          issue_title: "New Title",
          issue_text: "text",
          created_by: "Creator",
          assigned_to: "Creator",
          status_text: "Brand new"
        })
        .end((err, res) => {
          testIssue1 = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.body.project, ":project");
          assert.equal(res.body.issue_title, "New Title");
          assert.equal(res.body.issue_text, "text");
          assert.equal(res.body.created_by, "Creator");
          assert.equal(res.body.assigned_to, "Creator");
          assert.equal(res.body.status_text, "Brand new");
          done();
        });
    });
    test("Test Post with only required fields", function(done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/issues/:project")
        .send({
          issue_title: "New Title",
          issue_text: "New text",
          created_by: "Creator",
        })
        .end((err, res) => {
          testIssue2 = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.body.project, ":project");
          assert.equal(res.body.issue_title, "New Title");
          assert.equal(res.body.issue_text, "New text");
          assert.equal(res.body.created_by, "Creator");
          done();
        });
    });
    test("Test Post with missing required field", function(done) {
      chai
        .request(server)
        .keepOpen()
        .post("/api/issues/:project")
        .send({
          issue_title: "New Title",
          issue_text: "New text"
        })
        .end((err, res) => {
          assert.equal(res.body.error, "required field(s) missing");
          done();
        });
    });
  });
  suite("/api/issues/:project Get request test", function() {
    test("Test Get to retrieve array", function(done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/issues/:project")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.equal(res.body[0].project, ":project");
          assert.property(res.body[0], "issue_title");
          assert.property(res.body[0], "issue_text");
          assert.property(res.body[0], "created_by");
          done();
        });
    });
    test("Test Get request with one filter", function(done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/issues/:project?created_by=Creator")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.equal(res.body[0].project, ":project");
          assert.property(res.body[0], "issue_title");
          assert.equal(res.body[0].created_by, "Creator");
          done();
        });
    });
    test("Test Get request with multiple filters", function(done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/issues/:project?created_by=Creator&issue_text=text")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.equal(res.body[0].project, ":project");
          assert.property(res.body[0], "issue_title");
          assert.equal(res.body[0].created_by, "Creator");
          done();
        });
    });
  });
  suite("/api/issues/:project Put request test", function() {
    test("Test Put to update one field", function(done) {
      chai
        .request(server)
        .keepOpen()
        .put("/api/issues/:project")
        .send({
          _id: testIssue1._id,
          issue_text: "updated"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.result, "successfully updated");
          assert.equal(res.body._id, testIssue1._id);
          done();
        });
    });
    test("Test Put to update multiple fields", function(done) {
      chai
        .request(server)
        .keepOpen()
        .put("/api/issues/:project")
        .send({
          _id: testIssue2._id,
          issue_title: "Updated Title",
          issue_text: "updated"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.result, "successfully updated");
          assert.equal(res.body._id, testIssue2._id);
          done();
        });
    });
    test("Test Put without id", function(done) {
      chai
        .request(server)
        .keepOpen()
        .put("/api/issues/:project")
        .send({
          issue_text: "where's my id"
        })
        .end((err, res) => {
          assert.equal(res.body.error, "missing _id");
          assert.isUndefined(res.body._id);
          done();
        });
    });
    test("Test Put without updated fields", function(done) {
      chai
        .request(server)
        .keepOpen()
        .put("/api/issues/:project")
        .send({
          _id: testIssue2._id,
        })
        .end((err, res) => {
          assert.equal(res.body.error, "no update field(s) sent");
          assert.isDefined(res.body._id);
          done();
        });
    });
    test("Test Put with invalid id", function(done) {
      chai
        .request(server)
        .keepOpen()
        .put("/api/issues/:project")
        .send({
          _id: `65cae487c59d7b77a0e0db17`,
          issue_title: "Updated Title",
          issue_text: "updated"
        })
        .end((err, res) => {
          assert.equal(res.body.error, "could not update");
          assert.isDefined(res.body._id);
          done();
        });
    });
  });
  suite("/api/issues/:project Delete request test", function() {
    test("Test Delete request", function(done) {
      chai
        .request(server)
        .keepOpen()
        .delete("/api/issues/:project")
        .send({
          _id: testIssue1._id,
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.result, "successfully deleted");
          assert.equal(res.body._id, testIssue1._id);
        });
      chai
        .request(server)
        .keepOpen()
        .delete("/api/issues/:project")
        .send({
          _id: testIssue2._id,
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.result, "successfully deleted");
          assert.equal(res.body._id, testIssue2._id);
          done();
        });
    });
    test("Test Delete invalid id", function(done) {
      chai
        .request(server)
        .keepOpen()
        .delete("/api/issues/:project")
        .send({
          _id: testIssue1._id, // Is invalid due to being deleted already
        })
        .end((err, res) => {
          assert.equal(res.body.error, "could not delete");
          assert.equal(res.body._id, testIssue1._id);
          done();
        });
    });
    test("Test Delete missing id", function(done) {
      chai
        .request(server)
        .keepOpen()
        .delete("/api/issues/:project")
        .end((err, res) => {
          assert.equal(res.body.error, "missing _id");
          assert.isUndefined(res.body._id);
          done();
        });
    });
  });
});
