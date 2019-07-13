import React, {Component} from "react";

class Dice extends Component{
    
    render(){
        let styleDiv={
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start"
        }
        let styleDice={
            width: "40px",
            height: "40px",
            backgroundColor: "white",
            border:" 1px solid black",
            boxShadow: "2px 2px 5px 0px rgba(0,0,0,0.75)",
            margin: "10px",
            borderRadius: "5px",
            fontSize:"37px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight:"bold"
        }
        
        return(
            <div style={styleDiv}>
                <div style={styleDice}>{this.props.dices[0]}</div>
                <div style={styleDice}>{this.props.dices[1]}</div>
            </div>
        )
    }
}

export default Dice;