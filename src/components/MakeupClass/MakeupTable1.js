import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        backgroundColor:'#212832',
        border:'white 1px solid',
    },
    head:{
        fontSize:'14pt',
        color:'#FFBF5F',
    }
});

let id = 0;
function createData(student, number, project) {
    id += 1;
    return { id, student, number, project};
}

const rows = [
    createData('王小明', 405401360 , '國文A班 02/13'),
    createData('孫小美', 405401360 , '國文A班 02/13'),
    createData('王小明', 405401360 , '國文A班 02/13'),
    createData('孫小美', 405401360 , '國文A班 02/13'),
    createData('王小明', 405401360 , '國文A班 02/13'),
];

function SimpleTable(props) {
    const { classes } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.head}>姓名</TableCell>
                        <TableCell className={classes.head} align="center">學號</TableCell>
                        <TableCell className={classes.head} align="center">補課項目</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.student}
                            </TableCell>
                            <TableCell align="center">{row.number}</TableCell>
                            <TableCell align="center">{row.project}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);