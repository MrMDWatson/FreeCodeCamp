const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translator = new Translator();

suite('Unit Tests', () => {
  suite("Test American to English translation", function() {
    test("Test American to British spelling", function() {
      assert.deepEqual(translator.translate("Mangoes are my favorite fruit.", "american-to-british").translation, "Mangoes are my <span class=\"highlight\">favourite</span> fruit.");
    });
    test("Test American to British spelling", function() {
      assert.deepEqual(translator.translate("I ate yogurt for breakfast.", "american-to-british").translation, "I ate <span class=\"highlight\">yoghurt</span> for breakfast.");
    });
    test("Test American to British translation", function() {
      assert.deepEqual(translator.translate("We had a party at my friend's condo.", "american-to-british").translation, "We had a party at my friend\'s <span class=\"highlight\">flat</span>.");
    });
    test("Test American to British translation", function() {
      assert.deepEqual(translator.translate("Can you toss this in the trashcan for me?", "american-to-british").translation, "Can you toss this in the <span class=\"highlight\">bin</span> for me?");
    });
    test("Test American to British translation", function() {
      assert.deepEqual(translator.translate("The parking lot was full.", "american-to-british").translation, "The <span class=\"highlight\">car park</span> was full.");
    });
    test("Test American to British translation", function() {
      assert.deepEqual(translator.translate("Like a high tech Rube Goldberg machine.", "american-to-british").translation, "Like a high tech <span class=\"highlight\">Heath Robinson device</span>.");
    });
    test("Test American to British translation", function() {
      assert.deepEqual(translator.translate("To play hooky means to skip class or work.", "american-to-british").translation, "To <span class=\"highlight\">bunk off</span> means to skip class or work.");
    });
    test("Test American to British titles", function() {
      assert.deepEqual(translator.translate("No Mr. Bond, I expect you to die.", "american-to-british").translation, "No <span class=\"highlight\">Mr</span> Bond, I expect you to die.");
    });
    test("Test American to British titles", function() {
      assert.deepEqual(translator.translate("Dr. Grosh will see you now.", "american-to-british").translation, "<span class=\"highlight\">Dr</span> Grosh will see you now.");
    });
    test("Test American to British times", function() {
      assert.deepEqual(translator.translate("Lunch is at 12:15 today.", "american-to-british").translation, "Lunch is at <span class=\"highlight\">12.15</span> today.");
    });
  });

  suite("Test British to American translation", function() {
    test("Test British to American spelling", function() {
      assert.deepEqual(translator.translate("We watched the footie match for a while.", "british-to-american").translation, "We watched the <span class=\"highlight\">soccer</span> match for a while.");
    });
    test("Test British to American spelling", function() {
      assert.deepEqual(translator.translate("Paracetamol takes up to an hour to work.", "british-to-american").translation, "<span class=\"highlight\">Tylenol</span> takes up to an hour to work.");
    });
    test("Test British to American translation", function() {
      assert.deepEqual(translator.translate("First, caramelise the onions.", "british-to-american").translation, "First, <span class=\"highlight\">caramelize</span> the onions.");
    });
    test("Test British to American translation", function() {
      assert.deepEqual(translator.translate("I spent the bank holiday at the funfair.", "british-to-american").translation, "I spent the <span class=\"highlight\">public holiday</span> at the <span class=\"highlight\">carnival</span>.");
    });
    test("Test British to American translation", function() {
      assert.deepEqual(translator.translate("I had a bicky then went to the chippy.", "british-to-american").translation, "I had a <span class=\"highlight\">cookie</span> then went to the <span class=\"highlight\">fish-and-chip shop</span>.");
    });
    test("Test British to American translation", function() {
      assert.deepEqual(translator.translate("I've just got bits and bobs in my bum bag.", "british-to-american").translation, "I've just got <span class=\"highlight\">odds and ends</span> in my <span class=\"highlight\">fanny pack</span>.");
    });
    test("Test British to American translation", function() {
      assert.deepEqual(translator.translate("The car boot sale at Boxted Airfield was called off.", "british-to-american").translation, "The <span class=\"highlight\">swap meet</span> at Boxted Airfield was called off.");
    });
    test("Test British to American translation", function() {
      assert.deepEqual(translator.translate("Have you met Mrs Kalyani?", "british-to-american").translation, "Have you met <span class=\"highlight\">Mrs.</span> Kalyani?");
    });
    test("Test British to American translation", function() {
      assert.deepEqual(translator.translate("Prof Joyner of King's College, London.", "british-to-american").translation, "<span class=\"highlight\">Prof.</span> Joyner of King's College, London.");
    });
    test("Test British to American translation", function() {
      assert.deepEqual(translator.translate("Tea time is usually around 4 or 4.30.", "british-to-american").translation, "Tea time is usually around 4 or <span class=\"highlight\">4:30</span>.");
    });
  });

  suite("Test highlight translation", function() {
    test("Test American to British spelling", function() {
      assert.deepEqual(translator.translate("Mangoes are my favorite fruit.", "american-to-british").translation, "Mangoes are my <span class=\"highlight\">favourite</span> fruit.");
    });
    test("Test American to British spelling", function() {
      assert.deepEqual(translator.translate("I ate yogurt for breakfast.", "american-to-british").translation, "I ate <span class=\"highlight\">yoghurt</span> for breakfast.");
    });
    test("Test British to American spelling", function() {
      assert.deepEqual(translator.translate("We watched the footie match for a while.", "british-to-american").translation, "We watched the <span class=\"highlight\">soccer</span> match for a while.");
    });
    test("Test British to American spelling", function() {
      assert.deepEqual(translator.translate("Paracetamol takes up to an hour to work.", "british-to-american").translation, "<span class=\"highlight\">Tylenol</span> takes up to an hour to work.");
    });
  });
});
