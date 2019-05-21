import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from '@material-ui/core/styles';
import { fetchPostReserveStudent } from '../../api';

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
    button:{
        border:'white 1px solid',
        float:'right',
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
        student: '學號',
        id: '補課日期',
        subject: '補課項目',
        open: false,
    };

    componentDidMount() {
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let data = { fields: { student_id:{}, reserve_date:{}, reserve_address:{}, reserve_time:{}, reserve_class:{}} };
        data.fields.student_id = this.state.student;
        data.fields.reserve_date = this.state.id;
        data.fields.reserve_address = 'from bar';
        data.fields.reserve_time = '8:30';
        data.fields.reserve_class = this.state.subject;

        fetchPostReserveStudent(data);
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
                下午（13:30~17:30）
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
            </div>
        );
    }
}

export default withStyles(styles)(FormDialog);