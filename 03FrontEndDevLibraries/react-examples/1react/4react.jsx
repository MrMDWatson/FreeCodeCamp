const broccoli = 5;
const BITCH = (<p>Yo mom</p>);

const AddNumbers = (a, b) => {
  return a + b;
}

const CurrentDate = (props) => {
  return (
    <div>
      <p>The current date is: {Date()}</p>
    </div>
  );
}

const MyComponent = (props) => {
  let name = "Watson"; 
  let c = AddNumbers(props.a, props.b);
  if (c > broccoli) {
    return (
      <div>
        <MyComp />
        <h2>My name is</h2>
        <p>{props.firstName}</p>
        <p>{name}</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>Nope</p>
      </div>
    );
  }
};

MyComponent.defaultProps = {
  firstName: "Enter name"
};

//MyComponent.propTypes = { firstName: PropTypes.string.isRequired };
const JSX = (
  <div className="main">
    <MyComponent a={5} b={7} firstName={"Matthew"}/>
    <p>Lets render this to the DOM</p>
  </div>
);

class MyComp extends React.Component {
  constructor(props) {
    super(props);
  }

  Program = () => {
    return (
      <div>
        <h2>React</h2>
      </div>
    );
  }

  render() {
    return (
      <div>
        <p>Answer is {BITCH}</p>
      </div>
    );
  }
}

ReactDOM.render(JSX, document.getElementById("root"));