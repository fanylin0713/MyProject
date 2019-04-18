import React from 'react';
import AppBar from '../AppBar/Appbar'
import AnnounceTable from '../AnnounceTable/AnnounceTable';

import AnnounceDialog from '../AnnounceDialog/AnnounceDialog';


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