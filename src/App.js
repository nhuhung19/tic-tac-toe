import React, { Component } from 'react'
import Broad from './components/Broad'
import './App.css'
import FacebookLogin from 'react-facebook-login';


export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: ['', '', '', '', '', '', '', '', ''],
            nextPlayer: false, // false is X, true is O
            history: [],
            user: '',
        }
    }
    setParentState = (obj) => {
        this.setState(obj)
    }

    jumTo = (item,index) => {
        this.setState({
            squares: item.squares, nextPlayer: item.nextPlayer, history: this.state.history.filter((e,i) => i <= index)
        })
    }

    responseFacebook = (response) => {
        console.log(response);
        this.setState({
            user: response.name
        })
    }

    postData = async (timeScore) => {
        console.log(timeScore)
        let data = new URLSearchParams();
        data.append("player",  this.state.user); // data you wantna post (key, value)
        data.append("score", timeScore); // {player: "PLAYER_NAME", score: "TIME_ELAPSED_IN_SECONDS"}
        const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data.toString(),
            json: true
        });
        this.getData()
    }

    getData = async () => {
        const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
        let response = await fetch(url)
        let data = await response.json()
        console.log(data)
    }


    render() {
        if (!this.state.user) {
            return (
                <FacebookLogin
                    appId="1000293550354880"
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={this.responseFacebook} />
            )
        }
        return (
            <div>

                <div>
                    <div>User Name: {this.state.user}</div>
                    <h1>Tic Tac Toe</h1>
                    <ul>
                        {
                            this.state.history.map((el, index) => {
                                return (
                                    <li key={index}><button onClick={() => this.jumTo(el,index)}>{`Go to step ${index + 1}`}</button></li>
                                )
                            })
                        }
                    </ul>
                    <Broad
                        {...this.state}
                        setParentState={this.setParentState}
                        postData={this.postData}
                    />
                </div>

            </div>
        )
    }
}
