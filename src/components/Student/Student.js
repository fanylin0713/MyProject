import React from 'react';
import AppBar from '../AppBar/Appbar'
import { withStyles } from '@material-ui/core/styles';
import { Card, Typography, Button } from '@material-ui/core';
import CameraIcon from '@material-ui/icons/CameraAltRounded';
import WarningIcon from '@material-ui/icons/Warning';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const styles = theme => ({
    card: {
        backgroundColor: '#212832',
        border: '0.8px #FFBF5F solid',
        borderRadius: '2px',
        width: '70%',
        marginTop: theme.spacing.unit * 3,
        margin: '0 auto',
    },
    left: {
        float: 'left',
        width: '40%',
    },
    photo: {
        width: '200px',
        height: '260px',
        marginLeft: theme.spacing.unit * 18,
        marginTop: theme.spacing.unit * 10,
    },
    button: {
        border: '1px #FFBF5F solid',
        borderRadius: '30px',
        color: '#FFBF5F',
        margin: 'auto',
    },
    right: {
        width: '50%',
        float: 'right',
        marginTop: theme.spacing.unit * 10,
        marginLeft: theme.spacing.unit,
    },
    rightText: {
        fontSize: '16pt',
        marginBottom: theme.spacing.unit * 2,
    },
    snack: {
        backgroundColor: theme.palette.error.dark,
        minWidth: "200px",
        width: '200px',
        height: '40px',
        borderRadius: '50px',
    },
    icon: {
        backgroundColor: theme.palette.error.dark,
        fontSize: 20,
        color: 'white',
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        color: 'white',
    },
    leftText: {
        fontSize: '16pt',
        marginLeft: theme.spacing.unit * 18,
        marginTop: theme.spacing.unit * 2,
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
                            <Card className={classes.photo} />
                            <Typography className={classes.leftText}>
                                學號：405401360
                            </Typography>
                            <Button className={classes.button}>
                                <CameraIcon />
                            </Button>
                            <Button className={classes.button}>
                                Train
                            </Button>
                            <SnackbarContent
                                className={classes.snack}
                                variant="error"
                                message={
                                    <span id="client-snackbar" className={classes.message}>
                                        <WarningIcon className={classes.icon} />
                                        成績預警
                                    </span>
                                }
                            />
                        </div>
                        <div className={classes.right}>
                            <div>
                                <Typography className={classes.rightText}>
                                    姓名：林奕蓓
                                </Typography>
                                <Typography className={classes.rightText}>
                                    年級：高三
                                </Typography>
                                <Typography className={classes.rightText}>
                                    班別：英文Ａ班、數學Ｃ班
                                </Typography>
                                <Typography className={classes.rightText}>
                                    生日：1998/07/13
                                </Typography>
                                <Typography className={classes.rightText}>
                                    手機：0988629621
                                </Typography>
                                <Typography className={classes.rightText}>
                                    學校：私立大同高中
                                </Typography>
                                <Typography className={classes.rightText}>
                                    Email：fanylin0713@gmail.com
                                </Typography>
                                <Typography className={classes.rightText}>
                                    住址：台北市北投區中和街
                                </Typography>
                                <Typography className={classes.rightText}>
                                    聯絡人：林珍瑤
                                </Typography>
                                <Typography className={classes.rightText}>
                                    聯絡人電話：0937924892
                                </Typography>
                            </div>

                            <Button className={classes.button}>編輯</Button>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Student);