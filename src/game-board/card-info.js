import React, {Component} from "react";
import './card-info.css';

class CardInfo extends Component{
    render(){
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
                    <h3>Cena: {this.props.cardInfo.price}</h3>
                    <h4>Opłaty za postój:</h4>
                    <table>
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
                    
                    <hr/>
                   
                        <tr>
                            <td>Cena za dom:</td>
                            <td>{this.props.housePrices[this.props.cardInfo.lineOnBoard]}</td>
                        </tr>
                        <tr>
                            <td>Cena za hotel:</td>
                            <td>{this.props.housePrices[this.props.cardInfo.lineOnBoard]*5}</td>
                        </tr>
                    </table>
                    
                    {this.props.cardInfo.toSell?<button onClick={()=>this.props.buy()}>Kup</button>:(!this.props.cardInfo.isPledge)?<button onClick={()=>this.props.pledge()}>Zasta</button>:<div><button onClick={()=>this.props.unpledge()}>Wykup</button><button onClick={()=>this.props.sell()}>Sprzedaj</button></div>}
                </div>
            )
        }
    }
}


export default CardInfo;