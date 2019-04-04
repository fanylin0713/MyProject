import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        marginLeft: theme.spacing.unit * 10,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        minWidth: 120,
        width: 150,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit,
    },
    button: {
        margin: 'auto 30px',
        borderRadius: '30px',
        marginLeft: theme.spacing.unit * 10,
    },
});

class SimpleSelect extends React.Component {
    state = {
        grade: '',
        subject: '',
        myclass: '',
        labelWidth: 0,
    };

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.root} autoComplete="off">
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                        ref={ref => {
                            this.InputLabelRef = ref;
                        }}
                        htmlFor="outlined-grade-simple"
                    >
                        年級
                    </InputLabel>
                    <Select
                        value={this.state.grade}
                        onChange={this.handleChange}
                        input={
                            <OutlinedInput
                                labelWidth={this.state.labelWidth}
                                name="grade"
                                id="outlined-asubject-simple"
                            />
                        }
                    >
                        <MenuItem value="">
                            <em>年級</em>
                        </MenuItem>
                        <MenuItem value={10}>國一</MenuItem>
                        <MenuItem value={20}>國二</MenuItem>
                        <MenuItem value={30}>國三</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                        ref={ref => {
                            this.InputLabelRef = ref;
                        }}
                        htmlFor="outlined-subject-simple"
                    >
                        科目
                    </InputLabel>
                    <Select
                        value={this.state.subject}
                        onChange={this.handleChange}
                        input={
                            <OutlinedInput
                                labelWidth={this.state.labelWidth}
                                name="subject"
                                id="outlined-asubject-simple"
                            />
                        }
                    >
                        <MenuItem value="">
                            <em>科目</em>
                        </MenuItem>
                        <MenuItem value={10}>英文</MenuItem>
                        <MenuItem value={20}>數學</MenuItem>
                        <MenuItem value={30}>國文</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                        ref={ref => {
                            this.InputLabelRef = ref;
                        }}
                        htmlFor="outlined-myclass-simple"
                    >
                        班別
                    </InputLabel>
                    <Select
                        value={this.state.myclass}
                        onChange={this.handleChange}
                        input={
                            <OutlinedInput
                                labelWidth={this.state.labelWidth}
                                name="myclass"
                                id="outlined-asubject-simple"
                            />
                        }
                    >
                        <MenuItem value="">
                            <em>科目</em>
                        </MenuItem>
                        <MenuItem value={10}>英文A班</MenuItem>
                        <MenuItem value={20}>數學B班</MenuItem>
                        <MenuItem value={30}>國文C班</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="outlined" size='large' onClick={this.handleClick} className={classes.button}>搜尋</Button>
            </form>
        );
    }
}

SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);
