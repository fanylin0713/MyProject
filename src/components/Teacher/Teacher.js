import React from 'react';
import AppBar from '../AppBar/Appbar'
import { withStyles } from '@material-ui/core/styles';
import TeacherTable from './TeacherTable';
import TeacherSelect from './TeacherSelect';
import TeacherComponent from './TeacherComponent';

const styles = theme => ({
});
class Teacher extends React.Component {
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
                <TeacherComponent/>
                {/* <TeacherSelect />
                <TeacherTable /> */}
            </div>
        )
    }

}

export default withStyles(styles)(Teacher);