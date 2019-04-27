import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
    root:{
        display:'flex',
        flexDirection:'row',
    },
    title: {
        fontSize: '16pt',
    },
    label: {
        fontSize: '14pt',
    },
});

class AreaPick extends React.Component {
    state = {
        value: '',
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    render() {
        const { classes } = this.props;
        return (
            <div >
                <FormControl className={classes.root} component="fieldset">
                    <FormLabel className={classes.title} component="legend">校區選擇：</FormLabel>
                    <RadioGroup
                        aria-label="area"
                        name="area"
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel classes={{label: classes.label,}} value="台北校區" control={<Radio />} label="台北校區" />
                        <FormControlLabel classes={{label: classes.label,}} value="古亭校區" control={<Radio />} label="古亭校區" />
                        <FormControlLabel classes={{label: classes.label,}} value="信義校區" control={<Radio />} label="信義校區" />
                        <FormControlLabel classes={{label: classes.label,}} value="高雄校區" control={<Radio />} label="高雄校區" />
                        <FormControlLabel classes={{label: classes.label,}} value="南港校區" control={<Radio />} label="南港校區" />
                        <FormControlLabel classes={{label: classes.label,}} value="中山校區" control={<Radio />} label="中山校區" />
                        <FormControlLabel classes={{label: classes.label,}} value="士林校區" control={<Radio />} label="士林校區" />
                        <FormControlLabel classes={{label: classes.label,}} value="新莊校區" control={<Radio />} label="新莊校區" />
                        <FormControlLabel classes={{label: classes.label,}} value="板橋校區" control={<Radio />} label="板橋校區" />
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

AreaPick.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AreaPick);
