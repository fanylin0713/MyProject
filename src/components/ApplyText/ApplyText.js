import React, { Component } from 'react';
import './ApplyText.css';

class Button extends Component {
    render() {
        const { type, ...other } = this.props
        let className = 'text '

        if (type === 'org') {
            className = 'text text-org'
        }

        if (type === 'small') {
            className = 'text text-small'
        }

        return (
            <input type="text" className={className} {...other} />
        );
    }
}

export default Button;
