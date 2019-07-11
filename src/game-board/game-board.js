import React, {Component} from "react";
import './game-board.css'

  
class GameBoard extends Component{
    state={
        playersNames: this.props.playersNames,
        numberOfPlayers: this.props.numberOfPlayers,
        fields:null
    }
            //TODO: 1. plik json z kartami wszystkimi
            //TODO: 2. zoptymalizować tworzenie planszy
            //TODO: 3. zdobić losowanie kostkami
            //TODO: 4. rozbić logike na małe elementy
            //TODO: 5. zrobić logikę 
            
    // componentDidMount(){
    //     fetch("http://localhost:3005/fields")
    //     .then(resp=>resp.json())
    //     .then(data=>(
    //         this.setState({
    //             fields: data
    //         })
    //     ))
    //     .catch(err=>alert(err))
    // }
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