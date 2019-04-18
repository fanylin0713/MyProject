import React from 'react';
import AppBar from '../AppBar/Appbar'
import Tabs from '../Tabs/Tabs';
import Selector from '../ClassSelector/ClassSelector';


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