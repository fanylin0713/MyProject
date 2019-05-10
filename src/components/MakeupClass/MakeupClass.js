import React from 'react';
import AppBar from '../AppBar/Appbar'
import MakeupTable1 from './MakeupTable1';
import MakeupTable2 from './MakeupTable2';
import MakeupTable3 from './MakeupTable3';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import MakeupDialog1 from './MakeupDialog1';
import MakeupDialog2 from './MakeupDialog2';
import MakeupDialog3 from './MakeupDialog3';


const styles = theme => ({
    paper:{
        display: "flex",
        flexDirection: "row",
        color:'white',
    },
    table:{
        width:'30%',
        margin:'auto',
        fontSize:'14pt',
        marginTop: theme.spacing.unit * 3,
    },
    button:{
        border:'white 1px solid',
        float:'right',
    },
});
class MakeupClass extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar />
                <div className={classes.paper}>
                    <div className={classes.table}>
                        <MakeupDialog1 />
                        <MakeupTable1 />
                    </div>
                    <div className={classes.table}>
                    <MakeupDialog2 />
                        <MakeupTable2 />
                    </div>
                    <div className={classes.table}>
                    <MakeupDialog3 />
                        <MakeupTable3 />
                    </div>
                </div>
            </div>
        )
    }

}

export default withStyles(styles)(MakeupClass);