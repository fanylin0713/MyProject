import React from 'react';
import AppBar from '../AppBar/Appbar'
import Tabs from './Tabs';
import Selector from './ClassSelector';


class Class extends React.Component {
    
    render() {
        
        return (
            <div>
            <AppBar />
            <Selector />
            <Tabs />
            </div>
        )
    }

}

export default Class;