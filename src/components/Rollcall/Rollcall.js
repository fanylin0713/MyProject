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
    nowClass: '',
    name: 's'
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar />
        <div>
          <FormControl className={classes.root} component="fieldset">
            <RadioGroup
              aria-label="area"
              name="area"
              className={classes.group}
              value={this.state.value}
              onChange={this.handleChange}
            >
              <FormControlLabel classes={{ label: classes.label, }} value="國中" control={<Radio />} label="國中" />
              <FormControlLabel classes={{ label: classes.label, }} value="高中" control={<Radio />} label="高中" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    )
  }

}

export default withStyles(styles)(Rollcall);