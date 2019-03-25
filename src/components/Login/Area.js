import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        marginTop: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 5,
        width: '250px',
        height: '60px',
        fontSize: '16pt',
    },
    input: {
        display: 'none',
    },
});

function OutlinedButtons(props) {
    const { classes } = props;
    return (
        <div>
            <div>
            <Button variant="outlined" className={classes.button}>
                台北校區
            </Button>
            <Button variant="outlined" className={classes.button}>
                台中校區
            </Button>
            <Button variant="outlined" className={classes.button}>
                台難校區
            </Button>
            </div>
            <div>
            <Button variant="outlined" className={classes.button}>
                台一校區
            </Button>
            <Button variant="outlined" className={classes.button}>
                台二校區
            </Button>
            <Button variant="outlined" className={classes.button}>
                台三校區
            </Button>
            </div>
            <div>
            <Button variant="outlined" className={classes.button}>
                台四校區
            </Button>
            <Button variant="outlined" className={classes.button}>
                台五校區
            </Button>
            <Button variant="outlined" className={classes.button}>
                台六校區
            </Button>
            </div>
        </div>
    );
}

OutlinedButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedButtons);
