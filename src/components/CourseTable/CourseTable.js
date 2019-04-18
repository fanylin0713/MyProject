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

let counter = 0;
function createData(course, teacher, classroom, day, time) {
    counter += 1;
    return { id: counter, course, teacher, classroom, day, time };
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
                            {numSelected} 已選擇
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
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
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
        data: [
            createData("數學A班", '蔡明志', 'BS336', '星期一','10:00'),
            createData("英文A班", '蔡明志', 'BS336', '星期一','12:00'),
            createData("國文A班", '蔡明志', 'BS336', '星期二','10:00'),
            createData("英文B班", '蔡明志', 'BS336', '星期二','14:00'),
            createData("英文C班", '蔡明志', 'BS336', '星期三','12:00'),
            createData("數學S班", '蔡明志', 'BS336', '星期四','18:00'),
            createData("國文B班", '蔡明志', 'BS336', '星期六','10:00')
        ]
    };

    handleSelectAllClick = event => {
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
