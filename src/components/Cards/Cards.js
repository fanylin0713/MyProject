import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const styles = {
    card: {
    width: "30%",
    minWidth: 275,
    height: 500,
    backgroundColor: "#212832",
    margin:'0 30px',
    color: 'white',
    fontSize: '20pt',
    padding: '20px 30px'
    },
};

function SimpleCard(props) {
    const { classes, children } = props;

    return (
    <Card className={classes.card}>
        {children}
    </Card>
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
