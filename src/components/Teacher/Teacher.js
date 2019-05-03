import React from 'react';
import AppBar from '../AppBar/Appbar'
import TeacherTable from './TeacherTable';

class Teacher extends React.Component {

    render() {
        return (
            <div>
                <AppBar/>
                <TeacherTable/>
            </div>
        )
    }

}

export default Teacher;