import React from 'react';
import AppBar from './components/AppBar/Appbar';
// import { NavLink } from "react-router-dom";
import Select from './components/OperationSelect/Select'
import { Card, Typography } from '@material-ui/core';
import Chart from "react-google-charts";


const piedata = [
  ["到課率", "Hours per Day"],
  ["出席", 70.3],
  ["缺席", 29.7], // CSS-style declaration
];
const pieoptions = {
  //title: "My Daily Activities",
  is3D: false,
  backgroundColor: 'transparent',
  heigth:400,
  width:400,
  colors: ['#7373b9', '#e6693e'],
  //testStyle:{color:'blue',fontSize:16},
  pieSliceTextStyle: {color: 'white',fontFamily:'Microsoft JhengHei',fontSize:14,fontWeight:"bold"},
  legend: {textStyle: {color: 'white',fontName:'Microsoft JhengHei',fontSize:14,fontWeight:"bold" }},
};

const bardata=[
  ['', '國中', '高中'],
  ['國文', 70, 82],
  ['英文', 88, 76],
  ['數學', 82, 90],
  ['理化', 88, 79],
  ['社會', 69, 89],
];

const baroptions={
  //backgroundColor: 'transparent',
  colors: ['#7373b9', '#e6693e'],
  width:475,
  height:380,
  is3D: false,
  backgroundColor:'transparent',
  legend: {textStyle: {color: 'white',fontName:'Microsoft JhengHei',fontSize:14,fontWeight:"bold" }},
  hAxis: {textStyle:{color:'white',fontName:'Microsoft JhengHei',fontSize:14,fontWeight:"bold"}},
  vAxis: {textStyle:{color:'white',fontName:'Microsoft JhengHei',fontSize:14,fontWeight:"bold"}},
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
          <Card style={{backgroundColor:"#111B24",border:'0.8px #FFBF5F solid',borderRadius:'1px',
            width:'60%',margin:'50px auto'}}>
            <Typography style={{marginTop:30,fontFamily: "Microsoft JhengHei",LetterSpacing:4,fontSize:16,
            fontWeight: "bold",color:'white'}}><a style={{marginLeft:50}}>到課率:</a>
            <a style={{marginLeft:350}}>本學期報名人數:1000/30000</a></Typography>

            <div style={{ backgroundColor: "#111B24" ,display:'flex',flexDirection:'row'}}>
            <Chart chartType="PieChart" data={piedata} options={pieoptions}/>
            </div>

            <div align="center">
            <Chart chartType="BarChart"data={bardata} options={baroptions} style={{marginTop:50,marginBottom:60,}}/>
            </div>

          </Card>
        </div>
        <div style={{height:20}}></div>
      </div>
    )
  }

}

export default Operation;