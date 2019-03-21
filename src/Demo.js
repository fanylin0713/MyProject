import React, { Component } from 'react';

class Bbutton extends React.Component{
    render() {
        const buttonStyle ={
            width: "100px",
            height: "30px",
            backgroundColor: "red"
        }
      return (
        <button style= {buttonStyle}>hey</button>
      )
    }
}

export default Bbutton;

