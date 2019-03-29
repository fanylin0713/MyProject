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
                    <InputLabel ref={ref => {this.InputLabelRef = ref;}}
                        htmlFor="outlined-age-simple"
                        style={{ontFamily: "Microsoft JhengHei",fontSize:16,color:'white',}}>
                        年級</InputLabel>
                    <Select value={this.state.grade} onChange={this.handleChange}
                        input={<OutlinedInput labelWidth={this.state.labelWidth} name="grade"
                        id="outlined-asubject-simple"
                        style={{ontFamily: "Microsoft JhengHei",fontSize:16,color:'white'}}/>}>
                        
                        <MenuItem value="" style={{fontFamily: "Microsoft JhengHei",fontSize:16,color:'white'}}>
                        年級</MenuItem>
                        <MenuItem value={1} style={{fontFamily: "Microsoft JhengHei",fontSize:16,
                        color:'white'}}>國一</MenuItem>
                        <MenuItem value={2} style={{fontFamily: "Microsoft JhengHei",fontSize:16,
                        color:'white'}}>國二</MenuItem>
                        <MenuItem value={3} style={{fontFamily: "Microsoft JhengHei",fontSize:16,
                        color:'white'}}>國三</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={ref => {this.InputLabelRef = ref;}}
                        htmlFor="outlined-age-simple"
                        style={{ontFamily: "Microsoft JhengHei",fontSize:16,color:'white',}}>
                        科目</InputLabel>
                    <Select value={this.state.subject} onChange={this.handleChange}
                        input={<OutlinedInput labelWidth={this.state.labelWidth} name="subject"
                        id="outlined-asubject-simple"
                        style={{ontFamily: "Microsoft JhengHei",fontSize:16,color:'white'}}/>}>
                        
                        <MenuItem value="" style={{fontFamily: "Microsoft JhengHei",fontSize:16,color:'white'}}>
                        科目</MenuItem>
                        <MenuItem value={10} style={{fontFamily: "Microsoft JhengHei",fontSize:16,
                        color:'white'}}>國文</MenuItem>
                        <MenuItem value={11} style={{fontFamily: "Microsoft JhengHei",fontSize:16,
                        color:'white'}}>數學</MenuItem>
                        <MenuItem value={12} style={{fontFamily: "Microsoft JhengHei",fontSize:16,
                        color:'white'}}>英文</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={ref => {this.InputLabelRef = ref;}}
                        htmlFor="outlined-age-simple"
                        style={{ontFamily: "Microsoft JhengHei",fontSize:16,color:'white',}}>
                        老師</InputLabel>
                    <Select value={this.state.teacher} onChange={this.handleChange}
                        input={<OutlinedInput labelWidth={this.state.labelWidth} name="teacher"
                        id="outlined-asubject-simple"
                        style={{ontFamily: "Microsoft JhengHei",fontSize:16,color:'white'}}/>}>
                        
                        <MenuItem value="" style={{fontFamily: "Microsoft JhengHei",fontSize:16,color:'white'}}>
                        老師</MenuItem>
                        <MenuItem value={21} style={{fontFamily: "Microsoft JhengHei",fontSize:16,
                        color:'white'}}>蔡明志</MenuItem>
                        <MenuItem value={22} style={{fontFamily: "Microsoft JhengHei",fontSize:16,
                        color:'white'}}>胡俊之</MenuItem>
                        <MenuItem value={23} style={{fontFamily: "Microsoft JhengHei",fontSize:16,
                        color:'white'}}>吳濟聰</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={ref => {this.InputLabelRef = ref;}}
                        htmlFor="outlined-age-simple"
                        style={{ontFamily: "Microsoft JhengHei",fontSize:16,color:'white',}}>
                        班級</InputLabel>
                    <Select value={this.state.myclass} onChange={this.handleChange}
                        input={<OutlinedInput labelWidth={this.state.labelWidth} name="myclass"
                        id="outlined-asubject-simple"
                        style={{ontFamily: "Microsoft JhengHei",fontSize:16,color:'white'}}/>}>
                        
                        <MenuItem value="" style={{fontFamily: "Microsoft JhengHei",fontSize:16,color:'white'}}>
                        班級</MenuItem>
                        <MenuItem value={31} style={{fontFamily: "Microsoft JhengHei",fontSize:16,
                        color:'white'}}>A班</MenuItem>
                        <MenuItem value={32} style={{fontFamily: "Microsoft JhengHei",fontSize:16,
                        color:'white'}}>B班</MenuItem>
                        <MenuItem value={33} style={{fontFamily: "Microsoft JhengHei",fontSize:16,
                        color:'white'}}>C班</MenuItem>
                    </Select>
                </FormControl>

                <Button type="org" style={{marginTop:20,marginLeft:25}}>搜尋</Button>
            </form>
        );
    }
}

SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);
