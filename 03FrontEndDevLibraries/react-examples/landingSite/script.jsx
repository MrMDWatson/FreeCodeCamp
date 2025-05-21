function App() {
  const [input, setInput] = React.useState("");
  const [text, setText] = React.useState("");

  const onChange = (e) => {
    setInput(e.target.value);
  }
  
  return (
    <div>
      <div id="root2"></div>
      <h1>{text}</h1>
      <input
        id="5"
        placeholder="Enter here"
        value={input}
        onChange={onChange}/>
        <br />
      <button
        id="9"
        onClick={() => setText(input)}>Submit</button>
    </div>
  );
}


ReactDOM.render(<App />, document.getElementById("root"));