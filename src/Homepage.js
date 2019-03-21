import React, { Component } from 'react';
import AppBar from './components/AppBar/AppBar'
import HomepageBar from './components/HomepageBar/HomepageBar'
import Cards from './components/Cards/Cards'

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      card1: [
        {
          title: 'sign',
        },
        {
          title: 'rollcall'
        }
      ]
    }
  }

  render() {
    return (
      <div style={{ backgroundColor: "#111B24" }}>
        {/* 這是導覽 */}
        <AppBar />
        {/* 這是首頁導覽 */}
        <main style={{ marginTop: "20px" }}>
          <HomepageBar />
          <div style={{ width: "90%", height: "1000px", margin: "30px auto", display: "flex", flexDirection: "row" }}>
            <Cards titles={this.state.card1} />
            <Cards />
            <Cards />
          </div>
        </main>
      </div>
    )
  }

}

export default Homepage;