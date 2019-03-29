import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '../Button/Button';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        marginLeft:40,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class SimpleSelect extends React.Component {
    state = {
        grade: '',
        subject:'',
        teacher:'',
        myclass:'',
        labelWidth: 0,
    };

    // componentDidMount() {
    //     this.setState({
    //         labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    //     });
    // }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <Select
                        value={this.state.grade}
                        onChange={this.handleChange}
                        name="grade"
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                    <MenuItem value="" disabled>
                        <Typography align="center">年級</Typography>
                    </MenuItem>
                    <MenuItem value={1}>國一</MenuItem>
                    <MenuItem value={2}>國二</MenuItem>
                    <MenuItem value={3}>國三</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <Select
                        value={this.state.subject}
                        onChange={this.handleChange}
                        name="subject"
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                    <MenuItem value="" disabled>
                        科目
                    </MenuItem>
                    <MenuItem value={10}>國一</MenuItem>
                    <MenuItem value={20}>國二</MenuItem>
                    <MenuItem value={30}>國三</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <Select
                        value={this.state.teacher}
                        onChange={this.handleChange}
                        name="teacher"
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                    <MenuItem value="" disabled>
                        老師
                    </MenuItem>
                    <MenuItem value={10}>國一</MenuItem>
                    <MenuItem value={20}>國二</MenuItem>
                    <MenuItem value={30}>國三</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <Select
                        value={this.state.myclass}
                        onChange={this.handleChange}
                        name="myclass"
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                    <MenuItem value="" disabled>
                        班別
                    </MenuItem>
                    <MenuItem value={10}>國一</MenuItem>
                    <MenuItem value={20}>國二</MenuItem>
                    <MenuItem value={30}>國三</MenuItem>
                    </Select>
                </FormControl>
                
                <Button onClick={this.handleClick} type="org" style={{marginTop:25,marginLeft:30}}>匯出</Button>
            </form>
        );
    }
}

SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);
