import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import AppBar from './components/Appbar/Appbar'
import HomepageBar from './components/HomepageBar/HomepageBar'
import Cards from './components/Cards/Cards'
import Button from './components/Button/Button'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Select from './components/OperationSelect/Select'
import { Card, Typography } from '@material-ui/core';
import Chart from "react-google-charts";

const data = [
  ["到課率", "Hours per Day"],
  ["出席", 70.3],
  ["缺席", 29.7] // CSS-style declaration
];
const options = {
  //title: "My Daily Activities",
  is3D: false,
  backgroundColor: 'transparent',
  heigth:400,
  width:400,
  colors: ['#7373b9', '#e6693e'],
  testStyle:{color:'blue',fontSize:16},
  pieSliceTextStyle: {color: 'white',fontFamily:'Microsoft JhengHei',fontSize:14,fontWeight:"bold"},
  legend: {textStyle: {color: 'white',fontName:'Microsoft JhengHei',fontSize:14,fontWeight:"bold" }},
};


class Operation extends React.Component {

  render() {
    return (
      <div style={{ backgroundColor: "#111B24" }}>
        {/* 這是導覽 */}
        <AppBar />
        <div style={{backgroundColor: "#111B24",marginLeft:220,marginTop:30}}>
        <Select/>
        </div>
        <div style={{backgroundColor:"#111B24"}}>
        <Card style={{backgroundColor:"#212832",border:'0.8px #FFBF5F solid',borderRadius:'1px',
        width:'60%',margin:'50px auto'}}>
        <Typography style={{marginTop:30,fontFamily: "Microsoft JhengHei",etterSpacing:4,fontSize:16,
        fontWeight: "bold",color:'white'}}><a style={{marginLeft:50}}>到課率:</a>
        <a style={{marginLeft:350}}>本學期報名人數:1000/30000</a></Typography>
        <div style={{ backgroundColor: "#212832" ,display:'flex',flexDirection:'row'}}>
        <Chart chartType="PieChart" data={data} options={options}/>
        {/* <Typography style={{marginTop:30,fontFamily: "Microsoft JhengHei",etterSpacing:4,fontSize:16,
        fontWeight: "bold",color:'white'}}>1000/30000</Typography> */}
        </div>
        </Card>
        </div>
        <div style={{height:40}}></div>
      </div>
    )
  }

}

export default Operation;