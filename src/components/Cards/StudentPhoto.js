import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const styles = {
    card: {
        backgtoundColot: 'white',
        width: '180px',
        height: '240px',
        margin: 'auto',
    },
};

function SimpleCard(props) {
    const { classes } = props;

    return (
        <Card className={classes.card}>
            
        </Card>
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);