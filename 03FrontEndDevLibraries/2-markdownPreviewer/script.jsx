const example = `# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, \`<div></div>\`, between 2 backticks.\n\n\`\`\`\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n   if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {\n      return multiLineCode;\n   }\n }\n\`\`\`\n\nYou can also make text **bold**... whoa!\n\nOr _italic_.\n\nOr... wait for it... **_both!_**.\n\nThere's also [links](https://www.freecodecamp.org), and\n\>Block Quotes!\n\n- And of course there are lists.\n  - Some are bulleted.\n    - With different indentation levels.\n      - That look like this.\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`;
const data = {
  title: "Markdown Previewer",
  text: example
};
marked.setOptions({
  breaks: true
});
const renderer = new marked.Renderer();

function UpdateText({text}) {
  return (
    <div
      id="preview"
      dangerouslySetInnerHTML={{
        __html: marked(text, { renderer: renderer }),
      }}></div>
  );
}
class Previewer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="previewer-box">
        <div className="sub-title-box"><h4>Previewer</h4></div>
        <UpdateText
          text={this.props.text}/>
      </div>
    );
  }
}
class Editor extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="editor-box">
        <div className="sub-title-box"><h4>Editor</h4></div>
        <textarea
          id="editor"
          placeholder="Type here...."
          value={this.props.text}
          onChange={this.props.onChange}></textarea>
      </div>
    );
  }
}
function App() {
  const [text, setText] = React.useState(data.text);
  function onChange(e) {
    setText(e.target.value);
  }
  return (
    <div className="toolbar">
      <Editor
        text={text}
        onChange={onChange}/>
      <Previewer
        text={text}/>
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));