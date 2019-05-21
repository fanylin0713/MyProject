import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from '@material-ui/core/styles';


import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { fetchPostTeacher, fetchPostAccount } from '../../api';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');

function sleep (time) {
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

class FormDialog extends React.Component {
    state = {
        teacher_name: '',
        teacher_phone: '',
        teacher_email: '',
        subject: '',
        open: false,
        age: '',
        classData: [],
    };

    componentDidMount() {

        base('Teacher').select({ view: 'Grid view' })
            .eachPage(
                (records, fetchNextPage) => {
                    this.setState({ records });
                    console.log(records);
                    const subject_name = this.state.records.map((record, index) => record.fields['subject_name']);

                    var count = subject_name.length;
                    var temp = [];
                    var temp2 = [];
                    for (var index = 0; index < count; index++) {
                        temp.push(subject_name[index]);
                    }

                    var classResult = temp.filter(function (element, index, arr) {
                        return arr.indexOf(element) === index;
                    });

                    for (index = 0; index < classResult.length; index++) {
                        temp2.push(classResult[index]);
                    }

                    this.setState({ classData: temp2 });

                    fetchNextPage();
                }
            );

    }

    handleSubmit = (e) => {
        e.preventDefault()
        let data = { fields: { teacher_id: {}, teacher_name: {}, teacher_phone: {}, teacher_email: {}, subject_name: {} } };
        let accountData = {fields: {account_id: {}, account_passwd:{}, account_role:{} }};
        data.fields.teacher_id = "Teacher";
        data.fields.teacher_name = this.state.teacher_name;
        data.fields.teacher_phone = this.state.teacher_phone;
        data.fields.teacher_email = this.state.teacher_email;
        data.fields.subject_name = this.state.age;

        //account data
        accountData.fields.account_id = this.state.teacher_email;
        accountData.fields.account_passwd = '123';
        accountData.fields.account_role = 'teacher';

        fetchPostTeacher(data);
        fetchPostAccount(accountData);
        this.setState({ open: false });

        sleep(500).then(() => {
            window.location.reload();
        })
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="outlined" onClick={this.handleClickOpen}>
                    新增老師
                </Button>
                <Dialog className={classes.root}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">新增老師資料</DialogTitle>
                    <DialogContent>
                        <form className={classes.container} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    id="outlined-name"
                                    label="Name"
                                    className={classes.textField}
                                    value={this.state.name}
                                    onChange={this.handleChange('teacher_name')}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </div>
                            <div>
                                <TextField
                                    id="outlined-name"
                                    label="Phone"
                                    className={classes.textField}
                                    value={this.state.phone}
                                    onChange={this.handleChange('teacher_phone')}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </div>
                            <div>
                                <TextField
                                    id="outlined-email-input"
                                    label="Email"
                                    className={classes.textField}
                                    value={this.state.email}
                                    onChange={this.handleChange('teacher_email')}
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    margin="normal"
                                    variant="outlined"
                                />
                            </div>
                            <div>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel
                                        ref={ref => {
                                            this.InputLabelRef = ref;
                                        }}
                                        htmlFor="outlined-subject-simple"
                                    >
                                        Subject
                                </InputLabel>
                                    <Select
                                        // value={this.state.subject}
                                        // onChange={this.handleChange('subject')}
                                        // input={
                                        //     <OutlinedInput
                                        //         labelWidth={this.state.labelWidth}
                                        //         name="subject"
                                        //         id="outlined-subject-simple"
                                        //     />
                                        // }
                                        value={this.state.age}
                                        onChange={this.handleChange('age')}
                                        input={
                                            <OutlinedInput
                                                name="Age"
                                                labelWidth={this.state.labelWidth}
                                                id="outlined-asubject-simple"
                                            />
                                        }
                                    >
                                        <MenuItem value="1">
                                            <em>科目</em>
                                        </MenuItem>
                                        {(this.state.classData).map((n, index) => {
                                            return (
                                                <MenuItem key={n} value={n}>{n}</MenuItem>
                                            );
                                        })}
                                        {/* <MenuItem value={10}>國文</MenuItem>
                                        <MenuItem value={20}>數學</MenuItem>
                                        <MenuItem value={30}>英文</MenuItem> */}
                                    </Select>
                                </FormControl>
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">取消</Button>
                        <Button onClick={this.handleSubmit} color="primary">新增</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(FormDialog);