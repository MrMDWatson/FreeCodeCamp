function ConvertHandler() {
  this.units = [
    {
      unit: "pounds",
      abbr: "lbs",
      convertsTo: "kg",
      system: "standard"
    },
    {
      unit: "kilograms",
      abbr: "kg",
      convertsTo: "lbs",
      system: "metric"
    },
    {
      unit: "gallons",
      abbr: "gal",
      convertsTo: "L",
      system: "standard"
    },
    {
      unit: "liters",
      abbr: "L",
      convertsTo: "gal",
      system: "metric"
    },
    {
      unit: "miles",
      abbr: "mi",
      convertsTo: "km",
      system: "standard"
    },
    {
      unit: "kilometers",
      abbr: "km",
      convertsTo: "mi",
      system: "metric"
    }
  ];

  this.standardUnits = this.units.filter((d) => d.system == "standard").map((d) => d.abbr);
  this.metricUnits = this.units.filter((d) => d.system == "metric").map((d) => d.abbr);

  this.getNum = function(input) {
    let result = input.split(/[a-z]/i)[0];
    const check1 = result.split("").filter((d) => d == "/");
    if (result == "") {
      return 1;
    } else if (check1.length > 1) {
      return "invalid number";
    }
    return Number(eval(result));
  };

  this.getUnit = function(input) {
    let result = input.match(/[a-z]+/i)[0];
    const check1 = this.units.some((d) => d.abbr == result.toLowerCase() || "l" == result.toLowerCase());
    if (result == null || result == false || result == undefined || !check1) {
      return "invalid unit";
    }
    if (result == "l" || result == "L") {
      return result.toUpperCase();
    } else {
      return result.toLowerCase();
    }
  };

  this.getReturnUnit = function(initUnit) {
    let result = this.units.filter((d) => d.abbr == initUnit)[0];
    return result.convertsTo;
  };

  this.spellOutUnit = function(unit) {
    let result = this.units.filter((d) => d.abbr == unit)[0];
    return result.unit;
  };

  this.convert = function(initNum, initUnit) {
    const initNumValue = eval(initNum);
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const unitsOfMeasure = [lbsToKg, galToL, miToKm];
    const isStandard = this.standardUnits.indexOf(initUnit);
    const isMetric = this.metricUnits.indexOf(initUnit);
    if (isStandard > -1) {
      return Math.round((initNumValue * unitsOfMeasure[this.standardUnits.indexOf(initUnit)]) * 100000) / 100000;
    } else if (isMetric > -1) {
      return Math.round((initNumValue / unitsOfMeasure[this.metricUnits.indexOf(initUnit)]) * 100000) / 100000;
    }
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  };
}

module.exports = ConvertHandler;