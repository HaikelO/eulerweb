import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import {logIn} from './../actions/Actions';
import Form from './../components/Form'; 

// Styles
import './LoginScreen.css';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onLogin = this.onLogin.bind(this);
    }

    onLogin(){
        this.props.logIn().then((result)=> {
            console.log('onLogin result', result);
            if(result.payload.data.status === 'ok'){
                this.props.history.push('/visio');
            }
        }).catch((error) => {
            console.log('onLogin error', error);
        });
    }

    render() {
        return (
            <div>
                <Form handleSubmit={()=>this.onLogin()}>
                    <label className="label">Login</label>   
                    <input type="text" className="input"/>
                    <label className="label">Password</label>
                    <input type="password" className="input"/>
                </Form>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logIn }, dispatch);
}
export default connect (mapStateToProps,mapDispatchToProps)(LoginScreen);
