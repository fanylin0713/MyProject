import React, { Component } from 'react';
import AppBar from './components/AppBar/AppBar'
import TextField from './components/TextField/TextField';


class Apply extends React.Component {
    render() {
        return (
            <div>
                <AppBar />
                <div style={{float:'left'}}>
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