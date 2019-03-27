import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import AppBar from './components/Appbar/Appbar'
import HomepageBar from './components/HomepageBar/HomepageBar'
import Cards from './components/Cards/Cards'
import Button from './components/Button/Button'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";


class Homepage extends React.Component {

  
  
  render() {
    return (
      <div style={{ backgroundColor: "#111B24" }}>
        {/* 這是導覽 */}
        <AppBar />
        {/* 這是首頁導覽 */}
        <main style={{ marginTop: "20px" }}>
          <HomepageBar />
          {/* 這是背景排序 */}
          <div style={{ width: "90%", height: "1000px", margin: "30px auto", display: "flex", flexDirection: "row" }}>
            <Cards>
              課程辨識系統
              <hr style={{borderColor:'#FFBF5F',}}/>
              <NavLink activeClassName="active" to="/apply">
              <Button type="home">報名</Button>
              </NavLink>
              <Button type="home">點名</Button>
            </Cards>
            <Cards>
              課程管理
              <hr style={{borderColor:'#FFBF5F',}}/>
              <NavLink activeClassName="active" to="/class">
              <Button onClick={this.handleClick} type="home">班級資料</Button>
              </NavLink>
              <Button onClick={this.handleClick} type="home">老師管理</Button>
              <Button onClick={this.handleClick} type="home">課程管理</Button>
            </Cards>
            <Cards>
              補習班管理
              <hr style={{borderColor:'#FFBF5F',}}/>
              <Button onClick={this.handleClick} type="home">營運狀態查詢</Button>
              <Button onClick={this.handleClick} type="home">補課管理</Button>
              <Button onClick={this.handleClick} type="home">公告</Button>
            </Cards>
          </div>
        </main>
      </div>
    )
  }

}

export default Homepage;