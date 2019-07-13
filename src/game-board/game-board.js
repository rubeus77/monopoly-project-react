import React, {Component} from "react";
import './game-board.css';
import game_param from "./monopoly-board.json";
import CardInfo from "./card-info";
import Dice from './dice';



class GameBoard extends Component{
    state={
        players:[],
        playersProperties:[],
        bank: game_param.bank,
        fields: game_param.fields,
        districts: game_param.district,
        housePrice: game_param.house_hotels,
        // chance:game_param.chance_social.chance,
        // social:game_param.chance_social.social,
        numberOfPlayers:this.props.numberOfPlayers,
        playersNames:this.props.playersNames,
        positionToShow:0,
        activePlayer:0,
        playersPosition: [],
        btnBuyDisable:true,
        nextRoll: false,
        infoText:"",
        dices:[]
    }
            //TODO: 2. zoptymalizować tworzenie planszy
            //TODO: 4. rozbić logike na małe elementy
            //TODO: 5. zrobić logikę 
    rollDiceFn=()=>{
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
            this.setState({
                dices:[dice1, dice2]
            })
        }while(counter<repeat);
        diceSum=dice1+dice2;
        //TODO: dokończyć obsługe dubletu
        // if(dice1===dice2){
        //     diceSum+=100;
        //     rollDiceFn()
        // }
        
        return diceSum;
    }
    
    fillArray=(value)=>{
        let arrTemp=[];
        for(let i=0;i<this.state.numberOfPlayers;i++){
            arrTemp.push(value)
        }
        return arrTemp;
    }
    componentDidMount(){
        let bankTemp=this.state.bank;
        bankTemp.money-=1500*this.state.numberOfPlayers;
        this.setState({
            playersPosition: this.fillArray(0),
            players: this.fillArray(1500),
            bank:bankTemp,
        });
        let arrTmp=[];
        for(let i=0; i<this.state.numberOfPlayers;i++){
            arrTmp[i]=new Array([])
        }
        this.setState({
            playersProperties:arrTmp
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
        let diceSum= this.rollDiceFn();
        let positionOfPlayer=0;
        let positionOfPlayerArr=[];
        let fieldsTemp=this.state.fields;
        positionOfPlayerArr=this.state.playersPosition;
        positionOfPlayer=this.state.playersPosition[this.state.activePlayer]+diceSum;

        //sprawdzenie czy przejście przez "Start"
        if(positionOfPlayer>39){
            positionOfPlayer=positionOfPlayer-40;
            this.moneyTransfer(-200, this.state.activePlayer, 99)
        }
        //Sprawdzenie czy zatrzymano się na "Podatek dochodowy"
        if(positionOfPlayer===4){
            this.moneyTransfer(200, this.state.activePlayer, 99)
        }
        //Sprawdzenie czy zatrzymano się na "Domiar podatkowy"
        if(positionOfPlayer===38){
            this.moneyTransfer(100, this.state.activePlayer, 99)
        }
        if(fieldsTemp[positionOfPlayer].owner!==this.state.activePlayer && fieldsTemp[positionOfPlayer].owner!==99){
            let amount=fieldsTemp[positionOfPlayer].houses[fieldsTemp[positionOfPlayer].houseNumbers];
            this.moneyTransfer(amount, this.state.activePlayer, fieldsTemp[positionOfPlayer].owner)
        }
        //aktualizacja pozycji w tablicy pozycji graczy
        positionOfPlayerArr[this.state.activePlayer]=positionOfPlayer;
        this.setState({
            playersPosition:positionOfPlayerArr,
            positionToShow: positionOfPlayer,
            nextRoll: true
        })       
    }
    moneyTransfer=(amount,fromPlayer,toPlayer)=>{
        let playersTemp=this.state.players;
        let bankTemp=this.state.bank;
        playersTemp[fromPlayer]=this.state.players[fromPlayer]-amount;
        if(toPlayer===99){
            bankTemp.money+=amount;
            this.setState({
                bank: bankTemp
            })
        }else{
            playersTemp[toPlayer]=this.state.players[toPlayer]+amount;
        }
        this.setState({
            players: playersTemp,
        })
    }
    buyCard=()=>{
        //zmienne tymczasowe
        let fieldsTemp=this.state.fields;
        //przypisanie do karty nowego właściciela oraz zmiana statusu toSell na 'false'
        fieldsTemp[this.state.positionToShow].owner=this.state.activePlayer;
        fieldsTemp[this.state.positionToShow].toSell=false;      
        
        //dodanie do tablicy posiadłości
        let arrTmp=this.state.playersProperties;
        arrTmp[this.state.activePlayer].push(this.state.positionToShow)
        this.setState({
            fields: fieldsTemp,
            playersProperties: arrTmp
        })
        //zmniejszenie stanu gracza i zwiększenie stanu banku
        this.moneyTransfer(fieldsTemp[this.state.positionToShow].price, this.state.activePlayer, 99 )
    }
    endOfMove=()=>{
        let accPlayer=this.state.activePlayer;
        accPlayer++;
        accPlayer=(accPlayer>=this.state.numberOfPlayers)?0:accPlayer;
        this.setState({
            activePlayer: accPlayer,
            positionToShow: this.state.playersPosition[accPlayer],
            nextRoll: false
        })
    }
    toPledge=()=>{
        let fieldsTemp=this.state.fields;
        if(fieldsTemp[this.state.positionToShow].houseNumbers!==0){
            this.setState({
                infoText:"Musisz sprzedać wszystkie nieruchomości z danej karty własności."
            })
        }else{
            fieldsTemp[this.state.positionToShow].isPledge=true;
            this.setState({
                fields: fieldsTemp
            })
            this.moneyTransfer((fieldsTemp[this.state.positionToShow].price/2), 99, this.state.activePlayer);
        }
    }
    sellCard=()=>{
        let fieldsTemp=this.state.fields;
        if(fieldsTemp[this.state.positionToShow].houseNumbers!==0){
            this.setState({
                infoText:"Musisz sprzedać wszystkie nieruchomości z danej karty własności."
            })
        }else{
            let divider=1;
            if(fieldsTemp[this.state.positionToShow].isPledge){divider=2}
            fieldsTemp[this.state.positionToShow].isPledge=false;
            fieldsTemp[this.state.positionToShow].owner=99;
            this.setState({
                fields: fieldsTemp
            })
            this.moneyTransfer((fieldsTemp[this.state.positionToShow].price/divider), 99, this.state.activePlayer);
        }
    }
    unPledge=()=>{
        let fieldsTemp=this.state.fields;
        fieldsTemp[this.state.positionToShow].isPledge=false;
        this.setState({
            fields: fieldsTemp
        })
        this.moneyTransfer(((fieldsTemp[this.state.positionToShow].price/2)*1.1), this.state.activePlayer, 99);
    }
    buyHouse=()=>{
        //TODO: wybrać kartę
        //TODO: sprawdzicz czy ma domy/hotel
        //TODO: sprawdzić cenę domu/hotelu
        //TODO: dopisać do karty
        //TODO: odjąć z banku

    }
    sellHouse=()=>{
        //TODO: wybrać kartę
        //TODO: sprawdzicz czy ma domy/hotel
        //TODO: sprawdzić cenę domu/hotelu
        //TODO: dopisać do karty
        //TODO: odjąć z banku

    }
    render(){
        console.log("bank money: "+this.state.bank.money)
        console.log("pozycje graczy "+this.state.playersPosition)
        console.log("kasa graczy: "+this.state.players)
        console.log("Posiadłości: "+this.state.playersProperties)
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
                            <Dice dices={this.state.dices}/>
                            <button>Kup budynki</button>
                            <button onClick={this.endOfMove} disabled={!this.state.nextRoll}>Koniec rundy</button>
                            <CardInfo playersNames={this.state.playersNames} housePrices={this.state.housePrice} cardInfo={this.state.fields[this.state.positionToShow]} buy={this.buyCard} pledge={this.toPledge} sell={this.sellCard} player={this.state.activePlayer} unpledge={this.unPledge}/>
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