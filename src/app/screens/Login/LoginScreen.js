import React, { Component } from 'react';
import {connect} from 'react-redux';

import {logIn, fetchPort} from '../../actions/Actions';
import Form from '../../components/Form/Form'; 

// Styles
import './LoginScreenStyle.css';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onLogin = this.onLogin.bind(this);
    }

    componentDidMount() {
        this.props.fetchPort();
    }

    onLogin(){
        const {username, password} = this.state
        this.props.logIn({username, password}).then((result)=> {
            console.log('onLogin result', result)
            if(result.payload.data.status === 'ok'){
                this.props.history.push('/visio')
            }
        }).catch((error) => {
            console.log('onLogin error', error)
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
const mapStateToProps = state => ({})

const mapDispatchToProps = { logIn, fetchPort }

export default connect (mapStateToProps,mapDispatchToProps)(LoginScreen);
