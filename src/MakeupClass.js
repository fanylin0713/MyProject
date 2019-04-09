import React from 'react';
import AppBar from './components/AppBar/Appbar'
import MakeupTable1 from './components/Table/MakeupTable1';
import MakeupTable2 from './components/Table/MakeupTable2';
import MakeupTable3 from './components/Table/MakeupTable3';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper:{
        display: "flex",
        flexDirection: "row",
        color:'white',
    },
    table:{
        margin:'auto',
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