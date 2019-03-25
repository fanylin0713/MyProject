import React, { Component } from 'react';
import Header from './components/Login/Header';
import Account from './components/Login/Account';
import Area from './components/Login/Area';
class Login extends React.Component {

    render() {

        return (
            <div style={{ backgroundColor: "#111B24",height: "100%",width:"100%"}}>
                <div style={{height: "200px"}}>
                    <Header />
                </div>
                <div style={{float:"left"}}>
                {/* <Account /> */}
                </div>
                <div style={{backgroundColor: "#111B24",float:"right",width:'65%',color:'white'}}>
                校區選擇：
                <Area />
                </div>
            </div>
        )
    }

}

export default Login;