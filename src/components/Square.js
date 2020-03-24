import React, { Component } from 'react'

export default class Square extends Component {
    render() {
        return (
            <div className="text-mark" onClick={() => this.props.onClick()} style={{width :'150px', height: '150px', border :'1px solid black', fontSize :'30px'}}>
                {this.props.value}
            </div>
        )
    }
}
