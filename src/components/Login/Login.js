import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css';
import Button from '../Button/Button';
// import Button from 'components/Button'
// import { ReactComponent as Goodnight } from './goodnight.svg'
// import goodnight from './goodnight.svg'

class Login extends React.Component {

  render() {
    return (
      <div className="container-fluid">
      {/* <Button test="test"></Button> */}
        <div className="row align-items-end rowNum1">
          <div className="col">
            <hr className="line line1"></hr>
          </div>
          <div className="col-6 col-sm-6">
            {/* <img src={goodnight} className="goodnight" alt="logo" /> */}
            {/* <Goodnight className="goodnight" alt="logo" stroke="#DB7290" strokeWidth="1rem"/> */}
            <img className="goodnight" src={require('./goodnight.png') } alt="goodnight"></img>
          </div>
          <div className="col">
            <hr className="line line2"></hr>
          </div>
        </div>

        <div className="row align-items-end rowNum2">
          <div className="col-4 ">
          </div>
          <div className="col-2">
            校區選擇：
          </div>
          <div className="col-6">
          </div>
        </div>

        <div className="row rowNum3">
            <div className="col-4 ">
              <input className="textin account" type="text" name="account" placeholder="帳號："></input>
            </div>
            <div className="col-2 ">
              <Button onClick={this.handleClick} color=" ">北投校區</Button>
            </div>
            <div className="col-3">
              <input className="btn area mid" type="button" value="古亭校區"></input>
            </div>
            <div className="col-3">
              <input className="btn area" type="button" value="南港校區"></input>
            </div>
        </div>

        <div className="row rowNum4">
          <div className="col-4 ">
            <input className="textin password" type="password" name="password" placeholder="密碼："></input>
            <br></br>
            <a className="forget" href="">忘記密碼?</a>
            </div>
            <div className="col-2 ">
              <input className="btn area" type="button" value="士林校區"></input>
            </div>
            <div className="col-3">
              <input className="btn area mid" type="button" value="大安校區"></input>
            </div>
            <div className="col-3">
              <input className="btn area" type="button" value="台中校區"></input>  
            </div>
        </div>

        <div className="row rowNum5">
          <div className="col-4 ">
            <button className="btn login-btn" type="submit" name="loginbutton">
            <span>Log in</span>
            </button>
          </div>
          <div className="col-2 ">
            <input className="btn area" type="button" value="新莊校區"></input>
          </div>
          <div className="col-3">
            <input className="btn area mid" type="button" value="公館校區"></input>
          </div>
          <div className="col-3"> 
            <input className="btn area" type="button" value="南投校區"></input>
          </div>
        </div>
      </div>
      
    );
  }
}

export default Login;
