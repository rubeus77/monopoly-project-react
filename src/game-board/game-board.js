import React, {Component} from "react";
import './game-board.css';
import game_param from "./monopoly-board.json";

  
class GameBoard extends Component{
    state={
        bank: game_param.bank,
        fields: game_param.fields,
        districts: game_param.district,
        housePrice: game_param.house_hotels,
        chance:game_param.chance_social.chance,
        social:game_param.chance_social.social,
        numberOfPlayers:this.props.numberOfPlayers,
        playersNames:this.props.playersNames,
        dice:0,
        activePlayer:0,
        playersPosition: [],
        btnBuy:false
    }
            //TODO: 2. zoptymalizować tworzenie planszy
            //TODO: 4. rozbić logike na małe elementy
            //TODO: 5. zrobić logikę 
            
    componentDidMount(){
        let arrPosition=[];
        for(let i=0;i<this.state.numberOfPlayers;i++){
            arrPosition.push(0)
        }
        this.setState({
            playersPosition:arrPosition
        })

    //TODO: zrobic kiedyś na serverze JSON
    //     fetch("http://localhost:3005/fields")
    //     .then(resp=>resp.json())
    //     .then(data=>(
    //         this.setState({
    //             fields: data
    //         })
    //     ))
    //     .catch(err=>alert(err))
    }
    diceRoll=()=>{
        let repeat1=Math.floor(Math.random()*90+10);
        let repeat2=Math.floor(Math.random()*90+10);
        let repeat=0;
        let diceSum=0;
        repeat=(repeat1>repeat2)?repeat1:repeat2;
        let counter=0;
        let dice1=0;
        let dice2=0;
        do{
            if(counter<repeat1){dice1=Math.floor(Math.random()*6+1)};
            if(counter<repeat2){dice2=Math.floor(Math.random()*6+1)};
            counter++;
        }while(counter<repeat);
        diceSum=dice1+dice2;
        this.setState({
            dice: diceSum
        },()=>{
            let positionOfPlayer=0;
            positionOfPlayer=this.state.playersPosition[this.state.activePlayer]+this.state.dice;
            if((this.state.fields[positionOfPlayer].owner===99) && (this.state.fields[positionOfPlayer].toSell)){
                this.setState({
                    btnBuy:true
                })
            }else{
                this.setState({
                    btnBuy: false
                })
            }
            console.log("Warunek"+((this.state.fields[positionOfPlayer].owner===99) && (this.state.fields[positionOfPlayer].toSell)))
            console.log("btnBuy"+this.state.btnBuy)
        });
        
    }
    endOfMove=()=>{
        let accPlayer=this.state.activePlayer;
        accPlayer++;
        accPlayer=(accPlayer>=this.state.numberOfPlayers)?0:accPlayer
        this.setState({
            activePlayer: accPlayer
        })
    }
    render(){
        return(
            <React.Fragment>
                <h1>Board</h1>
                <div className="board">
                    <div className="top">
                        <div className="corner"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>                       
                        <div className="corner"></div>
                    </div>
                    <div className="middle">
                        <div>
                            <div className="column"></div>
                            <div className="column"></div>
                            <div className="column"></div>
                            <div className="column"></div>
                            <div className="column"></div>
                            <div className="column"></div>
                            <div className="column"></div>
                            <div className="column"></div>
                            <div className="column"></div>
                            <div className="column"></div>
                        </div>
                        

                        <div className="centerOfGame">
                            <ul className="playersNames">
                                {this.state.playersNames.map((elem,ind)=>(
                                    <li key={ind} className={(this.state.activePlayer===ind)?"active":""}>
                                        {elem}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={this.diceRoll}>Rzut</button>
                            <button>Kup posiadłość</button>
                            <button>Kup budynki</button>
                            <button onClick={this.endOfMove}>Koniec rundy</button>
                        </div>
                        <div>
                            <div className="column"></div>
                            <div className="column"></div>
                            <div className="column"></div>
                            <div className="column"></div>
                            <div className="column"></div>
                            <div className="column"></div>
                            <div className="column"></div>
                            <div className="column"></div>
                            <div className="column"></div>
                            <div className="column"></div>
                        </div>
                        
                        
                    </div>
                    <div className="bottom">
                        <div className="corner"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>                      
                        <div className="corner"></div>
                    </div>
                </div>
            </React.Fragment>     
        )
    }
}
export default GameBoard;