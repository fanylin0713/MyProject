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
                <div style={{backgroundColor: "#111B24", float:"left",width:'35%',height:'1000px'}}>
                <Account />
                </div>
                <div style={{backgroundColor: "#111B24",float:"right",width:'65%',height:'1000px',color:'white',fontSize:'18pt'}}>
                校區選擇：
                <Area />
                </div>
            </div>
        )
    }

}

export default Login;