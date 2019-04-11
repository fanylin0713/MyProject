import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root:{
        width: '800px',
        margin: 'auto',
    },
    btn:{
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 150,
        borderRadius:'10px',
    },
});

class FormDialog extends React.Component {
    state = {
        open: false
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
                <Button className={classes.btn} variant="outlined" onClick={this.handleClickOpen}>
                    新增公告
                </Button>
                <Dialog className={classes.root}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">新增公告</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="standard-with-placeholder"
                            placeholder="標題"
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="內容"
                            multiline
                            rows="10"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>取消</Button>
                        <Button onClick={this.handleClose}>發佈</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(FormDialog);