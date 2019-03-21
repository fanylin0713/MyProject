import React, { Component } from 'react';
import AppBar from './components/AppBar/AppBar'
import TextField from './components/TextField/TextField';
import Button from './components/Button/Button';

class Apply extends React.Component {
    render() {
        return (
            <div style={{ backgroundColor: "#111B24" , height:"1000px"}}>
                <AppBar />
                <div style={{float:'left'}}>
                <Button onClick={this.handleClick} type="org">Train</Button>
                </div>
                
                <div style={{float:'right'}}>
                <TextField />
                <TextField />
                <TextField />
                </div>
            </div>
            
        )
    }

}

export default Apply;