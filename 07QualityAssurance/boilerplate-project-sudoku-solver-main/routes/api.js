
'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let sudoku = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const rows = "ABCDEFGHI";
      const columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
      let { puzzle, coordinate, value } = req.body;
      if (!puzzle || !coordinate || !value) {
        res.json({error: "Required field(s) missing"});
        return;
      }
      const valid = sudoku.validate(puzzle);
      if (valid.error) {
        res.json(valid);
        return;
      }
      const row = rows.indexOf(coordinate.slice(0, 1).toUpperCase());
      const column = columns.indexOf(coordinate.slice(1));
      if (row < 0 || column < 0) {
        res.json({error: "Invalid coordinate"});
        return;
      }
      if (columns.indexOf(value) < 0) {
        res.json({error: "Invalid value"});
        return;
      }
      function check(puzzle) {
        let validInput = sudoku.checkAllPlacement(puzzle, row, column, value.toString());
        if (validInput === true) {
          res.json({valid: validInput});
          return;
        } else {
          res.json({valid: false, conflict: validInput})
          return;
        }
      }
      if (value.toString() === puzzle[(row * 9) + column]) {
        let index = (row * 9) + column;
        let start = puzzle.slice(0, index);
        let ending = puzzle.slice(index + 1);
        let newPuzzle = start + "." + ending;
        check(newPuzzle);
      } else {
        check(puzzle);
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let { puzzle } = req.body;
      if (!puzzle) {
        res.json({error: "Required field missing"});
        return;
      } else {
        const solvedPuzzle = sudoku.solve(puzzle);
        res.status(200).json(solvedPuzzle);
        return;
      }
    });
};
