const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

//let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    suite("/api/translate translate entered text", function() {
        test("Test valid translation", function(done) {
            chai
                .request(server)
                .keepOpen()
                .post("/api/translate")
                .send({text: "Mangoes are my favorite fruit.", locale: "american-to-british"})
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.translation, "Mangoes are my <span class=\"highlight\">favourite</span> fruit.");
                    done();
                });
        });
        test("Test invalid locale", function(done) {
            chai
                .request(server)
                .keepOpen()
                .post("/api/translate")
                .send({text: "Mangoes are my favorite fruit.", locale: "french-to-british"})
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Invalid value for locale field');
                    done();
                });
        });
        test("Test missing text field", function(done) {
            chai
                .request(server)
                .keepOpen()
                .post("/api/translate")
                .send({locale: "american-to-british"})
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                });
        });
        test("Test missing locale field", function(done) {
            chai
                .request(server)
                .keepOpen()
                .post("/api/translate")
                .send({text: "Mangoes are my favorite fruit."})
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                });
        });
        test("Test missing locale field", function(done) {
            chai
                .request(server)
                .keepOpen()
                .post("/api/translate")
                .send({text: "", locale: "american-to-british"})
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'No text to translate');
                    done();
                });
        });
        test("Test missing locale field", function(done) {
            chai
                .request(server)
                .keepOpen()
                .post("/api/translate")
                .send({text: "Mangoes are my favourite fruit.", locale: "american-to-british"})
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.translation, "Everything looks good to me!");
                    done();
                });
        });
    });
});
