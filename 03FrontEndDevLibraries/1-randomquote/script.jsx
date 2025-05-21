function App() {
  const [quote, setQuote] = React.useState({description: "test", author: "test"});
  const getQuote = async () => {
    try {
      const response = await fetch("http://www.iolaunchpad.com/quote", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const result = await response.json();
      console.log(result);
      setQuote(result);
    } catch(error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    getQuote();
  }, []);
  return (
    <div id="App">
      <div id="quote-box">
        <div id="quote">
          <h3 id="text">{quote.description}</h3>
        </div>
        <div id="author">
          <p>{quote.author ? `- ${quote.author}`: ""}</p>
        </div>
        <div id="quote-footer">
          <a href="https://twitter.com/intent/tweet" id="tweet-quote">Post on X</a>
          <button id="new-quote" target="_blank" onClick={getQuote}>New Quote</button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));