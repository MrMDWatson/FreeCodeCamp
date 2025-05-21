const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {

  suite("Test valid puzzle string", function() {
    test("81 characters in puzzle", function() {
      assert.isTrue(solver.validate("1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."), true);
    });
    test("Handles invalid puzzle inputs", function() {
      assert.equal(solver.validate("1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16.k..926914.37.").error, 'Invalid characters in puzzle');
    });
    test("Handles invalid number of puzzle characters", function() {
      assert.equal(solver.validate("1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16...926914.37.").error, 'Expected puzzle to be 81 characters long');
    });
  });

  suite("Test row placement", function() {
    test("Handles valid row placement", function() {
      const puzzleString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const row = 0;
      const column = 1;
      const value = "3";
      assert.isTrue(solver.checkRowPlacement(puzzleString, row, column, value));
    });
    test("Handles invalid row placement", function() {
      const puzzleString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const row = 0;
      const column = 1;
      const value = "1";
      assert.isFalse(solver.checkRowPlacement(puzzleString, row, column, value));
    });
  });

  suite("Test column placement", function() {
    test("Handles valid column placement", function() {
      const puzzleString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const row = 0;
      const column = 1;
      const value = "3";
      assert.isTrue(solver.checkColPlacement(puzzleString, row, column, value));
    });
    test("Handles invalid column placement", function() {
      const puzzleString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const row = 0;
      const column = 1;
      const value = "6";
      assert.isFalse(solver.checkColPlacement(puzzleString, row, column, value));
    });
  });

  suite("Test region placement", function() {
    test("Handles valid region placement", function() {
      const puzzleString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const row = 0;
      const column = 1;
      const value = "3";
      assert.isTrue(solver.checkRegionPlacement(puzzleString, row, column, value));
    });
    test("Handles invalid region placement", function() {
      const puzzleString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const row = 0;
      const column = 1;
      const value = "6";
      assert.isFalse(solver.checkRegionPlacement(puzzleString, row, column, value));
    });
  });

  suite("Test solver", function() {
    test("Handles valid string", function() {
      const puzzleString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      assert.property(solver.solve(puzzleString), "solution");
    });
    test("Handles invalid string", function() {
      const puzzleString = "115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      assert.property(solver.solve(puzzleString), "error");
    });
    test("Solved puzzle returned", function() {
      const puzzleString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const answerString = "135762984946381257728459613694517832812936745357824196473298561581673429269145378"
      assert.equal(solver.solve(puzzleString).solution, answerString);
    });
  });
});
