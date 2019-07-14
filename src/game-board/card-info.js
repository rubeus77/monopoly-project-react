import React, {Component} from "react";
import './card-info.css';

class CardInfo extends Component{
    state={
        isOwner: false
    }
    componentDidMount(){        
        this.setState({
            isOwner: (this.props.cardInfo.owner===this.props.player)?true:false
        })
    }
    render(){
        //TODO: dorobić logikę wyświetlania przycisków 
        let ownerTemp; 
        ownerTemp= !(this.props.cardInfo.owner===99)?this.props.playersNames[this.props.cardInfo.owner]:"BANK";
        // if(){}
        // let btnsPledgeUnpledge= !this.props.cardInfo.isPledge?<button onClick={()=>this.props.pledge()}>Zastaw</button>:<button onClick={()=>this.props.unpledge()}>Wykup</button>
        // let btnsBuySell=this.props.cardInfo.toSell?<button onClick={()=>this.props.buy()}>Kup</button>:<button onClick={()=>this.props.sell()}>Sprzedaj</button>
        let btnsForCard=null;
        let btnsForCard1=null;
        if(this.props.cardInfo.owner===99 && this.props.cardInfo.toSell){
            btnsForCard=<button onClick={()=>this.props.buy()}>Kup</button>
        }else if(this.props.cardInfo.owner!==99 && this.props.cardInfo.owner===this.props.player){
            btnsForCard=<button onClick={()=>this.props.sell()}>Sprzedaj</button>
            btnsForCard1=!this.props.cardInfo.isPledge?<button onClick={()=>this.props.pledge()}>Zastaw</button>:<button onClick={()=>this.props.unpledge()}>Wykup</button>
        }else{
            btnsForCard=null
        }
        if(this.props.cardInfo.specialAction){
            return(
                <div>
                   <h1>{this.props.cardInfo.name}</h1> 
                   <h3>Specjalna</h3>
                </div>
            )
        }else{
            return(
                <div className="cardInfo">
                    <h1>{this.props.cardInfo.name}</h1>
                    <h4>Właściciel: {ownerTemp}</h4>
                    <h3>Cena: {this.props.cardInfo.price}</h3>
                    <h4>Opłaty za postój:</h4>
                    <table>
                        <tbody>
                        <tr>
                            <td>Bez całej dzielnicy:</td>
                            <td>{this.props.cardInfo.houses[0]}</td>
                        </tr>
                        <tr>
                            <td>Z całą dzielnicą:</td>
                            <td>{this.props.cardInfo.houses[0]*2}</td>
                        </tr>
                        <tr>
                            <td>Z 1 domem:</td>
                            <td>{this.props.cardInfo.houses[1]}</td>
                        </tr>
                        <tr>
                            <td>Z 2 domami:</td>
                            <td>{this.props.cardInfo.houses[2]}</td>
                        </tr>
                        <tr>
                            <td>Z 3 domami:</td>
                            <td>{this.props.cardInfo.houses[3]}</td>
                        </tr>
                        <tr>
                            <td>Z 4 domami:</td>
                            <td>{this.props.cardInfo.houses[4]}</td>
                        </tr>
                        <tr>
                            <td>Z hotelem:</td>
                            <td>{this.props.cardInfo.houses[5]}</td>
                        </tr>
                        <tr colSpan="2">
                            <td>
                             <hr/>
                            </td>
                        </tr>
                        <tr>
                            <td>Cena za dom:</td>
                            <td>{this.props.housePrices[this.props.cardInfo.lineOnBoard]}</td>
                        </tr>
                        <tr>
                            <td>Cena za hotel:</td>
                            <td>{this.props.housePrices[this.props.cardInfo.lineOnBoard]*5}</td>
                        </tr>
                        </tbody>
                    </table>
                    {/* blok przycisków */}
                    {/* {(this.props.cardInfo.owner===99 || !this.state.isOwner)?btnsBuySell:null} */}
                    {/* {this.props.cardInfo.toSell?<button onClick={()=>this.props.buy()}>Kup</button>:<button onClick={()=>this.props.sell()}>Sprzedaj</button>} */}
                    {/* {!this.props.cardInfo.isPledge?<button onClick={()=>this.props.pledge()}>Zastaw</button>:<button onClick={()=>this.props.unpledge()}>Wykup</button>} */}
                    {/* {this.state.isOwner?btnsPledgeUnpledge:null} */}
                    {btnsForCard}{btnsForCard1}

                </div>
            )
        }
    }
}


export default CardInfo;