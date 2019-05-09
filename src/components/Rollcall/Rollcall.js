import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../AppBar/Appbar';
import {FormControlLabel, 
        Radio, 
        RadioGroup, 
        FormControl, 
        InputLabel, 
        MenuItem, 
        Select, 
        OutlinedInput,
        Typography} from '@material-ui/core';
import { Button } from '@material-ui/core';

import Rabbit from './rabbit.jpg';

const styles = theme => ({
  selectBar: {
    width: '80%',
    margin: 'auto',
    marginTop: theme.spacing.unit * 5,
    border: '#FFBF5F solid 0.8px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'row',
    minWidth:'900px',
  },
  radio: {
    marginLeft: '20%',
  },
  formControl: {
    margin:'auto 0',
    marginLeft: '13%',
  },
  label: {
    fontSize: '14pt',
  },
  select: {
    width: '180px'
  },
  button: {
    fontSize: '16pt',
    height: '50px',
    border: '#FFBF5F solid 0.8px',
    borderRadius: '10px',
    margin: 'auto 0',
    marginLeft:'15%',
  },

  info: {
    width: '80%',
    minWidth:'900px',
    margin: 'auto',
  },

  photo: {
    width: '200px',
    height: '200px',
    marginLeft: '40%',
    marginTop: theme.spacing.unit * 10,
  },

  studentInfo:{
    fontSize:'16pt',
    marginLeft: '35%',
    marginTop: theme.spacing.unit * 5,
  },
});

class Rollcall extends React.Component {

  state = {
    value: '',
    nowClass: '',
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleClick = e => {

  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar />
        <div className={classes.selectBar}>
          <FormControl className={classes.radio} component="fieldset">
            <RadioGroup
              aria-label="area"
              name="area"
              className={classes.group}
              value={this.state.value}
              onChange={this.handleChange('value')}
            >
              <FormControlLabel classes={{ label: classes.label, }} value="國中" control={<Radio />} label="國中" />
              <FormControlLabel classes={{ label: classes.label, }} value="高中" control={<Radio />} label="高中" />
            </RadioGroup>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-nowClass-simple"
            >
              班級
                    </InputLabel>
            <Select
              value={this.state.nowClass}
              onChange={this.handleChange('nowClass')}
              className={classes.select}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  name="nowClass"
                  id="outlined-nowClass-simple"
                />
              }
            >
              <MenuItem value="">
                <em>班級</em>
              </MenuItem>
              <MenuItem value={10}>英文Ａ班</MenuItem>
              <MenuItem value={20}>數學Ａ班</MenuItem>
              <MenuItem value={30}>國文Ｂ班</MenuItem>
            </Select>
          </FormControl>
          <Button className={classes.button} onClick={this.handleClick}>開始點名</Button>
        </div>
        <div className={classes.info}>
          <img className={classes.photo} src={Rabbit} alt="location" />
          <pre><Typography  className={classes.studentInfo}>姓名：林奕蓓     學號：405401360</Typography></pre>
        </div>
      </div>
    )
  }

}

export default withStyles(styles)(Rollcall);