import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Myclass from './Myclass';
import { Card, Button } from '@material-ui/core';
import CameraIcon from '@material-ui/icons/CameraAltRounded';

const styles = theme => ({
    container: {
        color: 'white',

    },
    textField: {
        marginLeft: theme.spacing.unit * 5,
        marginRight: theme.spacing.unit * 5,
        color: 'white',
        width: '260px',
    },
    button: {
        display: 'flex',
        border: '1px #FFBF5F solid',
        borderRadius: '30px',
        color: '#FFBF5F',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
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
                    <Card style={{ width: '200px', height: '260px', margin: '40px auto' }} />
                    <Button className={classes.button}>
                        Train
                    <CameraIcon className={classes.rightIcon} />
                    </Button>
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
                    <Myclass />
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
                <div>
                    <TextField
                        id="outlined-name"
                        label="聯絡人"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="聯絡人手機"
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
