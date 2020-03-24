import React, { Component } from 'react'
import Square from './Square'

export default class Broad extends Component {
   
    onSquareClick = (i) => {
        if(this.props.caculateWinner || this.props.squares[i]){
            return
        }
        console.log('index', this.props.historyGames)
        let historyGames = this.props.historyGames.slice(0, this.props.stepNumber + 1)
        let current = historyGames[historyGames.length - 1]
        let squareList = current.squares.slice()
        squareList[i] = this.props.nextPlayer ? 'O' : 'X'
        console.log('stepNumber', this.props.historyGames.length)
        this.props.setParentState({ 
            historyGames: historyGames.concat([{squares: squareList}]), 
            nextPlayer: !this.props.nextPlayer,
            stepNumber: historyGames.length
        })
    }
    render() {
        const winner = this.props.caculateWinner
        let status = ''
        if(winner) {
            status = 'Winner ' + winner
        } else{
            status = this.props.nextPlayer ? 'Next Player: O' : 'Next Player: X'
        }
        
        return (
            <div>
                <h2>{status}</h2>
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
