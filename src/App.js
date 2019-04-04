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
<<<<<<< HEAD
import Operation from './Operation'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
=======
import { BrowserRouter as Router, Route } from "react-router-dom";
>>>>>>> 727fb28a4df99694d18af0f5db33668b08c3c126

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
<<<<<<< HEAD
      {/* <Login /> */}
      {/* <Operation/> */}
=======
>>>>>>> 727fb28a4df99694d18af0f5db33668b08c3c126
      <Route exact path="/" component={Homepage} />
      <Route path="/apply" component={Apply} />
      <Route path="/class" component={Class} />
      <Route path="/login"  component={Login} />
<<<<<<< HEAD
      <Route path="/operation" component={Operation}/>
      {/* < Class /> */}
=======
      <Route path="/rollcall"  component={Rollcall} />
>>>>>>> 727fb28a4df99694d18af0f5db33668b08c3c126
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
