import React, { Component } from 'react';
import './App.css';
// import Login from './components/Login';
import Button from './components/Button';
// import Proptest from './Proptest';
import LifeCycle from 'components/LifeCycle'
import Homepage from './Homepage'
import Demo from './Demo'
import Apply from './Apply';

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
      <Homepage />
      // <Proptest />
      // <Apply />
      // <Demo></Demo>
      // <React.Fragment>
      //   <Button onClick={this.handleClick} color="red">change date message</Button>
      //   <LifeCycle data={this.state.data} />
      // </React.Fragment>
    );
  }
}

export default App;
