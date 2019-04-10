import React from 'react';
import AppBar from './components/AppBar/Appbar'
import { withStyles } from '@material-ui/core/styles';
import CourseTable from './components/Table/CourseTable';
import CourseDialog from './components/Dialog/CourseDialog';

const styles = theme => ({
});
class Course extends React.Component {
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
        const { classes } = this.props;
        return (
            <div>
                <AppBar />
                <CourseDialog />
                <CourseTable />
            </div>
        )
    }

}

export default withStyles(styles)(Course);