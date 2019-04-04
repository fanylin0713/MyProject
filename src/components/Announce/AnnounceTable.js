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
        width: '80%',
        margin:'0 auto',
        marginTop: theme.spacing.unit * 3,
        backgroundColor:'#212832',
        border:'white 1px solid',
    },
    // table: {
    //     minWidth: 700,
    // },
    head:{
        fontSize:'16pt',
        backgroundColor:'#FFBF5F',
        color:'#111B24',
    },
    content:{
        fontSize:'14pt',
    },
});

let id = 0;
function createData(time, title) {
    id += 1;
    return { id, time, title};
}

const rows = [
    createData('2019/02/27', '颱風天停課！'),
    createData('2019/03/02', '國文Ａ班改到302教室'),
    createData('2019/03/04', 'XXXXXXXXXXXXX'),
    createData('2019/03/09', 'XXXXXXXXXX'),
    createData('2019/04/01', 'XXXXXXXXXXXXXXXXXXXXXXXXX'),
];

function SimpleTable(props) {
    const { classes } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead >
                    <TableRow>
                        <TableCell className={classes.head}>發佈日期</TableCell>
                        <TableCell className={classes.head} >標題</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell className={classes.content} style={{width:'15%'}} component="th" scope="row">{row.time}</TableCell>
                            <TableCell className={classes.content}>{row.title}</TableCell>
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