import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import HomepageButton from '../HomepageButton/HomepageButton';

const styles = {
    card: {
    width: "30%",
    minWidth: 275,
    height: 500,
    backgroundColor: "#212832",
    margin:'0 30px',
    },
};

function SimpleCard(props) {
    const { classes } = props;

    return (
    <Card className={classes.card}>
        <CardContent>
        <HomepageButton titles = {props.titles}/>
        </CardContent>
    </Card>
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
