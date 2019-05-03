import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TeacherDialog from './TeacherDialog';

import classNames from "classnames";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import { fetchDeleteTeacher } from '../../api';

import Airtable from 'airtable';

const TABLE_NAME = 'Teacher';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);

let counter = 0;
function createData(name, phone, email, subject, record_id) {
    counter += 1;
    return { id: counter, name, phone, email, subject, record_id};
}
const rows = [
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "姓名"
    },
    { id: "phone", numeric: true, disablePadding: false, label: "電話" },
    { id: "email", numeric: true, disablePadding: false, label: "電子信箱" },
    { id: "subject", numeric: true, disablePadding: false, label: "科目" }
];

class EnhancedTableHead extends React.Component {
    render() {
        const {
            onSelectAllClick,
            numSelected,
            rowCount
        } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(
                        row => (
                            <TableCell style={{ fontSize: '16pt' }}
                                key={row.id}
                                align={row.numeric ? "center" : "left"}
                                padding={row.disablePadding ? "none" : "default"}
                            >
                                {row.label}
                            </TableCell>
                        ),
                        this
                    )}
                </TableRow>
            </TableHead>
        );
    }
}




EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
        backgroundColor: '#FFBF5F',
    },
    highlight:
        theme.palette.type === "main"
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.primary.main, 0.85)
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark
            },
    spacer: {
        flex: "1 1 100%"
    },
    title: {
        flex: "0 0 auto",
    }
});

class EnhancedTableToolbar extends React.Component {

    handleDelete = e => {
        for(var index = 0; index < this.props.toDelete.length; index++){
            fetchDeleteTeacher(this.props.toDelete[index]);
        }
    }
    render(){
        const { numSelected, classes } = this.props;
        //console.log(this.props.toDelete);

        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected > 0
                })}
            >
                <div className={classes.title}>
                    {numSelected > 0
                        ? (
                            <Typography color="inherit" variant="subtitle1">
                                已選擇 {numSelected} 位老師
                        </Typography>)
                        : (
                            <Typography style={{ color: '#111B24' }} variant="h6" id="tableTitle">
                                老師名單
                        </Typography>
                        )
                    }
                </div>
                <div className={classes.spacer} />
                <div className={classes.actions}>
                    {numSelected > 0 ? (
                        <Tooltip title="Delete">
                        <   IconButton onClick={this.handleDelete} aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <div></div>
                        )}
                </div>
            </Toolbar>
        );
    }
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '80%',
        margin: '0 auto',
        marginTop: theme.spacing.unit,
        backgroundColor: '#212832',
        border: 'white 1px solid',
        overflowX: 'auto',
    },
    table: {
        minWidth: 800
    },
    tableWrapper: {
        overflowX: "auto"
    },
    content: {
        fontSize: '14pt',
    },

    //Select
    Selectroot: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        marginLeft: '10%',
        marginTop: theme.spacing.unit * 3,
        minWidth: 120,
        width: 150,
    },
    button: {
        margin: 'auto',
        marginTop: theme.spacing.unit * 4,
        marginLeft: theme.spacing.unit * 3,
        borderRadius: '30px',
        height: '40px',
    },
    add: {
        marginTop: theme.spacing.unit * 4,
    },
});

class EnhancedTable extends React.Component {
    state = {
        selected: [],
        data: [],
        dataInit: [],
        //select
        subject: '',
        age: '',
        labelWidth: 0,
        classData: [],
        deleted: [],
    };

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
        base('Teacher').select({ view: 'Grid view' })
            .eachPage(
                (records, fetchNextPage) => {
                    this.setState({ records });
                    console.log(records);
                    const teacher_name = this.state.records.map((record, index) => record.fields['teacher_name']);
                    const teacher_email = this.state.records.map((record, index) => record.fields['teacher_email']);
                    const teacher_phone = this.state.records.map((record, index) => record.fields['teacher_phone']);
                    const subject_name = this.state.records.map((record, index) => record.fields['subject_name']);
                    const record_id = this.state.records.map((record, index) => record.id);

                    var count = teacher_name.length;
                    var tempT = [];

                    //select
                    var temp = [];
                    var temp2 = [];
                    for (var index = 0; index < count; index++) {
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
<<<<<<< HEAD
                    for (var index = 0; index < count; index++) {
                        tempT.push(createData(teacher_name[index], teacher_phone[index], teacher_email[index], subject_name[index], record_id[index]));
=======
                    for (index = 0; index < count; index++) {
                        tempT.push(createData(teacher_name[index], teacher_phone[index], teacher_email[index], subject_name[index]));
>>>>>>> 714b9720333d5bf2168026f2a5380c35ea8415a4

                    }
                    this.setState({ data: tempT });
                    this.setState({ dataInit: tempT });

                    fetchNextPage();
                }
            );

    }
    //select
    handleChange = name => event => {
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

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    
    handleClick = (event, id, record_id) => {
        const { selected , deleted } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        let newDeleted = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
            newDeleted = newDeleted.concat(deleted,  record_id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
            newDeleted = newDeleted.concat(deleted.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
            newDeleted = newDeleted.concat(deleted.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1) 
            );
            newDeleted = newDeleted.concat(
                deleted.slice(0, selectedIndex),
                deleted.slice(selectedIndex + 1) 
            );
        }
        this.setState({ deleted: newDeleted });
        this.setState({ selected: newSelected });
    };
    isSelected = id => this.state.selected.indexOf(id) !== -1;


    render() {
        const { classes } = this.props;
        const { data, selected, deleted } = this.state;

        return (
            <div>
                <form className={classes.Selectroot} autoComplete="off">
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
                            value={this.state.age}
                            onChange={this.handleChange('age')}
                            input={
                                <OutlinedInput
                                    name="Age"
                                    labelWidth={this.state.labelWidth}
                                    id="outlined-asubject-simple"
                                />
                            }
                        >
                            <MenuItem value="1">
                                <em>科目</em>
                            </MenuItem>
                            {(this.state.classData).map((n, index) => {
                                return (
                                    <MenuItem value={n}>{n}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <span className={classes.add}><TeacherDialog /></span>
                </form>

                <Paper className={classes.root}>
                    <EnhancedTableToolbar numSelected={selected.length} toDelete={deleted}/>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                numSelected={selected.length}
                                onSelectAllClick={this.handleSelectAllClick}
                                rowCount={data.length}
                            />
                            <TableBody>
                                {data.map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            key={n.id}
                                        >
                                            <TableCell
                                                padding="checkbox"
                                                onClick={event => this.handleClick(event, n.id, n.record_id)}
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                selected={isSelected}
                                            >
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            <TableCell className={classes.content} component="th" scope="row" padding="none">
                                                {n.name}
                                            </TableCell>
                                            <TableCell className={classes.content} align="center">{n.phone}</TableCell>
                                            <TableCell className={classes.content} align="center">{n.email}</TableCell>
                                            <TableCell className={classes.content} align="center">{n.subject}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </Paper>
            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired
};


export default withStyles(styles)(EnhancedTable);
