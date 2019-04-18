import React from 'react';
import AppBar from '../AppBar/Appbar'
import MakeupTable1 from '../MakeupTable1/MakeupTable1';
import MakeupTable2 from '../MakeupTable2/MakeupTable2';
import MakeupTable3 from '../MakeupTable3/MakeupTable3';
import { withStyles } from '@material-ui/core/styles';

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
                        <MakeupTable1 />
                    </div>
                    <div className={classes.table}>
                        下午
                        <MakeupTable2 />
                    </div>
                    <div className={classes.table}>
                        晚上
                        <MakeupTable3 />
                    </div>
                </div>
            </div>
        )
    }

}

export default withStyles(styles)(MakeupClass);