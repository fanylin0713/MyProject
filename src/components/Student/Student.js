import React from 'react';
import AppBar from '../AppBar/Appbar'
import { withStyles } from '@material-ui/core/styles';
import { Card, Typography, Button} from '@material-ui/core';
import CameraIcon from '@material-ui/icons/CameraAltRounded';


const styles = theme => ({
    card: {
        backgroundColor: '#212832',
        border: '0.8px #FFBF5F solid',
        borderRadius: '2px',
        width: '70%',
        marginTop: theme.spacing.unit * 3,
        margin: '0 auto',
    },
    left:{
        float:'left',
        width:'40%',
    },
    photo:{
        width: '200px', 
        height: '260px',
        marginLeft: theme.spacing.unit * 18,
        marginTop:theme.spacing.unit * 10,
    },
    button: {
        border: '1px #FFBF5F solid',
        borderRadius: '30px',
        color: '#FFBF5F',
        margin: 'auto',
    },
    right:{
        width:'60%',
        float:'right',
        marginTop:theme.spacing.unit * 10,
    },
    rightText:{
        fontSize:'16pt',
    },
    leftText:{
        fontSize:'16pt',
        marginLeft: theme.spacing.unit * 18,
        marginTop:theme.spacing.unit * 2,
    },
});

class Student extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar />
                <div>
                    <Card className={classes.card} >
                    <div className={classes.left}>
                    <Card className={classes.photo}/>
                    <Typography className={classes.leftText}>
                    學號：
                    </Typography>
                    <Button className={classes.button}>
                    <CameraIcon/>
                    </Button>
                    <Button className={classes.button}>
                        Train
                    </Button>
                    </div>
                    <div className={classes.right}>
                    <Typography className={classes.rightText}>
                        <p>姓名：林奕蓓</p>
                        <p>年級：高三</p>
                        <p>班別：英文Ａ班、數學Ｃ班</p>
                        <p>生日：1998/07/13</p>
                        <p>手機：0988629621</p>
                        <p>學校：私立大同高中</p>
                        <p>Email：fanylin0713@gmail.com</p>
                        <p>住址：台北市北投區中和街</p>
                        <p>聯絡人：林珍瑤</p>
                        <p>聯絡人電話：0937924892</p>
                        </Typography>
                    </div>
                    </Card>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Student);