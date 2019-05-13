import React, { Component } from 'react';
import './App.css';
import Login from './components/Login/Login';
// import Proptest from './Proptest';
import Theme from '@e-group/react-material-components/dist/Theme'
import Homepage from './components/Homepage/Homepage'
import Apply from './components/Apply/Apply';
import Class from './components/Classpage/Class';
import Rollcall from './components/Rollcall/Rollcall';
import theme from './theme';
import Operation from './components/Operation/Operation'
import Announcement from './components/Announcement/Announcement';
import Makeupclass from './components/MakeupClass/MakeupClass';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Teacher from './components/Teacher/Teacher';
import Course from './components/Course/Course';
import Student from './components/Student/Student';
import Grade from './components/Classpage/Grade';


class App extends Component {
      // state = {
      //   data: 'data message'
      // }

      // handleClick = () => {
      //   this.setState({
      //     data: 'clicked data message'
      //   })
      // }

      render() {
            return (

                  <Router>
                        <Theme theme={theme}>
                              <Route exact path="/" component={Homepage} />
                              <Route path="/apply" component={Apply} />
                              <Route path="/class" component={Class} />
                              <Route path="/login" component={Login} />
                              <Route path="/operation" component={Operation} />
                              <Route path="/rollcall" component={Rollcall} />
                              <Route path="/announcment" component={Announcement} />
                              <Route path="/makeupclass" component={Makeupclass} />
                              <Route path="/teacher" component={Teacher} />
                              <Route path="/course" component={Course} />
                              <Route path="/student" component={Student} />
                              <Route path="/grade" component={Grade} />
                        </Theme>
                  </Router>
                  // <React.Fragment>
                  //   <Button onClick={this.handleClick} color="red">change date message</Button>
                  //   <LifeCycle data={this.state.data} />
                  // </React.Fragment>
            );
      }
}

export default App;
