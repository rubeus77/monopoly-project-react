import React, {Component} from "react";
import './game-board.css';
import game_param from "./monopoly-board.json";
import CardInfo from "./card-info";

function rollDiceFn(){
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
    //TODO: dokończyć obsługe dubletu
    // if(dice1===dice2){
    //     diceSum+=100;
    //     rollDiceFn()
    // }
    
    return diceSum;
}
class GameBoard extends Component{
    state={
        players: game_param.players,
        bank: game_param.bank,
        fields: game_param.fields,
        districts: game_param.district,
        housePrice: game_param.house_hotels,
        chance:game_param.chance_social.chance,
        social:game_param.chance_social.social,
        numberOfPlayers:this.props.numberOfPlayers,
        playersNames:this.props.playersNames,
        positionToShow:0,
        activePlayer:0,
        playersPosition: [],
        btnBuyDisable:true,
        nextRoll: false
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

    //TODO: zrobic kiedyś na serverze JSON będzie to lepsze ponieważ kontakt będzie z każdego komponentu niezależnie
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
        let diceSum= rollDiceFn();
        let positionOfPlayer=0;
        let positionOfPlayerArr=[];
        positionOfPlayerArr=this.state.playersPosition;
        positionOfPlayer=this.state.playersPosition[this.state.activePlayer]+diceSum;
        if(positionOfPlayer>39){
            positionOfPlayer=positionOfPlayer-40;
            let playersArr=this.state.players;
            playersArr[this.state.activePlayer]=this.state.players[this.state.activePlayer]+200;
            this.setState({
                players: playersArr
            })
        }
        positionOfPlayerArr[this.state.activePlayer]=positionOfPlayer;
        this.setState({
            playersPosition:positionOfPlayerArr,
            positionToShow: positionOfPlayer,
            nextRoll: true
        })       
    }
    buyCard=()=>{
        //zmienne tymczasowe
        let fieldsTemp=this.state.fields;
        let playerTemp=this.state.players;
        let bankTemp=this.state.bank;
        //przypisanie do karty nowego właściciela oraz zmiana statusu toSell na 'false'
        fieldsTemp[this.state.positionToShow].owner=this.state.activePlayer;
        fieldsTemp[this.state.positionToShow].toSell=false;
        //zmniejszenie stanu gracza i zwiększenie stanu banku
        playerTemp[this.state.activePlayer]-=fieldsTemp[this.state.positionToShow].price;
        bankTemp.money+=fieldsTemp[this.state.positionToShow].price;
        //przypisanie do state
        this.setState({
            fields: fieldsTemp,
            bank: bankTemp,
            player: playerTemp
        })
    }
    endOfMove=()=>{
        let accPlayer=this.state.activePlayer;
        accPlayer++;
        accPlayer=(accPlayer>=this.state.numberOfPlayers)?0:accPlayer
        this.setState({
            activePlayer: accPlayer,
            positionToShow:0,
            nextRoll: false
        })
    }
    toPledge=()=>{

    }
    sellCard=()=>{

    }
    unPledge=()=>{

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
                                        <p>{elem}</p>
                                        <p>${this.state.players[ind]}</p>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={this.diceRoll} disabled={this.state.nextRoll}>Rzut</button>
                            
                            <button>Kup budynki</button>
                            <button onClick={this.endOfMove} disabled={!this.state.nextRoll}>Koniec rundy</button>
                            <CardInfo housePrices={this.state.housePrice} cardInfo={this.state.fields[this.state.positionToShow]} buy={this.buyCard} pledge={this.toPledge} sell={this.sellCard} player={this.state.activePlayer} unpledge={this.unPledge}/>
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