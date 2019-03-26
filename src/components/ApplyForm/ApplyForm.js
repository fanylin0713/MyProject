import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

const styles = theme => ({
    container: {
        color: 'white',

    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        color: 'white',
    },
});

class OutlinedTextFields extends React.Component {

    state = {
        name: '',
        number: '',
        school: '',
        class: '',
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

                </div>
                <div>
                    <TextField
                        id="outlined-helperText"
                        label="姓名"
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        className={classes.textField}
                        helperText="*Required"
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-helperText"
                        label="學號"
                        value={this.state.number}
                        onChange={this.handleChange('number')}
                        className={classes.textField}
                        helperText="*Required"
                        margin="normal"
                        variant="outlined"
                        placeholder="Placeholder"
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-name"
                        label="年級"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="date"
                        label="Birthday"
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div>
                    班別：
                </div>
                <div>
                    <TextField
                        id="outlined-name"
                        label="學校"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="手機"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-email-input"
                        label="Email"
                        className={classes.textField}
                        type="email"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-name"
                        label="住址"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                </div>
            </form>
        );
    }
}

OutlinedTextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);
