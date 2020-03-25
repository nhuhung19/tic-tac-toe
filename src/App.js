import React, { Component } from 'react'
import Broad from './components/Broad'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Facebook from './components/Facebook'


export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: ['', '', '', '', '', '', '', '', ''],
            nextPlayer: false, // false is X, true is O
            history: [],
            user: '',
            highScores: null
        }
    }

    setParentState = (obj) => {
        this.setState(obj)
    }

    jumTo = (item, index) => {
        this.setState({
            squares: item.squares,
            nextPlayer: item.nextPlayer,
            history: this.state.history.filter((e, i) => i <= index)
        })
    }



    postData = async (timeScore) => {
        console.log(timeScore)
        let data = new URLSearchParams();
        data.append("player", this.state.user); // data you wantna post (key, value)
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
    }

    getData = async () => {
        const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
        let response = await fetch(url)
        let data = await response.json()
        this.setState({
            highScores: data.items
        })

        console.log(data)
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        if (!this.state.user) {
            return (
                <Facebook {...this.state} setParentState={this.setParentState} />
            )
        }
        if (!this.state.highScores) {
            return (
                <div>Loading...</div>
            )
        }
        return (
            <div className="text-center App">
                <h1>Tic Tac Toe</h1>
                <h3>User Name: {this.state.user}</h3>
                <div className="container">
                    <div >
                        <ul className="d-flex justify-content-center ">
                            {
                                this.state.history.map((el, index) => {
                                    return (
                                        <li key={index}><button className="mx-2" onClick={() => this.jumTo(el, index)}>{`Go to step ${index + 1}`}</button></li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="row d-flex justify-content-between">
                        <div className="col-log-6">
                            <Broad
                                {...this.state}
                                setParentState={this.setParentState}
                                postData={this.postData}
                            />
                        </div>
                        <div className="col-lg-6 d-flex flex-column align-items-start justify-content-end">
                            {
                                this.state.highScores.map((el, index) => {
                                    return (
                                        <div className="mt-2">Player: {el.player} / High Scores: {el.score}</div>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}
