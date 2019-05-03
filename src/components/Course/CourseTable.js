import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
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

import Airtable from 'airtable';

const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const tableClass = base('ClassDay');
const tableTeacher = base('Teacher');
const tableClassRoom = base('ClassRoom');

let counter = 0;
function createData(course, teacher, classroom, day, time, area) {
    counter += 1;
    return { id: counter, course, teacher, classroom, day, time, area };
}

const rows = [
    {
        id: "course",
        numeric: false,
        disablePadding: true,
        label: "課程名稱"
    },
    { id: "teacher", numeric: true, disablePadding: false, label: "授課老師" },
    { id: "classroom", numeric: true, disablePadding: false, label: "教室" },
    { id: "day", numeric: true, disablePadding: false, label: "星期" },
    { id: "time", numeric: true, disablePadding: false, label: "時間" }
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

let EnhancedTableToolbar = props => {
    const { numSelected, classes } = props;

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
                            已選擇 {numSelected} 堂課程
                    </Typography>)
                    : (
                        <Typography style={{ color: '#111B24' }} variant="h6" id="tableTitle">
                            課程列表
                    </Typography>
                    )
                }
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="刪除">
                        <IconButton aria-label="刪除">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                        <div></div>
                    )}
            </div>
        </Toolbar>
    );
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
});

class EnhancedTable extends React.Component {

    state = {
        selected: [],
        data: [],
        dataInit: [],
        listNameFromParent: '',
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.listNameFromParent !== this.state.listNameFromParent) {
            var count = this.state.dataInit.length;
            var temp = [];
            for (var index = 0; index < count; index++) {
                if (nextProps.listNameFromParent === this.state.dataInit[index].area) {
                    temp.push(this.state.dataInit[index]);
                    this.setState({ data: temp });
                }
            }
            this.setState({ listNameFromParent: nextProps.listNameFromParent });
        }
    }

    componentDidMount() {

        //classDay table
        tableClass.select({
            view: "Grid view",
            //maxRecords: 1
        }).eachPage((records, fetchNextPage) => {
            this.setState({ records });
            const classroom_id_link = this.state.records.map((record, index) => record.fields['classroom_id_link']);
            const class_id = this.state.records.map((record, index) => record.fields['class_id']);
            const class_day = this.state.records.map((record, index) => record.fields['class_day']);
            const class_start_time = this.state.records.map((record, index) => record.fields['class_start_time']);
            const classroom_id = this.state.records.map((record, index) => record.fields['classroom_id']);
            const teacher_id = this.state.records.map((record, index) => record.fields['teacher_id']);

            //const class_end_time = this.state.records.map((record, index) => record.fields['class_end_time']);


            var temp = [];
            // var temp2 = [];
            var count = teacher_id.length;
            for (var index = 0; index < count; index++) {
                const record_id = teacher_id[index];
                const record_id_room = classroom_id_link[index];
                const class_idR = class_id[index];
                const class_dayR = class_day[index];
                const class_start_timeR = class_start_time[index];
                const classroom_idR = classroom_id[index];
                //const class_end_timeR = class_end_time[index];

                //teacher Name
                tableTeacher.find(record_id, (err, record) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    const teacher_name = record.fields['teacher_name'];
                    //temp.push(createData(class_idR, teacher_name, classroom_idR, class_dayR, class_start_timeR));

                    tableClassRoom.find(record_id_room, (err, record) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                        const class_area = record.fields['class_area'];
                        temp.push(createData(class_idR, teacher_name, classroom_idR, class_dayR, class_start_timeR, class_area));

                        //   if(classroom_area == this.props.listNameFromParent){
                        //     console.log("same!");
                        //     //temp2.push(createData(class_idR, teacher_name, classroom_idR, class_dayR, class_start_timeR));
                        //   }
                        //temp.push(createData(class_idR, teacher_name, classroom_idR, class_dayR, class_start_timeR));

                    })

                })



            }
            console.log(temp);
            this.setState({ data: temp });
            this.setState({ dataInit: temp });
            //this.setState({ data : temp2 });


            console.log(this.props.listNameFromParent);
            fetchNextPage();
        }
        );
    }

    handleSelectAllClick = event => {
        //console.log(this.props.listNameFromParent);
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        this.setState({ selected: newSelected });
    };
    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes } = this.props;
        const { data, selected } = this.state;

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} />
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
                                            onClick={event => this.handleClick(event, n.id)}
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            selected={isSelected}
                                        >
                                            <Checkbox checked={isSelected} />
                                        </TableCell>
                                        <TableCell className={classes.content} component="th" scope="row" padding="none">
                                            {n.course}
                                        </TableCell>
                                        <TableCell className={classes.content} align="center">{n.teacher}</TableCell>
                                        <TableCell className={classes.content} align="center">{n.classroom}</TableCell>
                                        <TableCell className={classes.content} align="center">{n.day}</TableCell>
                                        <TableCell className={classes.content} align="center">{n.time}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);
