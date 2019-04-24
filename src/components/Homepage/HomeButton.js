import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        backgroundColor: '#111B24',
        border: '#FFBF5F 2px solid',
        borderRadius: '10px',
        height: '15%',
        width: '85%',
        color: 'white',
        fontSize: '24pt',
        margin: '10px 20px',
    },
});

function ContainedButtons(props) {
    const { classes } = props;
    return (
        <Button variant="contained" className={classes.button} />
    );
}

ContainedButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButtons);