import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../AppBar/Appbar'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    fontSize: '14pt',
  },
});

class Rollcall extends React.Component {

  state = {
    value: '',
    class: '',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
};

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar />
        <div>
          <FormControl className={classes.root} component="fieldset">
            <RadioGroup
              aria-label="year"
              name="year"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <FormControlLabel classes={{ label: classes.label, }} value="國中" control={<Radio />} label="國中" />
              <FormControlLabel classes={{ label: classes.label, }} value="高中" control={<Radio />} label="高中" />
            </RadioGroup>
          </FormControl>
          {/* <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-nowClass-native-simple"
            >
              Class
          </InputLabel>
            <Select
              native
              value={this.state.nowClass}
              onChange={this.handleChange('nowClass')}
              input={
                <OutlinedInput
                  name="nowClass"
                  labelWidth={this.state.labelWidth}
                  id="outlined-nowClass-native-simple"
                />
              }
            >
              <option value="" />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </Select>
          </FormControl> */}
        </div>
      </div>
    )
  }

}

export default withStyles(styles)(Rollcall);