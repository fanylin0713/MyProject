import React from 'react';
import AppBar from '../AppBar/Appbar'
import Tabs from './Tabs';
import Selector from './ClassSelector';


class Class extends React.Component {
    state = {
        //open: false,
        class_area:null,
        class_id:null,
    };
    myCallback = (dataFromChild) => {
        this.setState({ class_area: dataFromChild });
    }

    myCallbackSelector = (dataFromChild) => {
        this.setState({ class_id: dataFromChild });
    }
    
    render() {
        
        return (
            <div>
            <AppBar callbackFromParent={this.myCallback}/>
            <Selector callbackFromClassSelector={this.myCallbackSelector}/>
            <Tabs class_idFromParent={this.state.class_id}/>
            </div>
        )
    }

}

export default Class;