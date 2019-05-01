import React from 'react';
import AppBar from '../AppBar/Appbar'
import { withStyles } from '@material-ui/core/styles';
import CourseTable from './CourseTable';
import CourseDialog from './CourseDialog';

const styles = theme => ({
});
class Course extends React.Component {
    state = {
        //open: false,
        class_area:null,
    };
    myCallback = (dataFromChild) => {
        this.setState({ class_area: dataFromChild });
    }


    // handleClickOpen = () => {
    //     this.setState({ open: true });
    // };

    // handleClose = () => {
    //     this.setState({ open: false });
    // };

    render() {
        //console.log(this.state.class_area);
        const { classes } = this.props;
        return (
            <div>
                <AppBar callbackFromParent={this.myCallback}/>
                <CourseDialog />
                <CourseTable listNameFromParent={this.state.class_area}/>
            </div>
        )
    }

}

export default withStyles(styles)(Course);