const Sounds = [
  {
    keyCode: 81,
    text: "Q",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    text: "W",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    text: "E",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    text: "A",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    text: "S",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    text: "D",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    text: "Z",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    text: "X",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    text: "C",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

function Pad({ clip, setKeyDisplay }) {
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      playSound();
    }
  };
  const playSound = () => {
    const audioClip = document.getElementById(clip.text);
    setActive(true);
    setKeyDisplay(clip.text);
    setTimeout(() => setActive(false), 200);
    setTimeout(() => setKeyDisplay(""), 500);
    audioClip.play();
  }
  return (
    <div 
      className={`drum-pad ${active && "btn-danger"}`}
      id={`${clip.text}button`}
      onClick={playSound}>
      <audio className="clip" id={clip.text} src={clip.src}/>
      {clip.text}
    </div>
  );
}

function App() {
  const [keyDisplay, setKeyDisplay] = React.useState("");
  return (
    <div className="App">
      <div id="drum-machine">
        <div id="display">
          <div id="screen">
            {keyDisplay ? keyDisplay : ""}
          </div>
        </div>
        <div id="pads">
          {Sounds.map((clip) => (
            <Pad key={clip.id} clip={clip} setKeyDisplay={setKeyDisplay} />
          ))}
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));