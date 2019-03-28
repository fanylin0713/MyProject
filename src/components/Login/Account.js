import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './Login.css';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        
        
    },
    textField: {
        width: 240,
        marginLeft: theme.spacing.unit * 10,
        marginRight: theme.spacing.unit,
    },
});

class OutlinedTextFields extends React.Component {
    state = {
        account: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="帳號"
                        value={this.state.name}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    /></div>
                <div>
                    <TextField
                        id="outlined-password-input"
                        label="密碼"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                    /></div>
                <div><a className="forget" href="">忘記密碼?</a></div>
                <div>
                    <button className="btn login-btn" type="submit" name="loginbutton">
                        <span>Log in</span>
                    </button>
                </div>
            </form>
        );
    }
}

OutlinedTextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);
