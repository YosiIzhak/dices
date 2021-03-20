import React, { Component } from 'react'
import './App.css';
import './components/weekend.css'
import Player from './components/player.jsx'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cubes: [1, 4],
      player1: Player.getInitialState(),
      player2: Player.getInitialState(),
      turnOfPlayer: 1

    }
  }

  dicearr = [
    './images/dice-1.png',
    './images/dice-2.png',
    './images/dice-3.png',
    './images/dice-4.png',
    './images/dice-5.png',
    './images/dice-6.png']




  handleClick() {
    // cube
    var num1 = Math.floor(Math.random() * 6);
    var num2 = Math.floor(Math.random() * 6);
    this.setState({ cubes: [num1, num2] });

    // scores
    const score = num1 + num2 + 2;
    const playerKey = `player${this.state.turnOfPlayer}`;
    const playerCopy = JSON.parse(JSON.stringify(this.state[playerKey])); // clone trick
    if (score === 12) {
      playerCopy.currentScore = 0
      this.changeTurn()
    }
    else {
      playerCopy.currentScore += score;
    }
    playerCopy.playerKey = this.state.turnOfPlayer

    const playerXNewState = new Object();
    playerXNewState[playerKey] = playerCopy;
    console.log(playerXNewState);
    this.setState(playerXNewState)

  }
  changeTurn() {
    // turn
    const playerKey = `player${this.state.turnOfPlayer}`;
    const playerCopy = JSON.parse(JSON.stringify(this.state[playerKey]));
    this.setState({ turnOfPlayer: this.state.turnOfPlayer % 2 + 1 })
    playerCopy.globalScore += playerCopy.currentScore
    playerCopy.currentScore = 0
    if(playerCopy.globalScore >= 100){
      this.message()
      this.newGame()
    }
    const playerXNewState = new Object();
    playerXNewState[playerKey] = playerCopy;
    //console.log(playerXNewState);
    this.setState(playerXNewState)
  }
  newGame() {
   console.log('1111')
    const playerKey = `player1`;
    const playerCopy = JSON.parse(JSON.stringify(this.state[playerKey]));
    playerCopy.globalScore = 0
    playerCopy.currentScore = 0
    const playerXNewState = new Object();
    playerXNewState[playerKey] = playerCopy;
    this.setState(playerXNewState)
    const playerKey1 = `player2`;
    const playerCopy1 = JSON.parse(JSON.stringify(this.state[playerKey]));
    playerCopy1.globalScore = 0
    playerCopy1.currentScore = 0
    const playerXNewState1 = new Object();
    playerXNewState1[playerKey1] = playerCopy1;
    this.setState(playerXNewState1)
  }
  message(){
    <div id="message">player {this.state.turnOfPlayer} won this round!</div>
    console.log(`player ${this.state.turnOfPlayer} won this round!`)
  }

  render() {
    this.handleClick = this.handleClick.bind(this)
    this.changeTurn = this.changeTurn.bind(this)
    this.newGame = this.newGame.bind(this)
    return (
      <div >
        <div className="players">
          <Player player={this.state.player1} id='1' />
          <Player player={this.state.player2} id='2' />
        </div>
        <div className="dicesImg">
          <img id="img" src={this.dicearr[this.state.cubes[0]]} alt="dice1"
            style={{ width: 80, height: 80, margin: 10 }}
          />
          <img id="img" src={this.dicearr[this.state.cubes[1]]} alt="dice2"
            style={{ width: 80, height: 80, margin: 10 }}
          />
        </div>
        <div className="buttons">
          <button id="rollBtn" onClick={this.handleClick}>Roll</button>
          <button id="holdBtn" onClick={this.changeTurn}>Hold</button>
          <button id="newGameBtn" onClick={this.newGame}>New game</button>
          <div id="message"></div>
        </div>
       
      </div>
    );
  }
}
export default App