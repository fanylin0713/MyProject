import React from 'react';
import AppBar from '../AppBar/Appbar'
import { withStyles } from '@material-ui/core/styles';
import { Card, Typography, Button } from '@material-ui/core';
import CameraIcon from '@material-ui/icons/CameraAltRounded';
import WarningIcon from '@material-ui/icons/Warning';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Airtable from 'airtable';

import Pin from './pin.png';

const TABLE_NAME = 'Student';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);

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
    state = {
        stu_id: '',
        stu_name: '',
        stu_img: '',
        stu_school: '',
        stu_grade: '',
        stu_address: '',
        stu_birth: '',
        stu_phone: '',
        stu_email: '',
        stu_parent: '',
        stu_parent_phone: '',
      };

    //airtable
    componentDidMount() {
        
        const fileterSentence = 'AND(student_id = ' + this.props.location.aboutProps.name + ')'
        console.log(fileterSentence);
        table.select({
          filterByFormula: fileterSentence,
          view: "Grid view",
          maxRecords: 1
          }).eachPage((records, fetchNextPage) => {
            this.setState({records});
    
            const student_name = this.state.records.map((record, index) => record.fields['student_name']);
            const student_id = this.state.records.map((record, index) => record.fields['student_id']);
            const student_school = this.state.records.map((record, index) => record.fields['student_school']);
            const student_grade = this.state.records.map((record, index) => record.fields['student_grade']);
            const student_birth = this.state.records.map((record, index) => record.fields['student_birth']);
            const student_phone = this.state.records.map((record, index) => record.fields['student_phone']);
            const student_email = this.state.records.map((record, index) => record.fields['student_email']);
            const student_address = this.state.records.map((record, index) => record.fields['student_address']);
            const student_parent = this.state.records.map((record, index) => record.fields['student_parent']);
            const student_parent_phone = this.state.records.map((record, index) => record.fields['student_parent_phone']);
            const student_img = this.state.records.map((record, index) => record.fields['student_img'][0].url); 
    
            this.setState({ stu_id : student_id, stu_name : student_name, stu_img : student_img 
            ,stu_school : student_school , stu_grade : student_grade, stu_birth: student_birth, stu_address: student_address,
            stu_email : student_email, stu_phone : student_phone, stu_parent : student_parent, stu_parent_phone : student_parent_phone});
            //this.setState({ stu_id : student_id });
            fetchNextPage(); 
          }
          );
      }
    
    render() {
        const { classes } = this.props;
        //console.log(this.props.location.aboutProps);
        return (
            <div>
                <AppBar />
                <div>
                    <Card className={classes.card} >
                        <div className={classes.left}>
                            <Card className={classes.photo} src={Pin}/>
                            <Typography className={classes.leftText}>
                                學號：{this.state.stu_id}
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
                                    姓名：{this.state.stu_name}
                                </Typography>
                                <Typography className={classes.rightText}>
                                    年級：{this.state.stu_grade}
                                </Typography>
                                <Typography className={classes.rightText}>
                                    班別：英文Ａ班、數學Ｃ班
                                </Typography>
                                <Typography className={classes.rightText}>
                                    生日：{this.state.stu_birth}
                                </Typography>
                                <Typography className={classes.rightText}>
                                    手機：{this.state.stu_phone}
                                </Typography>
                                <Typography className={classes.rightText}>
                                    學校：{this.state.stu_school}
                                </Typography>
                                <Typography className={classes.rightText}>
                                    Email：{this.state.stu_email}
                                </Typography>
                                <Typography className={classes.rightText}>
                                    住址：{this.state.stu_address}
                                </Typography>
                                <Typography className={classes.rightText}>
                                    聯絡人：{this.state.stu_parent}
                                </Typography>
                                <Typography className={classes.rightText}>
                                    聯絡人電話：{this.state.stu_parent_phone}
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