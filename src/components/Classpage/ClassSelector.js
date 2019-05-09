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
import Airtable from 'airtable';

const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');

let counter = 0;
function createData(subject, class_id) {
    counter += 1;
    return { id: counter, subject, class_id};
}

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
        classData: [],

        data: [],
        dataInit: [],
    };

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
        base('ClassDay').select({ view: 'Grid view' })
            .eachPage(
                (records, fetchNextPage) => {
                    this.setState({ records });
                    
                    const subject_name = this.state.records.map((record, index) => record.fields['subject_name']);
                    const class_id = this.state.records.map((record, index) => record.fields['class_id']);


                    //select sunject
                    var temp = [];
                    var temp2 = [];
                    var tempClassId = [];
                    for (var index = 0; index < subject_name.length; index++) {
                        temp.push(subject_name[index]);
                    }

                    var classResult = temp.filter(function (element, index, arr) {
                        return arr.indexOf(element) === index;
                    });

                    for (index = 0; index < classResult.length; index++) {
                        temp2.push(classResult[index]);
                    }

                    this.setState({ classData: temp2 });

                    //table
                    for (var index = 0; index < class_id.length; index++) {
                        tempClassId.push(createData(subject_name[index], class_id[index]));
                    }
                    this.setState({ data: tempClassId });
                    this.setState({ dataInit: tempClassId });

                    fetchNextPage();
                }
            );

    }

    handleChange  = name => event => {
        //this.setState({ [event.target.name]: event.target.value });
        this.setState({ [name]: event.target.value });
        // let temp = [];
        // var count = this.state.dataInit.length;
        // for (var index = 0; index < count; index++) {
        //     if (this.state.dataInit[index].subject === event.target.value) {
        //         temp.push(this.state.dataInit[index]);
        //     }
        // }
        // this.setState({ data: temp });
        // if (event.target.value === "1") {
        //     this.setState({ data: this.state.dataInit });
        // }
    };

    handleSubjectChange  = name => event => {
        //this.setState({ [event.target.name]: event.target.value });
        this.setState({ [name]: event.target.value });
        let temp = [];
        var count = this.state.dataInit.length;
        for (var index = 0; index < count; index++) {
            if (this.state.dataInit[index].subject === event.target.value) {
                temp.push(this.state.dataInit[index]);
            }
        }
        this.setState({ data: temp });
        if (event.target.value === "1") {
            this.setState({ data: this.state.dataInit });
        }
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
                        //onChange={this.handleChange}
                        onChange={this.handleChange('grade')}
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
                        //onChange={this.handleChange}
                        onChange={this.handleSubjectChange('subject')}
                        input={
                            <OutlinedInput
                                labelWidth={this.state.labelWidth}
                                name="subject"
                                id="outlined-asubject-simple"
                            />
                        }
                    >
                        <MenuItem value="1">
                            <em>科目</em>
                        </MenuItem>
                        {(this.state.classData).map((n, index) => {
                                return (
                                    <MenuItem key={n.id}value={n}>{n}</MenuItem>
                                );
                            })}
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
                        //onChange={this.handleChange}
                        onChange={this.handleChange('myclass')}
                        input={
                            <OutlinedInput
                                labelWidth={this.state.labelWidth}
                                name="myclass"
                                id="outlined-asubject-simple"
                            />
                        }
                    >
                        <MenuItem value="">
                            <em>班別</em>
                        </MenuItem>
                        {(this.state.data).map((n, index) => {
                                return (
                                    <MenuItem key={n.id} value={n.class_id}>{n.class_id}</MenuItem>
                                );
                            })}
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
