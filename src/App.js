import React, { Component } from 'react';
import './App.css';
import Login from './Login';
// import Proptest from './Proptest';
import Theme from '@e-group/react-material-components/dist/Theme'
import Homepage from './Homepage'
import Apply from './Apply';
import Class from './Class';
import Rollcall from './Rollcall';
import theme from './theme';
import Operation from './Operation'
import Announcement from './Announcement';
import Makeupclass from './MakeupClass';
import { BrowserRouter as Router, Route } from "react-router-dom";


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
