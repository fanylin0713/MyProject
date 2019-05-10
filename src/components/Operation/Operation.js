import React from 'react';
import AppBar from '../AppBar/Appbar';
import Select from './OperationSelect'
import { Card, Typography } from '@material-ui/core';
import Chart from "react-google-charts";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    backgroundColor: '#212832',
    border: '0.8px #FFBF5F solid',
    borderRadius: '2px',
    width: '70%',
    marginTop: theme.spacing.unit * 5,
    margin: '0 auto',
  },
});


const piedata = [
  ["到課率", "Hours per Day"],
  ["出席", 70.3],
  ["缺席", 29.7], // CSS-style declaration
];

//圓餅圖
const pieoptions = {
  //title: "My Daily Activities",
  is3D: true,
  backgroundColor: 'transparent',
  // heigth: '800px',
  // width: '400px',
  colors: ['#0088FE', '#FFBB28'],
  //testStyle:{color:'blue',fontSize:16}
  chartArea: {
    width: '800px'
  },
  pieSliceTextStyle: { color: 'white', fontFamily: 'Microsoft JhengHei', fontSize: 14, fontWeight: "bold" },
  legend: { textStyle: { color: 'white', fontName: 'Microsoft JhengHei', fontSize: 14, fontWeight: "bold" } },
};

const linedata = [
  ['x', '人數'],
  [2010, 18274],
  [2011, 18249],
  [2012, 18274],
  [2013, 17489],
  [2014, 18134],
  [2015, 17489],
  [2016, 19284],
  [2017, 18273],
  [2018, 17833],
  [2019, 18540],
  [2020, 17649],
];

const lineoptions = {
  hAxis: {
    textStyle: {
      color: 'white'
    },
    title: '年份',
    titleTextStyle: {
      color: 'white'
    }
  },
  vAxis: {
    textStyle: {
      color: 'white'
    },
    title: '人數',
    titleTextStyle: {
      color: 'white'
    }
  },
  legend: {
    textStyle: {
      color: 'white',
    }
  },
  backgroundColor: '#212832',
};

const bardata = [
  ['', '國中', '高中'],
  ['國文', 70, 82],
  ['英文', 88, 76],
  ['數學', 82, 90],
  ['理化', 88, 79],
  ['社會', 69, 89],
];

//長條圖
const baroptions = {
  //backgroundColor: 'transparent',
  colors: ['#0088FE', '#FFBB28'],
  width: 475,
  height: 380,
  is3D: false,
  backgroundColor: 'transparent',
  legend: { textStyle: { color: 'white', fontSize: 14, fontWeight: "bold" } },
  hAxis: { textStyle: { color: 'white', fontSize: 14, fontWeight: "bold" } },
  vAxis: { textStyle: { color: 'white', fontSize: 14, fontWeight: "bold" } },
};


class Operation extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* 這是導覽 */}
        <AppBar />
        <div>
          <Card className={classes.card} >
            <Typography style={{
              marginTop: 30, fontFamily: "Microsoft JhengHei", LetterSpacing: 4, fontSize: 16,
              fontWeight: "bold", color: 'white'
            }}>
              <span style={{ marginLeft: '10%' }} >到課率:</span>
              <span style={{ marginLeft: '50%' }} >本學期報名人數:1000/30000</span>
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Chart chartType="PieChart" data={piedata} options={pieoptions} />
              <Chart style={{ width: '70%' }} chartType="LineChart" data={linedata} options={lineoptions} />
            </div>
            <div align="center">
              <Typography style={{
                marginTop: 30, fontFamily: "Microsoft JhengHei", LetterSpacing: 4, fontSize: 16,
                fontWeight: "bold", color: 'white'
              }}>
                <span style={{ margin: '0 auto' }} >本學期平均成績</span>
              </Typography>
              <Chart chartType="BarChart" data={bardata} options={baroptions} style={{ marginBottom: 60, }} />
            </div>
          </Card>
        </div>
        <div style={{ height: 20 }}></div>
      </div>
    )
  }

}

export default withStyles(styles)(Operation);