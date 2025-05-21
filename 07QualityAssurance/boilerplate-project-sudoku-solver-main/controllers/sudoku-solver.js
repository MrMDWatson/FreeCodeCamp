class SudokuSolver {
  constructor() {
    this.board = "";
  }

  validate(puzzleString) {
    const validInputs = puzzleString.split("").every((s) => /(\d|[.])/.test(s));
    const validLength = puzzleString.length == 81;
    if (!validInputs) {
      return {error: 'Invalid characters in puzzle'};
    } else if (!validLength) {
      return {error: 'Expected puzzle to be 81 characters long'}
    } else {
      this.board = puzzleString.slice();
      return true;
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const targetRow = puzzleString.slice(row * 9, (row * 9) + 9).split("");
    const available = targetRow.indexOf(value) < 0;
    //console.log(available, targetRow);
    return available;
  }

  checkColPlacement(puzzleString, row, column, value) {
    const targetCol = [];
    for (let rowCount = 0; rowCount < 9; rowCount++) {
      targetCol.push(puzzleString[(rowCount * 9) + column])
    }
    const available = targetCol.indexOf(value) < 0;
    //console.log(available, targetCol);
    return available;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const rowRegion = Math.floor(row / 3);
    const colRegion = Math.floor(column / 3);
    const targetRegion = [];
    for (let rowSection = 0; rowSection < 3; rowSection++) {
      for (let colSection = 0; colSection < 3; colSection++) {
        targetRegion.push(puzzleString[(27 * rowRegion) + (colRegion * 3) + (9 * rowSection) + colSection]);
      }
    }
    const available = targetRegion.indexOf(value) < 0;
    //console.log(available, targetRegion);
    return available;
  }

  checkAllPlacement(puzzleString, row, column, value) {
    const placementChecks = [
      this.checkRowPlacement(puzzleString, row, column, value) ? true : "row",
      this.checkColPlacement(puzzleString, row, column, value) ? true : "column",
      this.checkRegionPlacement(puzzleString, row, column, value) ? true : "region"
    ]
    const passedChecks = placementChecks.every((sectionCheck) => sectionCheck === true);
    if (passedChecks === true) {
      return true;
    } else {
      return placementChecks.filter((checkArea) => checkArea !== true);
    };
  }

  solveCell() {
    let nextEmpty = this.board.slice().split("").indexOf(".");
    if (nextEmpty < 0) {
      return true;
    } else {
      for (let value = 1; value < 10; value++) {
        let targetIndex = nextEmpty;
        let row = Math.floor(targetIndex / 9);
        let column = targetIndex % 9;
        if (this.checkAllPlacement(this.board, row, column, value.toString()) === true) {
          let start = this.board.slice(0, targetIndex);
          let ending = this.board.slice(targetIndex + 1);
          this.board = start + value + ending;
          if (this.solveCell()) {
            return true;
          }
          this.board = start + "." + ending;
        }
      }
    }
    return false;
  }

  solve(puzzleString) {
    const valid = this.validate(puzzleString);
    if (valid.error) {
      return valid;
    } else {
      if (this.solveCell()) {
        return {solution: this.board};
      } else {
        return {error: "Puzzle cannot be solved"}
      }
    }
  }    
};

module.exports = SudokuSolver;