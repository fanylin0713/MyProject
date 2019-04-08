import React from 'react';
import AppBar from './components/AppBar/Appbar'
import AnnounceTable from './components/Table/AnnounceTable';

import AnnounceDialog from './components/Dialog/AnnounceDialog';


class Announcement extends React.Component {

    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    
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