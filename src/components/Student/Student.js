import React from 'react';
import AppBar from '../AppBar/Appbar'
import { withStyles } from '@material-ui/core/styles';
import { Card, Typography} from '@material-ui/core';

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
                    </div>
                    <div className={classes.right}>
                    <Typography className={classes.rightText}>
                        <p>姓名：</p>
                        <p>年級：</p>
                        <p>班別：</p>
                        <p>生日：</p>
                        <p>手機：</p>
                        <p>學校：</p>
                        <p>Email：</p>
                        <p>住址：</p>
                        <p>聯絡人：</p>
                        <p>聯絡人電話：</p>
                        </Typography>
                    </div>
                    </Card>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Student);