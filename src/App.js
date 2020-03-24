import React, { Component } from 'react'
import Broad from './components/Broad'
import './App.css'

const caculateWinner = (squares) => {
    const arrayWinner = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 4, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < arrayWinner.length; i++) {
        const [a, b, c] = arrayWinner[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}
export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            historyGames: [{
                squares: ['', '', '', '', '', '', '', '', '']
            }],
            stepNumber : 0,
            nextPlayer: false // false is X, true is O
        }
    }
    setParentState = (obj) => {
        this.setState(obj)
    }
    jumTo = (step) => {
        this.setState = {
            stepNumber : step,
            nextPlayer : false
        }
    }
    render() {
        const historyGames = this.state.historyGames
        console.log('app', this.state.stepNumber)
        console.log('render again')
        const currentSquares = historyGames[this.state.stepNumber].squares
        console.log(historyGames)
        const move = historyGames.map((step, move) => {
            let desc = move ? `Go to move #${move}` : `Go to start game`
            return (
                <li key={move}>
                    <button onClick={() =>this.jumTo(move)}>{desc}</button>
                </li>
            )
        })
        return (
            <div>
                <div>
                    <h1>Tic Tac Toe</h1>
                    <Broad
                        historyGames={historyGames}
                        stepNumber={this.state.stepNumber}
                        squares={currentSquares}
                        nextPlayer={this.state.nextPlayer}
                        setParentState={this.setParentState}
                        caculateWinner={caculateWinner(currentSquares)} />
                </div>
                <div>{move}</div>
            </div>
        )
    }
}
