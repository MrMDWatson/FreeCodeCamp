const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite("Test convertHandler.getNum(input)", function() {
    test("Whole number input", function() {
      assert.equal(convertHandler.getNum("32l"), 32);
    });
    test("Decimal number input", function() {
      assert.equal(convertHandler.getNum("35.568gal"), 35.568);
    });
    test("Fraction number input", function() {
      assert.equal(convertHandler.getNum("3/4mi"), .75);
    });
    test("Fraction and decimal input", function() {
      assert.equal(convertHandler.getNum("10.5/5kg"), 2.1);
    });
    test("Fraction error", function() {
      assert.equal(convertHandler.getNum("3/5/7kg"), "invalid number");
    });
    test("No numerical input", function() {
      assert.equal(convertHandler.getNum("l"), 1);
    });
  });
  suite("Test convertHandler.getUnit(input)", function() {
    test("Allowed unit inputs", function() {
      const inputs = [
        "lbs", "gal", "mi", "kg", "l", "km", "LBS", "GAL", "MI", "KG", "L", "KM"
      ];
      const result = [
        "lbs", "gal", "mi", "kg", "L", "km", "lbs", "gal", "mi", "kg", "L", "km"
      ];
      inputs.forEach((d, i) => assert.equal(convertHandler.getUnit(d), result[i]));
    });
    test("Unit error", function() {
      assert.equal(convertHandler.getUnit("gallons"), "invalid unit");
    });
  });
  suite("Test convertHandler.getReturnUnit(initUnit)", function() {
    test("Return correct unit", function() {
      const inputs = [
        "lbs", "gal", "mi", "kg", "L", "km"
      ];
      const result = [
        "kg", "L", "km", "lbs", "gal", "mi"
      ];
      inputs.forEach((d, i) => assert.equal(convertHandler.getReturnUnit(d), result[i]));
    });
  });
  suite("Test convertHandler.spellOutUnit(unit)", function() {
    test("Spell out unit", function() {
      const inputs = [
        "lbs", "gal", "mi", "kg", "L", "km"
      ];
      const result = [
        "pounds", "gallons", "miles", "kilograms", "liters", "kilometers"
      ];
      inputs.forEach((d, i) => assert.equal(convertHandler.spellOutUnit(d), result[i]));
    });
  });
  suite("Test convertHandler.convert(initNum, initUnit)", function() {
    test("Convert gal to L", function() {
      assert.equal(convertHandler.convert(1, "gal"), 3.78541);
    });
    test("Convert L to gal", function() {
      assert.equal(convertHandler.convert(1, "L"), 0.26417);
    });
    test("Convert mi to km", function() {
      assert.equal(convertHandler.convert(1, "mi"), 1.60934);
    });
    test("Convert km to mi", function() {
      assert.equal(convertHandler.convert(1, "km"), 0.62137);
    });
    test("Convert lbs to kg", function() {
      assert.equal(convertHandler.convert(1, "lbs"), 0.45359);
    });
    test("Convert kg to lbs", function() {
      assert.equal(convertHandler.convert(1, "kg"), 2.20462);
    });
  });
});