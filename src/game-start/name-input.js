import React, {Component} from "react";


class NameInput extends Component{ 
    state={
        playerName:"",
        btnDisabled:true
    }
    handleChange=(event)=>{
        this.setState({
            [event.target.name]: event.target.value
        },()=>{
            if(this.state.playerName!==""){
                this.setState({
                    btnDisabled: false
                })
            }
        })
    }
    render(){
        return(
            <React.Fragment>
                <input type="text" name="playerName" value={this.state.playerName} onChange={this.handleChange} /> 
                <button onClick={()=>{this.props.addName(this.state.playerName); this.setState({playerName:"", btnDisabled: true})}} disabled={this.state.btnDisabled}>Dodaj</button>
            </React.Fragment>
        )
    }
}

export default NameInput;