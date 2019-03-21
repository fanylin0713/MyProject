import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

class OutlinedTextFields extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">

                <TextField
                    id="outlined-with-placeholder"
                    label="姓名"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />

            </form>
        );
    }
}

OutlinedTextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);
