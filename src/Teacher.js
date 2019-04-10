import React from 'react';
import AppBar from './components/AppBar/Appbar'
import { withStyles } from '@material-ui/core/styles';
import TeacherTable from './components/Table/TeacherTable';
import TeacherSelect from './components/Selector/TeacherSelect';

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
                <TeacherSelect />
                <TeacherTable />
            </div>
        )
    }

}

export default withStyles(styles)(Teacher);