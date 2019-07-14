import React, {Component} from "react";
//import logo from './logo.svg';
import GameBoard from './game-board/game-board';
import GameStart from './game-start/game-start';
//import './App.css';


function shuffleArray(array){
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


class App extends Component {
  state={
    //TODO: odremować i usunąć tymczasowe
    isStarted: false,
    playersNames:[]
    // isStarted: true,
    // playersNames:["Rafał", "Karolina"]
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
      {this.state.isStarted?<GameBoard numberOfPlayers={this.state.playersNames.length} playersNames={this.state.playersNames}/>:<GameStart clickFunction={this.clickStartHandle}/>}
      </>
    );
  }
 
}

export default App;
