import React from 'react';
import AppBar from '../AppBar/Appbar'
import MakeupTable1 from './MakeupTable1';
import MakeupTable2 from './MakeupTable2';
import MakeupTable3 from './MakeupTable3';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = theme => ({
    paper:{
        display: "flex",
        flexDirection: "row",
        color:'white',
    },
    table:{
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
                        早上
                        <Button className={classes.button}>預約補課</Button>
                        <MakeupTable1 />
                    </div>
                    <div className={classes.table}>
                        下午
                        <Button className={classes.button}>預約補課</Button>
                        <MakeupTable2 />
                    </div>
                    <div className={classes.table}>
                        晚上
                        <Button className={classes.button}>預約補課</Button>
                        <MakeupTable3 />
                    </div>
                </div>
            </div>
        )
    }

}

export default withStyles(styles)(MakeupClass);