function Display({ expression, display }) {
  return (
    <div id="screen">
      <div id="expression">{expression}</div>
      <div id="display">{display() ? display() : "0"}</div>
    </div>
  );
}

function ButtonPad({ variableInput, allClear, addVariable, addDecimal, addOperator, solve }) {
  return (
    <>
      <div id="clear" onClick={() => allClear()} className="button AC">AC</div>
      <div id="divide" onClick={() => addOperator("/")} className="operator button divi">/</div>
      <div id="multiply" onClick={() => addOperator("*")} className="operator button multiply">X</div>
      <div id="seven" onClick={() => addVariable("7", variableInput)} className="numbers button seven">7</div>
      <div id="eight" onClick={() => addVariable("8", variableInput)} className="numbers button eight">8</div>
      <div id="nine" onClick={() => addVariable("9", variableInput)} className="numbers button nine">9</div>
      <div id="subtract" onClick={() => addOperator("-")} className="operator button sub">-</div>
      <div id="four" onClick={() => addVariable("4", variableInput)} className="numbers button four">4</div>
      <div id="five" onClick={() => addVariable("5", variableInput)} className="numbers button five">5</div>
      <div id="six" onClick={() => addVariable("6", variableInput)} className="numbers button six">6</div>
      <div id="add" onClick={() => addOperator("+")} className="operator button add">+</div>
      <div id="one" onClick={() => addVariable("1", variableInput)} className="numbers button one">1</div>
      <div id="two" onClick={() => addVariable("2", variableInput)} className="numbers button two">2</div>
      <div id="three" onClick={() => addVariable("3", variableInput)} className="numbers button three">3</div>
      <div id="equals" onClick={() => solve("=")} className="operator button equal">=</div>
      <div id="zero" onClick={() => addVariable("0", variableInput)} className="numbers button zero">0</div>
      <div id="decimal" onClick={() => addDecimal(".")} className="numbers button deci">.</div>
    </>
  );
}

function Calculator() {
  const [expression, setExpression] = React.useState("");
  const [solved, setSolved] = React.useState(false);
  const lastInput = expression[expression.length - 1];
  const variableInput = expression.match(/\d*[.]{0,1}\d*$/);
  const operators = ["*", "/", "+", "-"];
  const negative = "-";
  const display = () => {
    let value;
    if (solved) {
      value = eval(expression).toString();
    } else if (operators.indexOf(lastInput) < 0 && expression.length > 0) {
      value = variableInput;  
    } else {
      value = expression.match(/\D+$/);
    }
    return value;
  }
  const allClear = () => {
    setExpression("");
    setSolved(false);
  }
  const addVariable = (numberClicked, currentVariable) => {
    if (solved) {
      setExpression(numberClicked);
    } else if (currentVariable[0][0] == 0 && currentVariable[0].length == 1) {
      setExpression((prev) => {
        let newExpression = prev.slice(0, prev.length - 1);
        return newExpression + numberClicked;
      });
    } else {
      setExpression((prev) => prev + numberClicked);
    }
    setSolved(false);
  }
  const addDecimal = () => {
    // If no other input is entered
    if (solved) {
      setExpression("0.");
    // If there is a decimal
    } else if (!/[.]/g.test(variableInput)) {
      if (/\D/.test(lastInput)) {
        setExpression((prev) => prev + "0.");
      } else {
        setExpression((prev) => prev + ".");
      }
    }
    setSolved(false);
  }
  const addOperator = (symbolClicked) => {
    // Operator must be at second index or greater
    if (expression.length > 0) {
      // Select or change operator if both operator and negative not entered
      if (!(/\D{2,2}$/.test(expression))) {
        // Change operator
        if (operators.indexOf(lastInput) >= 0 && symbolClicked != negative) {
          setExpression((prev) => {
            let newExpression = prev.slice(0, prev.length - 1);
            return newExpression + symbolClicked;
          });
        // Add negative
        } else if (operators.indexOf(lastInput) >= 0 && symbolClicked == negative) {
          setExpression((prev) => prev + symbolClicked);
        // Add operator
        } else {
          setExpression((prev) => prev + symbolClicked);
        }
      // Change both operator and negative
      } else if ((/\D{2,2}$/.test(expression)) && symbolClicked != negative) {
        setExpression((prev) => {
          let newExpression = prev.slice(0, prev.length - 2);
          return newExpression + symbolClicked;
        });
      }
    }
    setSolved(false);
  }
  const solve = () => {
    let answer = eval(expression);
    setExpression(answer.toString());
    setSolved(true);
  }
  return (
    <div id="Calculator">
      <Display
        expression={expression}
        display={display} />
      <ButtonPad
        variableInput={variableInput}
        allClear={allClear}
        addVariable={addVariable}
        addDecimal={addDecimal}
        addOperator={addOperator}
        solve={solve} />
    </div>
  );
}

ReactDOM.render(<Calculator />, document.getElementById("root"));