import React from 'react';
import AppBar from './components/AppBar/Appbar'
import AnnounceTable from './components/Announce/AnnounceTable';


class Announcement extends React.Component {
    
    render() {
        
        return (
            <div>
            <AppBar />
            <AnnounceTable />
            </div>
        )
    }

}

export default Announcement;