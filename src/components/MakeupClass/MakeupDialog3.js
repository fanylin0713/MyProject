import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from '@material-ui/core/styles';
import { fetchPostReserveStudent } from '../../api';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InfoIcon from '@material-ui/icons/Info';
import { Snackbar, SnackbarContent} from '@material-ui/core';

import Airtable from 'airtable';
const TABLE_NAME = 'ReserveTime';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);
function createData(date,address,time,people,stu) {
    return { id: date,address,time,people,stu};
  }
function createData1(people) {
    return { id: people};
  }


function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const styles = theme => ({
    root: {
        width: '800px',
        margin: 'auto',
    },
    container: {
        width: '400px',
        paddingLeft: '22%',
    },
    button: {
        border: 'white 1px solid',
        float: 'right',
    },
    textField: {
        width: 220,
        marginTop: theme.spacing.unit * 3,
    },
    formControl: {
        minWidth: 120,
        width: 220,
        marginTop: theme.spacing.unit * 3,
    },
});
//////Snackbar
const variantIcon = {
    warning: InfoIcon,
};
//snackBar
const styles1 = theme => ({
    warning: {
        height:60,
        backgroundColor: '#FFBF5F',
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        color: '#111B24',
    },
});
function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
    return (
        <SnackbarContent
        className={classNames(classes[variant], className)}
            message={
                <span className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            {...other}
        />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

class FormDialog extends React.Component {
    state = {
        student: '學號',
        id: '2019-06-01',
        subject: '補課項目',
        reserveData: [],
        canreserve:[],
        openSnack: false,
        // student: '學生',
        // id: '學號',
        // subject: '要補的課',
        open: false,
    };

    componentDidMount() {
        table.select({
            filterByFormula: 'AND(DATESTR="2019-06-01",reserve_time="18:30")',
            view: "Grid view",
            //maxRecords: 1
          }).eachPage((records, fetchNextPage) => {
            this.setState({ records });
            const reserve_date = this.state.records.map((record, index) => record.fields['reserve_date']);
            const reserve_address = this.state.records.map((record, index) => record.fields['reserve_address']);
            const reserve_time = this.state.records.map((record, index) => record.fields['reserve_time']);
            const reserve_people = this.state.records.map((record, index) => record.fields['reserve_people']);
            const reserve_stu = this.state.records.map((record, index) => record.fields['reserve_stu']);

            var temp = [];
            for (var index = 0; index < reserve_people.length; index++) {
              temp.push(createData(reserve_date[index],reserve_address[index],reserve_time[index],reserve_people[index]-1,reserve_stu[index]));
            }
            this.setState({ reserveData: temp });
            var temp1 = [];
            for (var index = 0; index < reserve_people.length; index++) {
              temp1.push(createData1(reserve_people[index]));
            }
            this.setState({ canreserve: temp1 });

          }
          );
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let data = { fields: { student_id: {}, reserve_date: {}, reserve_address: {}, reserve_time: {}, reserve_class: {} } };
        data.fields.student_id = this.state.student;
        data.fields.reserve_date = this.state.id;
        data.fields.reserve_address = '台北校區';
        data.fields.reserve_time = '18:30';
        data.fields.reserve_class = this.state.subject;
        console.log(this.state.reserveData[0].people)
        fetchPostReserveStudent(data);
        this.setState({ open: false });
        sleep(500).then(() => {
            window.location.reload();
        })
        var Airtable = require('airtable');
        var base = new Airtable({ apiKey: 'keyXDsb9gYuqjMaLC' }).base('appcXtOTPnE4QWIIt');
        base('ReserveTime').update("recRT6AoKIexhtIt1", {
            "reserve_date": "2019-06-01",
            "reserve_address": this.state.reserveData[0].address,
            "reserve_time": "18:30",
            "reserve_people":this.state.reserveData[0].people,
        });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });

    };

    handleClickOpen = () => {
        if(this.state.canreserve[0].id < 1 ){
            console.log(this.state.canreserve[0])
        this.setState({ open: false});
        this.setState({ openSnack: true });
        }
        else{
        this.setState({ open: true });
        }
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleCloseSnack = () => {
        this.setState({ openSnack: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                晚上（18:30~22:30）
                <Button className={classes.button} onClick={this.handleClickOpen}>預約補課</Button>
                <Dialog className={classes.root}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">新增預約資料</DialogTitle>
                    <DialogContent>
                        <form className={classes.container} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    id="outlined-name"
                                    label="id"
                                    className={classes.textField}
                                    value={this.state.student}
                                    onChange={this.handleChange('student')}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </div>
                            <div>
                                <TextField
                                    id="outlined-name"
                                    label="date"
                                    className={classes.textField}
                                    value={this.state.id}
                                    onChange={this.handleChange('id')}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </div>
                            <div>
                                <TextField
                                    id="outlined-email-input"
                                    label="subject"
                                    className={classes.textField}
                                    value={this.state.subject}
                                    onChange={this.handleChange('subject')}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">取消</Button>
                        <Button onClick={this.handleSubmit} color="primary">確定預約</Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={this.state.openSnack}
                            autoHideDuration={1800}
                            onClose={this.handleCloseSnack}
                        >
                            <MySnackbarContentWrapper
                                 message={"此時段預約已滿"}
                                onClose={this.handleCloseSnack}
                                variant="warning"
                                {...this.state}
                            />
                        </Snackbar>
            </div>
        );
    }
}

export default withStyles(styles)(FormDialog);