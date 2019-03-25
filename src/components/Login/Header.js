import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css';
import Button from '../Button/Button';
import Goodnight from './goodnight.png';

class Login extends React.Component {

    render() {
        return (
            <div >
                <hr className="line line1"></hr>

                <img className="goodnight" src={require('./goodnight.png')} alt="goodnight"></img>

                <hr className="line line2"></hr>
            </div>
        );
    }
}

export default Login;
