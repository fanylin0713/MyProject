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
import TeacherDialog from '../Dialog/TeacherDialog';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        marginLeft:'10%',
        marginTop: theme.spacing.unit * 3,
        minWidth: 120,
        width: 150,
    },
    button: {
        margin:'auto',
        marginTop: theme.spacing.unit * 4,
        marginLeft: theme.spacing.unit * 3,
        borderRadius: '30px',
        height: '40px',
    },
    add:{
        marginTop: theme.spacing.unit * 4,
    },
});

class SimpleSelect extends React.Component {
    state = {
        subject: '',
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
                {/* <Button variant="outlined" size='large' onClick={this.handleClick} className={classes.button}>搜尋</Button> */}
                <Button type="org" style={{marginTop:35,marginLeft:25}}>搜尋</Button>
                <span className={classes.add}><TeacherDialog/></span>
            </form>
        );
    }
}

SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);