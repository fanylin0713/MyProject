import React from 'react';
import AppBar from './components/AppBar/Appbar'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
});
class Teacher extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar />
            </div>
        )
    }

}

export default withStyles(styles)(Teacher);