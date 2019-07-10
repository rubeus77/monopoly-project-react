import React, {Component} from "react";
//import logo from './logo.svg';
import GameBoard from './game-board/game-board';
import GameStart from './game-start/game-start';
import './App.css';


function shuffleArray(array){
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


class App extends Component {
  state={
    isStarted: false,
    playersNames:[]
  }

  clickStartHandle=(namesOfPlayers)=>{
    let arr= shuffleArray(namesOfPlayers)
    this.setState({
      isStarted: true,
      playersNames: arr
    })
  }

  render(){
    return (
      <>
      {this.state.playersNames.map((elem)=><p key={elem}>{elem}</p>)}
      {this.state.isStarted?<GameBoard numberOfPlayers={this.state.playersNames.length} playersNames={this.state.playersNames}/>:<GameStart clickFunction={this.clickStartHandle}/>}
      </>
    );
  }
 
}

export default App;
