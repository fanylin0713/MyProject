import React from 'react';
import AppBar from './components/AppBar/Appbar';
import Select from './components/Operation/OperationSelect'
import { Card, Typography } from '@material-ui/core';
import Chart from "react-google-charts";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    select: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: '15%',
    },
    card: {
        backgroundColor: '#212832',
        border: '0.8px #FFBF5F solid',
        borderRadius: '2px',
        width: '70%',
        marginTop: theme.spacing.unit * 3,
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
    heigth: '800px',
    width: '400px',
    colors: ['#3366cc', '#ff9900'],
    //testStyle:{color:'blue',fontSize:16},
    pieSliceTextStyle: { color: 'white', fontFamily: 'Microsoft JhengHei', fontSize: 14, fontWeight: "bold" },
    legend: { textStyle: { color: 'white', fontName: 'Microsoft JhengHei', fontSize: 14, fontWeight: "bold" } },
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
    colors: ['#7373b9', '#e6693e'],
    width: 475,
    height: 380,
    is3D: false,
    backgroundColor: 'transparent',
    legend: { textStyle: { color: 'white', fontName: 'Microsoft JhengHei', fontSize: 14, fontWeight: "bold" } },
    hAxis: { textStyle: { color: 'white', fontName: 'Microsoft JhengHei', fontSize: 14, fontWeight: "bold" } },
    vAxis: { textStyle: { color: 'white', fontName: 'Microsoft JhengHei', fontSize: 14, fontWeight: "bold" } },
};


class Operation extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                {/* 這是導覽 */}
                <AppBar />
                <div className={classes.select}>
                    <Select />
                </div>
                <div>
                    <Card className={classes.card} >
                        <Typography style={{
                            marginTop: 30, fontFamily: "Microsoft JhengHei", LetterSpacing: 4, fontSize: 16,
                            fontWeight: "bold", color: 'white'
                        }}><a style={{ marginLeft: 50 }}>到課率:</a>
                            <a style={{ marginLeft: 350 }}>本學期報名人數:1000/30000</a></Typography>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Chart chartType="PieChart" data={piedata} options={pieoptions} />
                        </div>
                        <div align="center">
                            <Chart chartType="BarChart" data={bardata} options={baroptions} style={{ marginTop: 50, marginBottom: 60, }} />
                        </div>
                    </Card>
                </div>
                <div style={{ height: 20 }}></div>
            </div>
        )
    }

}

export default withStyles(styles)(Operation);