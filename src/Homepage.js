import React from 'react';

import AppBar from './components/AppBar/Appbar'
import HomepageBar from './components/Homepage/HomepageBar'
import Cards from './components/Cards/Cards'
import Button from './components/Button/Button'
import { NavLink } from "react-router-dom";

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
          <div style={{ width: "90%", margin: "30px auto", display: "flex", flexDirection: "row" }}>
            <Cards>
              課程辨識系統
              <hr style={{ borderColor: '#FFBF5F', }} />
              {/* 跳頁連結 */}
              <NavLink activeClassName="active" to="/apply">
                <Button type="home">報名</Button>
              </NavLink>
              <NavLink activeClassName="active" to="/rollcall">
                <Button type="home">點名</Button>
              </NavLink>
            </Cards>
            <Cards>
              課程管理
              <hr style={{ borderColor: '#FFBF5F', }} />
              <NavLink activeClassName="active" to="/class">
                <Button type="home">班級資料</Button>
              </NavLink>
              <NavLink activeClassName="active" to="/teacher">
              <Button type="home">老師管理</Button>
              </NavLink>
              <Button type="home">課程管理</Button>
            </Cards>
            <Cards>
              補習班管理
              <hr style={{ borderColor: '#FFBF5F', }} />
              <NavLink activeClassName="active" to="/operation">
              <Button type="home">營運狀態查詢</Button>
              </NavLink>
              <NavLink activeClassName="active" to="/makeupclass">
              <Button type="home">補課管理</Button>
              </NavLink>
              <NavLink activeClassName="active" to="/announcment">
                <Button type="home">公告</Button>
              </NavLink>
            </Cards>
          </div>
        </main>
      </div>
    )
  }

}

export default Homepage;