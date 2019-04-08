import React from 'react';
import AppBar from './components/AppBar/Appbar'
import MakeupTable from './components/Table/MakeupTable';


class MakeupClass extends React.Component {
    
    render() {
        
        return (
            <div>
            <AppBar />
            <MakeupTable />
            </div>
        )
    }

}

export default MakeupClass;