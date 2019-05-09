import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from '@material-ui/core/styles';

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
        student: '學生',
        id: '學號',
        subject: '要補的課',
        open: false,
    };

    componentDidMount() {
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({ open: false });
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
                早上
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
                                    label="Name"
                                    className={classes.textField}
                                    value={this.state.student}
                                    onChange={this.handleChange('')}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </div>
                            <div>
                                <TextField
                                    id="outlined-name"
                                    label="id"
                                    className={classes.textField}
                                    value={this.state.id}
                                    onChange={this.handleChange('')}
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
                                    onChange={this.handleChange('')}
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