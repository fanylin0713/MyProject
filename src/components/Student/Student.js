import React from 'react';
import AppBar from '../AppBar/Appbar'
import { withStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

const styles = theme => ({
    card: {
        backgroundColor: '#212832',
        border: '0.8px #FFBF5F solid',
        borderRadius: '2px',
        width: '70%',
        marginTop: theme.spacing.unit * 3,
        margin: '0 auto',
    },
});

class Student extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar />
                <div>
                    <Card className={classes.card} >
                    
                    </Card>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Student);