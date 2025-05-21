const style1 = {
    color: "black",
    fontSize: "4rem",
    textDecoration: "overline",
    marginBottom: 0
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "WE Gaming",
            user: "Matthew",
            message: "",
            count: 0,
            activeUsers: null,
            input: "",
            display: true,
            turn: 1,
            money: 500,
            bet: 100,
            number: "",
            chance: "Start Game",
            currentLog: "",
            betsList: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.betUp = this.betUp.bind(this);
        this.betDown = this.betDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.fold = this.fold.bind(this);
        this.updateLog = this.updateLog.bind(this);
        this.betEvent = this.betEvent.bind(this);
        this.foldEvent = this.foldEvent.bind(this);
        this.toggleDisplay = this.toggleDisplay.bind(this);
    }
    componentWillMount() {
        console.log("Loading");
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({activeUsers: 2});
        }, 2000);
        document.addEventListener("keydown", this.handleKeyPress);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
    }
    handleChange = (event) => {
        this.setState({input: event.target.value});
    }
    handleEnter = () => {
        this.setState(state => ({message: state.message + "Pressed"}));
    }
    handleKeyPress = (event) => {
        if (event.keyCode === 13) {
            this.handleEnter();
        }
    }
    betUp = () => {
        this.setState(state => ({bet: state.bet === -50
            ? state.bet + 100 : state.bet + 50}));
    }
    betDown = () => {
        this.setState(state => ({bet: state.bet === 50
            ? state.bet - 100 : state.bet - 50}));
    }
    handleClick = () => {
        this.setState(state => ({
            number: Math.floor(Math.random() * 10)
        }));
        this.setState(state => ({chance: state.number === ""
            ? "Start Game"
            : state.number >= 5
                ? "You Win"
                : "You Lose"
        }));
        this.setState(state => ({money: state.number === ""
            ? state.money
            : state.number >= 5
                ? state.money + state.bet
                : state.money - state.bet
        }));
        this.setState(prevState => {
            return {
                turn: prevState.turn + 1
            };
        });
    }
    fold = () => {
        this.setState(state => ({
            number: Math.floor(Math.random() * 10),
            chance: "Fold"
        }));
        this.setState(prevState => {
            return {
                turn: prevState.turn + 1
            };
        });
    }
    updateLog = () => {
        this.setState(state => ({
            currentLog: state.chance === "Fold"
                ? `${state.chance}`
                : `${state.chance} ${state.bet}`
        }));
        this.setState(state => ({
            betsList: state.betsList.concat(state.currentLog)
        }));
    }
    betEvent = () => {
        this.handleClick();
        this.updateLog();
    }
    foldEvent = () => {
        this.fold();
        this.updateLog();
    }
    nameChange = () => {
        this.setState(state => ({
            user: state.input,
            input: ""
        }));
    }
    toggleDisplay = () => {
        this.setState(state => ({display: !state.display}));
    }
    render() {
        return (
            <div>
                <Header data={this.state}/>
                <Main
                    data={this.state}
                    handleChange={this.handleChange}
                    betUp={this.betUp}
                    betDown={this.betDown}
                    betEvent={this.betEvent}
                    foldEvent={this.foldEvent}
                    nameChange={this.nameChange}
                    toggleDisplay={this.toggleDisplay}/>
            </div>
        )
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <header>
                <h1 style={style1}>{this.props.data.title}</h1>
                <p>Users: {this.props.data.activeUsers}</p>
            </header>
        )
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('Should I update?');
        return true;
    }
    componentDidUpdate() {
        console.log('Component re-rendered.');
    }
    render() {
        const nameField = (
            <div>
                <input
                    value={this.props.data.input}
                    onChange={this.props.handleChange}/>
                <button onClick={this.props.nameChange}>Enter</button>
            </div>
        )
        return (
            <main>
                <div style={{backgroundColor: "red", display: "flex"}}>
                    <div style={{width: "50%"}}>
                        <h2 style={{fontSize: "2rem", margin: 0, padding: "5px 10px"}}>Welcome {this.props.data.user}!</h2>
                    </div>
                    <div style={{display: "flex", width: "50%", justifyContent: "end", margin: "auto 0", padding: "0 15px 0 0"}}>
                        <button onClick={this.props.toggleDisplay}>Change Name</button>
                        {this.props.data.display && <div>{nameField}</div>}
                    </div>
                </div>
                <GameOne
                    data={this.props.data}
                    betUp={this.props.betUp}
                    betDown={this.props.betDown}
                    betEvent={this.props.betEvent}
                    foldEvent={this.props.foldEvent}/>
                {this.props.data.message}
                {this.props.data.betsList.length > 0 && <BetLog data={this.props.data}/>}
            </main>
        );
    }
};

class GameOne extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let gameWindowStyle = {backgroundColor: "silver", diaplay: "flex", border: "3px solid black", height: "200px", width: "200px", margin: "0px auto"};
        if (this.props.data.money <= 0) {
            gameWindowStyle["border"] = "3px solid red";
        }
        return (
            <div style={{backgroundColor: "#333333", border: "5px solid black", padding: "20px 0px 100px 0px", width: "246px", height: "100%", margin: "0px auto"}}>
                <div style={gameWindowStyle}>
                    <div style={{display: "flex"}}>
                        <h4 style={{textAlign: "left", marginTop: "0px", width: "50%"}}>Money: {this.props.data.money}</h4>
                        <h4 style={{textAlign: "right", marginTop: "0px", width: "50%"}}>Turn: {this.props.data.turn}</h4>
                    </div>
                    <h2 style={{textAlign: "center", marginBottom: "0px"}}>{this.props.data.chance}</h2>
                    <h4 style={{textAlign: "center"}}>{this.props.data.number}</h4>
                    <p style={{textAlign: "center"}}>Current bet: {this.props.data.bet}</p>
                </div>
                <div style={{textAlign: "center"}}>
                    <button className="btn btn-default" onClick={this.props.betUp}>Bet +</button>
                    <button className="btn btn-default btn-primary" onClick={this.props.betEvent}>Play</button>
                    <button className="btn btn-default" onClick={this.props.betDown}>Bet -</button>
                    <br />
                    <button className="btn btn-default btn-danger" onClick={this.props.foldEvent}>Fold</button>
                </div>
            </div>
        )
    }
}

class BetLog extends React.Component {
    constructor(props) {
        super(props);
    
    }
    render() {
        const betWins = this.props.data.betsList
            .filter(x => (/win/i.test(x)))
            .map((x, y) => <p key={"win" + y}>{x}</p>);
        const betLose = this.props.data.betsList
            .filter(x => (/lose/i.test(x)))
            .map((x, y) => <p key={"lose" + y}>{x}</p>);
        const betFold = this.props.data.betsList
            .filter(x => (/fold/i.test(x)))
            .map((x, y) => <p key={"fold" + y}>{x}</p>);
        return (
            <div style={{display: "flex", border: "3px solid black", margin: "0px auto", maxWidth: "fit-content"}}>
                {betWins.length > 0 && <div style={{padding: "0px 5px"}}>{betWins}</div>}
                {betFold.length > 0 && <div style={{padding: "0px 5px"}}>{betFold}</div>}
                {betLose.length > 0 && <div style={{padding: "0px 5px"}}>{betLose}</div>}
            </div>
        );
    }
    
}
//ReactDOMServer.renderToString(<App />);
ReactDOM.render(<App />, document.getElementById("root"));