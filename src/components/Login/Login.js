import React from 'react';
import Header from '../LoginHeader/LoginHeader';
import Account from './LoginAccount';
import Area from './LoginArea';
class Login extends React.Component {

    render() {

        return (
            <div style={{ backgroundColor: "#111B24",width:"100%"}}>
                <div style={{height: "200px"}}>
                    <Header />
                </div>
                <div style={{backgroundColor: "#111B24", float:"left",width:'35%'}}>
                <Account />
                </div>
                <div style={{backgroundColor: "#111B24",float:"right",width:'65%',color:'white',fontSize:'18pt'}}>
                校區選擇：
                <Area />
                </div>
            </div>
        )
    }

}

export default Login;