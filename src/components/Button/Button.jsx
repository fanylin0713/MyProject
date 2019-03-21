import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    // if (this.props.color === 'red') {
    //   return <button className="btn btn-orgin btn-red" {...this.props}/>
    // }
    const { type, ...other } = this.props
    let className = 'btn btn-orgin'

    if (type === 'big') {
      className = 'btn btn-orgin btn-big'
    }
    
    if (type === 'small'){
      className = 'btn btn-orgin btn-small'
    }
    
    return (
      <button className={className} {...other}/>
    );
  }
}

export default Button;
