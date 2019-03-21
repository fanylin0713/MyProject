import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    // if (this.props.color === 'red') {
    //   return <button className="btn btn-orgin btn-red" {...this.props}/>
    // }
    const { type, ...other } = this.props
    let className = 'btn '

    if (type === 'home') {
      className = 'btn btn-home'
    }
    
    if (type === 'org'){
      className = 'btn btn-org'
    }

    return (
      <button className={className} {...other}/>
    );
  }
}

export default Button;
