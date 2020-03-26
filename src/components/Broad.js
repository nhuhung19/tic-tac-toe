import React, { Component } from 'react'
import Square from './Square'


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
let gameOver = true
export default class Broad extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timeStart: null
        }
    }



    onSquareClick = (i) => {
        if (!this.state.timeStart) {
            let timeStart = Date.now()
            this.setState({
                timeStart: timeStart
            })
        }
        if (caculateWinner(this.props.squares) || this.props.squares[i]) {
            return
        }
        let squareList = this.props.squares.slice()
        squareList[i] = this.props.nextPlayer ? 'O' : 'X'
        this.props.setParentState({
            squares: squareList,
            nextPlayer: !this.props.nextPlayer,
            history: [...this.props.history, { squares: squareList, nextPlayer: !this.props.nextPlayer }],
        })
    }





    render() {
        let status = ''
        let timeScores
        if (gameOver) {
            status = 'Game Over'
        } else {
            let winner = caculateWinner(this.props.squares)
            if (winner || this.props.squares.every((square) => square !== '')) {
                status = 'Winner ' + winner
                timeScores = Math.ceil((Date.now() - this.state.timeStart) / 1000)
                this.props.postData(timeScores)
                // return
            } else {
                status = this.props.nextPlayer ? 'Next Player: O' : 'Next Player: X'
            }
        }


        return (
            <div>
                <h2>{status}</h2>
                <h2>Score: {timeScores}</h2>
                <div style={{ display: 'flex' }}>
                    <Square value={this.props.squares[0]} onClick={() => this.onSquareClick(0)} />
                    <Square value={this.props.squares[1]} onClick={() => this.onSquareClick(1)} />
                    <Square value={this.props.squares[2]} onClick={() => this.onSquareClick(2)} />
                </div>
                <div style={{ display: 'flex' }}>
                    <Square value={this.props.squares[3]} onClick={() => this.onSquareClick(3)} />
                    <Square value={this.props.squares[4]} onClick={() => this.onSquareClick(4)} />
                    <Square value={this.props.squares[5]} onClick={() => this.onSquareClick(5)} />
                </div>
                <div style={{ display: 'flex' }}>
                    <Square value={this.props.squares[6]} onClick={() => this.onSquareClick(6)} />
                    <Square value={this.props.squares[7]} onClick={() => this.onSquareClick(7)} />
                    <Square value={this.props.squares[8]} onClick={() => this.onSquareClick(8)} />
                </div>
            </div>
        )
    }
}
