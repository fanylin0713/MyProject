import React from 'react';
import AppBar from '../AppBar/Appbar';
import { Card, Typography } from '@material-ui/core';
import Chart from "react-google-charts";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    backgroundColor: '#212832',
    border: '0.8px #FFBF5F solid',
    borderRadius: '2px',
    width: '80%',
    minWidth: '1000px',
    marginTop: theme.spacing.unit * 5,
    margin: '0 auto',
  },
  line: {
    width: '80%',
    margin: '0 auto',
  },
  pie: {
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    margin: '0 auto',
    marginTop: theme.spacing.unit * 5,
  },
  bar: {
    width: '80%',
    margin: '0 auto',
  }
});

//報名人數

const linedata = [
  ['x', '國中', '高中'],
  ['2010', 12430, 13530],
  ['2011', 15410, 12435],
  ['2012', 12423, 14215],
  ['2013', 12417, 15329],
  ['2014', 12518, 15310],
  ['2015', 15739, 13325],
  ['2016', 12311, 15233],
  ['2017', 15327, 13819],
  ['2018', 12727, 15819],
];

//報名人數（國高中）
const lineoptions = {
  title: "歷年報名人數：",
  titleTextStyle: { color: 'white', fontSize: 20, bold: false },
  hAxis: {
    textStyle: { color: 'white' },
    title: '年度',
    titleTextStyle: { color: 'white' }
  },
  vAxis: {
    textStyle: { color: 'white' },
    title: '人數',
    titleTextStyle: { color: 'white' }
  },
  legend: {
    textStyle: { color: 'white', }
  },
  series: { 0: { color: '#0088FE'}, 1: { color: '#FFBB28'} },
  backgroundColor: 'transparent',
};

//國中出席率
const piedata1 = [
  ["到課率", "Hours per Day"],
  ["出席", 70.3],
  ["缺席", 29.7],
];

const pieoptions1 = {
  title: "本學期國中到課率：",
  is3D: true,
  backgroundColor: 'transparent',
  display: 'flex',
  colors: ['#0088FE', '#FFBB28'],
  titleTextStyle: { color: 'white', fontSize: 20, bold: false },
  pieSliceTextStyle: { fontSize: 16 },
  legend: { textStyle: { color: 'white', fontSize: 16 } }
};

//高中出席率
const piedata2 = [
  ["到課率", "Hours per Day"],
  ["出席", 87.4],
  ["缺席", 12.6],
];

const pieoptions2 = {
  title: "本學期高中到課率：",
  is3D: true,
  backgroundColor: 'transparent',
  colors: ['#0088FE', '#FFBB28'],
  titleTextStyle: { color: 'white', fontSize: 20, bold: false },
  pieSliceTextStyle: { fontSize: 16 },
  legend: { textStyle: { color: 'white', fontSize: 16 } }
};

//平均成績分布（國、高中）

const bardata = [
  ['科目', '國中', '高中'],
  ['國文', 57.4, 49.8],
  ['英文', 76.4, 65.7],
  ['數學', 35.4, 29.3],
  ['自然', 39.6, 74.3],
  ['社會', 87.6, 57.7],
];

const baroptions = {
  title: '國、高中平均成績表',
  chartArea: { width: '80%' },
  backgroundColor: 'transparent',
  titleTextStyle: { color: 'white', fontSize: 20, bold: false },
  legend: { textStyle: { color: 'white', fontSize: 16 } },
  colors: ['#0088FE', '#FFBB28'],
  hAxis: {
    title: '成績',
    textStyle: { color: 'white' },
    titleTextStyle: { color: 'white' },
    minValue: 0,
  },
  vAxis: {
    title: '科目',
    textStyle: { color: 'white' },
    titleTextStyle: { color: 'white' },
  },
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
            <Typography variant='h5' align='center' style={{ marginTop: '3%' }} >《 補習班營運總表 》</Typography>
            {/* 報名人數 */}
            <div className={classes.line}>
              <Chart
                width={'920px'}
                height={'400px'}
                chartType="LineChart"
                data={linedata}
                options={lineoptions}
                rootProps={{ 'data-testid': '2' }}
              />
            </div>
            <div className={classes.pie}>
              <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>正在讀取...</div>}
                data={piedata1}
                options={pieoptions1}
                rootProps={{ 'data-testid': '2' }}
              />
              <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                data={piedata2}
                options={pieoptions2}
                rootProps={{ 'data-testid': '2' }}
              />
            </div>
            <div className={classes.bar}>
              <Chart
                width={'920px'}
                height={'400px'}
                chartType="BarChart"
                data={bardata}
                options={baroptions}
                // For tests
                rootProps={{ 'data-testid': '1' }}
              />
            </div>
          </Card>
        </div>
      </div>
    )
  }

}

export default withStyles(styles)(Operation);