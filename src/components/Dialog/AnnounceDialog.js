import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// const styles = {
//     textField: {
//         width: 200,
//     },
// };

export default class FormDialog extends React.Component {
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
                <Button variant="outlined" onClick={this.handleClickOpen}>
                    新增公告
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">新增公告</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="standard-with-placeholder"
                            placeholder="標題"
                            // className={classes.textField}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="內容"
                            multiline
                            rowsMax="8"
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
