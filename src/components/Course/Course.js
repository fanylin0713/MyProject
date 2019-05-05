import React from 'react';
import AppBar from '../AppBar/Appbar'
import CourseTable from './CourseTable';
import CourseDialog from './CourseDialog';

class Course extends React.Component {
    state = {
        //open: false,
        class_area:null,
    };
    myCallback = (dataFromChild) => {
        this.setState({ class_area: dataFromChild });
    }

    render() {
        //console.log(this.state.class_area);
        return (
            <div>
                <AppBar callbackFromParent={this.myCallback}/>
                <CourseDialog listNameFromParent={this.state.class_area}/>
                <CourseTable listNameFromParent={this.state.class_area}/>
            </div>
        )
    }

}

export default Course;