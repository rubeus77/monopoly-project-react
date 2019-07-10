import React, {Component} from "react";
import NameInput from "./name-input";
import './GameStart.css';

class GameStart extends Component{ 
    state={
        minPlayersNumber:2,
        maxPlayersNumber:6,
        playerNames:[],
        actualPlayersNumber:0
    }

    handleAddName=(playerName)=>{
        this.setState({
            playerNames:[...this.state.playerNames, playerName]
        },()=>{
            this.setState({
                actualPlayersNumber: this.state.playerNames.length
            })
            console.log(this.state.actualPlayersNumber+","+this.state.playerNames)
        })
        
    }
    
    render(){
        return(
            <>
                <h1>Witaj w grze MONOPOLY</h1>
                <h2>Gra jest projektem na koniec kursu JavaScript REACT Developer w CodersLAB</h2>
                <div className="playersNumber">
                    <p>Podaj imiona graczy (2-6 graczy):</p>
                </div>
                <div>
                    {this.state.playerNames.map((elem,ind)=><p key={ind}>Gracz {ind+1}: {elem}</p>)}
                    {(this.state.actualPlayersNumber<this.state.maxPlayersNumber) && <NameInput addName={this.handleAddName} />}
                </div>
                {(this.state.actualPlayersNumber>=this.state.minPlayersNumber) && <button onClick={()=>this.props.clickFunction(this.state.playerNames)}>Start Gry</button>}
                  
            </>
        )
    }
}
export default GameStart;