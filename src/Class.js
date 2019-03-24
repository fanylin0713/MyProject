import React, { Component } from 'react';
import AppBar from './components/AppBar/AppBar'
import Button from './components/Button/Button';
import Tabs from './components/Tabs/Tabs';
import Selector from './components/Selector/ClassSelector';


class Class extends React.Component {
    
    render() {
        
        return (
            <div style={{backgroundColor:'#111B24'}}>
            <AppBar />
            <Selector />
            <Tabs />
            </div>
        )
    }

}

export default Class;