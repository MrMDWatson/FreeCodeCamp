'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let { text, locale } = req.body;
      if (text === "") {
        res.json({error: "No text to translate"});
        return;
      }
      if (!text || !locale) {
        res.json({error: "Required field(s) missing"});
        return;
      }
      //console.log("__________________")
      //console.log(text, locale);
      let transObj = translator.translate(text, locale);
      //console.log(transObj);
      res.json(transObj);
      return;
    });
};
