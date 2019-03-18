import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    // if (this.props.color === 'red') {
    //   return <button className="btn btn-orgin btn-red" {...this.props}/>
    // }
    const { color, ...other } = this.props
    let className = 'btn btn-orgin'
    if (color === 'red') {
      className = 'btn btn-orgin btn-red'
    }
    return (
      <button className={className} {...other}/>
    );
  }
}

export default Button;
