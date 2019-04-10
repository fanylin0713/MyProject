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

const styles = theme => ({
    root: {
        width: '800px',
        margin: 'auto',
    },
    formControl: {
        minWidth: 120,
        width: 220,
        marginTop: theme.spacing.unit * 3,
    },
    container: {
        width: '400px',
    },
    textField: {
        width: 220,
        marginTop: theme.spacing.unit * 3,
    },
    add:{
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 150,
        borderRadius:'10px',
    },
});

class FormDialog extends React.Component {
    state = {
        course: '',
        subject: '',
        email: '',
        subject: '',
        open: false
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
                <Button className={classes.add} variant="outlined" onClick={this.handleClickOpen}>
                    新增課程
                </Button>
                <Dialog className={classes.root}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">新增課程資料</DialogTitle>
                    <DialogContent>
                        <form className={classes.container} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    id="outlined-course"
                                    label="Course"
                                    className={classes.textField}
                                    value={this.state.course}
                                    onChange={this.handleChange('course')}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">取消</Button>
                        <Button onClick={this.handleClose} color="primary">新增</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(FormDialog);