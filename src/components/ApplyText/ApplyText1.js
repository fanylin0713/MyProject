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

    // cssLabel: {
    //     '&$cssFocused': {
    //         color:' #FFBF5F',
    //     },
    // },
    // cssFocused: {},
    // cssUnderline: {
    //     '&:after': {
    //         borderBottomColor: '#FFBF5F !important',
    //         color: 'white',
    //     },
    // },
    // cssOutlinedInput: {
    //     '&$cssFocused $notchedOutline': {
    //         borderColor: '#FFBF5F',
    //         color: 'white',
    //     },
    // },
    // notchedOutline: {
    //     borderWidth: '1px',
    //     borderColor: 'white !important' ,
    // },

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
                    // classes={{
                    //     underline: classes.cssUnderline,
                    // }}
                    // InputLabelProps={{
                    //     shrink: true,
                    //     classes: {
                    //         root: classes.cssLabel,
                    //         focused: classes.cssFocused,
                    //     },
                    // }}
                    // InputProps={{
                    //     classes: {
                    //         focused: classes.cssFocused,
                    //     },
                    // }}
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

                <div>
                    <TextField
                        id="outlined-multiline-static"
                        label="備註"
                        multiline
                        rows="6"
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
