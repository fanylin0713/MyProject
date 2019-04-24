import React from 'react';
import AppBar from '../AppBar/Appbar'
import AnnounceTable from './AnnounceTable';

import AnnounceDialog from './AnnounceDialog';


class Announcement extends React.Component {
    
    render() {
        return (
            <div>
                <AppBar />
                <AnnounceDialog />
                <AnnounceTable />
            </div>
        )
    }

}

export default Announcement;