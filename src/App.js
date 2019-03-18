import React, { Component } from 'react';
import './App.css';
// import Login from './components/Login';
import Button from './components/Button';
// import Proptest from './Proptest';
import LifeCycle from 'components/LifeCycle'
import Homepage from 'components/Homepage'
import Demo from './Demo'
import Appbar from './components/Appbar/Appbar';

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
      // <Login></Login>
      // <Homepage />
      <Appbar/>
      // <Proptest />
      // <Demo></Demo>
      // <React.Fragment>
      //   <Button onClick={this.handleClick} color="red">change date message</Button>
      //   <LifeCycle data={this.state.data} />
      // </React.Fragment>
    );
  }
}

export default App;
