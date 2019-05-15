import React from 'react';
import AppBar from '../AppBar/Appbar'
import { withStyles } from '@material-ui/core/styles';
import { Card, Typography, Button } from '@material-ui/core';
import CameraIcon from '@material-ui/icons/CameraAltRounded';
import WarningIcon from '@material-ui/icons/Warning';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Airtable from 'airtable';
import amber from '@material-ui/core/colors/amber';
import axios from 'axios';

const TABLE_NAME = 'Student';
const SCORE_TABLE_NAME = 'TestScore';
const ATTEND_TABLE_NAME = 'Attend';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);
const scoreTable = base(SCORE_TABLE_NAME);
const attendTable = base(ATTEND_TABLE_NAME);
const IP = "http://localhost:8080";



const styles = theme => ({
    card: {
        backgroundColor: '#212832',
        border: '0.8px #FFBF5F solid',
        borderRadius: '2px',
        width: '70%',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 10,
        margin: '0 auto',
    },
    left: {
        float: 'left',
        width: '40%',
        paddingLeft: theme.spacing.unit * 18,
    },
    leftText: {
        fontSize: '16pt',
        marginTop: theme.spacing.unit * 2,
    },
    photo: {
        width: '200px',
        height: '200px',
        marginTop: theme.spacing.unit * 10,
    },
    button: {
        border: '1px #FFBF5F solid',
        borderRadius: '30px',
        color: '#FFBF5F',
        margin: 'auto',
        marginLeft: theme.spacing.unit * 3,
    },
    right: {
        width: '50%',
        float: 'right',
        marginTop: theme.spacing.unit * 10,
        marginBottom: theme.spacing.unit * 5,
        marginLeft: theme.spacing.unit,
    },
    rightText: {
        fontSize: '16pt',
        marginBottom: theme.spacing.unit * 2,
    },
    snack1: {
        backgroundColor: theme.palette.error.dark,
        minWidth: "200px",
        width: '200px',
        height: '40px',
        borderRadius: '50px',
        marginTop: theme.spacing.unit,
    },
    snack2: {
        backgroundColor: amber[700],
        minWidth: "200px",
        width: '200px',
        height: '40px',
        borderRadius: '50px',
        marginTop: theme.spacing.unit,
    },
    icon1: {
        backgroundColor: theme.palette.error.dark,
        fontSize: 20,
        color: 'white',
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    icon2: {
        backgroundColor: amber[700],
        fontSize: 20,
        color: 'white',
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        color: 'white',
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
        fail:true,
        homework:true,
    };

    //airtable
    componentDidMount() {

        const fileterSentence = 'AND(student_id = ' + this.props.location.aboutProps.name + ')'
        table.select({
            filterByFormula: fileterSentence,
            view: "Grid view",
            maxRecords: 1
        }).eachPage((records, fetchNextPage) => {
            this.setState({ records });

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

            this.setState({
                stu_id: student_id, stu_name: student_name, stu_img: student_img
                , stu_school: student_school, stu_grade: student_grade, stu_birth: student_birth, stu_address: student_address,
                stu_email: student_email, stu_phone: student_phone, stu_parent: student_parent, stu_parent_phone: student_parent_phone
            });
            fetchNextPage();
        }
        );

        scoreTable.select({
            filterByFormula: fileterSentence,
            view: "Grid view"
        }).eachPage((records, fetchNextPage) => {
            this.setState({ records });
            const test_score = this.state.records.map((record, index) => record.fields['test_score']);

            for(var index = 0; index < test_score.length; index++) {
                if(test_score[index] < 60){
                    this.setState({fail : false});
                }
            }
            // fetchNextPage();
        }
        );
        attendTable.select({
            filterByFormula: fileterSentence,
            view: "Grid view"
        }).eachPage((records, fetchNextPage) => {
            this.setState({ records });
            const attend_hw = this.state.records.map((record, index) => record.fields['attend_hw']);

            for(var index = 0; index < attend_hw.length; index++) {
                console.log(attend_hw[index]);
                if(attend_hw[index] != true){
                    this.setState({homework : false});
                }
            }
            // fetchNextPage();
        }
        );
    }
    handlestart = () => {
        axios.create({
            baseURL: IP,
            headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        }).get("/retrieveface")
            .then((response) => {
                console.log("in response");
                console.log('open :', response.status, '\nopen camera', new Date());
            })
            .catch((error) =>
                console.error(error)
            );
    };
    handleUpload = (e) => {
        e.preventDefault();
        ////
        let file = e.target.files[0];
        const formdata = new FormData();
        formdata.append('file', file);
        formdata.set('faceid', this.state.stu_id);

        axios({
            method: 'post',
            url: 'http://localhost:8080/train',
            data: formdata,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then((response) => {
                console.log("in upload")
            })
            .catch((error) =>
                console.error(error)
            );

            axios.create({
                baseURL: IP,
                headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
              }).get("/terminate")
              .then((response) => {
                console.log("in terminate");
            })
            .catch((error) =>
                console.error(error)
            );


    };

    render() {
        const { classes } = this.props;
        //console.log(this.props.location.aboutProps);
        return (
            <div>
                <AppBar />
                <div>
                    <Card className={classes.card} >
                        <div className={classes.left}>
                            <img className={classes.photo} src={this.state.stu_img} alt="location" />
                            <Typography className={classes.leftText}>
                                學號：{this.state.stu_id}
                            </Typography>
                            <Button className={classes.button} onClick={this.handlestart}>
                                <CameraIcon />
                            </Button>
                            <input type="file" name="file" ref="file"  id="contained-button-file" onChange={this.handleUpload} className={classes.input}/>
                            <Button className={classes.button}>
                                Train
                            </Button>
                            <SnackbarContent
                                hidden={this.state.fail}
                                className={classes.snack1}
                                variant="error"
                                message={
                                    <span id="client-snackbar" className={classes.message}>
                                        <WarningIcon className={classes.icon1} />
                                        成績預警
                                    </span>
                                }
                            />
                            <SnackbarContent
                                className={classes.snack2}
                                variant="warning"
                                message={
                                    <span id="client-snackbar" className={classes.message}>
                                        <WarningIcon className={classes.icon2} />
                                        缺席警告
                                    </span>
                                }

                                />
                            <SnackbarContent
                                hidden={this.state.homework}
                                className={classes.snack2}
                                variant="warning"
                                message={
                                    <span id="client-snackbar" className={classes.message}>
                                        <WarningIcon className={classes.icon2} />
                                        缺交作業提醒
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
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Student);