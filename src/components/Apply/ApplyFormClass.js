import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const tableClass = base('ClassDay');

// function createData(id, class_name) {
//     return { id, class_name };
// }

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        marginLeft: '14%',
        minWidth: 120,
        maxWidth: 300,
    },
    noLabel: {
        marginTop: theme.spacing.unit * 3,
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

// const names = [
//     '國文A班',
//     '英文A班',
//     '英文B班',
//     '數學A班',
//     '數學B班',
//     '數學C班',
//     '寫作A班',
//     '理化A班',
//     '社會A班',
//     '社會B班',
// ];

class MultipleSelect extends React.Component {
    state = {
        name: [],
        names:[],
    };

    componentDidMount() {
        //classDay table
        tableClass.select({
            view: "Grid view",
        }).eachPage((records, fetchNextPage) => {
            this.setState({ records });
            const class_id = this.state.records.map((record, index) => record.fields['class_id']);
            const record_id = this.state.records.map((record, index) => record.id.id);

            var temp = [];
            for (var index = 0; index < class_id.length; index++) {
                //temp.push(createData(record_id[index],class_id[index]));
                temp.push(class_id[index]);
            }
            this.setState({ names: temp });
            fetchNextPage();
        }
        );
    }

    handleChange = event => {
        this.setState({ name: event.target.value });
        //add
        // console.log(event.target);
        // console.log(event.target.value[0].class_name);
        this.props.callbackFromParent(event.target.value);
        //this.setState({ name: event.target.value }, this.updateApplyForm);
    };
    


    handleChangeMultiple = event => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({
            name: value,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="select-multiple-checkbox">班別</InputLabel>
                    <Select
                        multiple
                        value={this.state.name}
                        onChange={this.handleChange}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {this.state.names.map(name => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={this.state.name.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        );
    }
}

MultipleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);
