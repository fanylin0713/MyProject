import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
    homebtn:{
        backgroundColor: "#111B24",
        border: "#FF7F00 2px solid",
        borderRadius: "10px",
        height: "70px",
        width: "220px",
        color: "white",
        fontSize: "24pt",
    }
}

function HomepageButton(props){
    const { classes } = props;
    // console.log();
    // const titles = props.titles.map((title,i) => 
    //     <Button key ={i} className={classes.homebtn}>{title.title}</Button>
    //     );
    return(
        <Button className={classes.props} />
        // <div>
        //     {titles}
        // </div>
    );
}

export default withStyles(styles)(HomepageButton)