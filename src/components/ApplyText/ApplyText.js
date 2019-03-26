import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

const styles = theme => ({
    container: {
        color: 'white',
        padding:'10px 300px',

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
                    姓名：
                <TextField
                        id="standard-with-placeholder"
                        placeholder="王小明"
                        className={classes.textField}
                        margin="normal"
                    />
                </div>

                <div>
                    生日：
                <TextField
                        id="date"
                        type="date"
                        defaultValue="2020-09-09"
                        className={classes.textField}
                        margin="normal"
                    />
                </div>

                <div>
                    學校：
                <TextField
                        id="standard-with-placeholder"
                        placeholder="XX中學"
                        className={classes.textField}
                        margin="normal"
                    />
                </div>

                <div>
                    班別：
                <TextField
                        id="standard-with-placeholder"
                        placeholder="英文A班"
                        className={classes.textField}
                        margin="normal"
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
