import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Button from './components/Button';
// import Proptest from './Proptest';
import LifeCycle from 'components/LifeCycle'
import Theme from '@e-group/react-material-components/dist/Theme'
import Homepage from './Homepage'
import Apply from './Apply';
import Class from './Class';
import theme from './theme';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

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
      
      // <Homepage />
      // <Proptest />
      <Router>
      <Theme theme={theme}>
      {/* <Login /> */}
      <Route exact path="/" component={Homepage} />
      <Route path="/apply" component={Apply} />
      <Route path="/class" component={Class} />
      <Route path="/login"  component={Login} />
      {/* < Class /> */}
      </Theme>
      </Router> 
      // <Demo></Demo>
      // <React.Fragment>
      //   <Button onClick={this.handleClick} color="red">change date message</Button>
      //   <LifeCycle data={this.state.data} />
      // </React.Fragment>
    );
  }
}

export default App;
