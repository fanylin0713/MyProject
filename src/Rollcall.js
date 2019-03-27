import React, { Component } from 'react';
import AppBar from './components/AppBar/Appbar'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";


class Homepage extends React.Component {

  
  
  render() {
    return (
        <div>
            <AppBar />
        </div>
    )
  }

}

export default Homepage;