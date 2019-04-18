import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../Login/Login.css';
import goodnight from './goodnight.png';

class Login extends React.Component {

    render() {
        return (
            <div style={{display:"flex",backgroundColor:"#111B24",height:"200px"}}>
                <hr className="line line1"></hr>
                <img src={goodnight} className="goodnight" alt ="location" />
                <hr className="line line2"></hr>
            </div>
        );
    }
}

export default Login;
