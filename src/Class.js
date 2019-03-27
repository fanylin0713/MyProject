import React from 'react';
import AppBar from './components/AppBar/Appbar'
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