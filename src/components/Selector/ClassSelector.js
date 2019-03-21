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

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class SimpleSelect extends React.Component {
    state = {
        grade: '',
        subject:'',
        myclass:'',
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
                <FormControl className={classes.formControl}>
                    <Select
                        value={this.state.grade}
                        onChange={this.handleChange}
                        name="grade"
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                    <MenuItem value="" disabled>
                        年級
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
                        htmlFor="outlined-age-simple"
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
                        htmlFor="outlined-age-simple"
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
                <Button onClick={this.handleClick} type="org">搜尋</Button>
            </form>
        );
    }
}

SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);
