import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';


export default class Facebook extends Component {
    responseFacebook = (response) => {
        console.log(response);
        // try{
     this.props.setParentState({ user: response.name });
 // } catch(error){
 //     console.log(this)
 //     debugger
 // }
 
}
    render() {
        return (
            <div className="d-flex justify-content-center align-items-center">
                    <FacebookLogin
                    appId="257738505232021"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={(resp) => this.responseFacebook(resp)} />
            </div>
        )
    }
}
