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
        marginTop: theme.spacing.unit,
        backgroundColor:'#212832',
        border:'white 1px solid',
        overflowX: 'auto',
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
function createData(time, title, content) {
    id += 1;
    return { id, time, title, content};
}

const rows = [
    createData('2019/02/27', '颱風天停課！','1234567890'),
    createData('2019/03/02', '國文Ａ班改到302教室','1234我今天早餐沒有吃午餐吃了麥當勞各位同學要不要來上課呀，我一一一一我我我我，我一愛案的底儂母會去567890'),
    createData('2019/03/04', 'XXXXXX','1234567890'),
    createData('2019/03/09', 'XXXXXXXXXX','1234567890'),
    createData('2019/04/01', 'XXXXXXXXXX','1234567890'),
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
                        <TableCell className={classes.head} >內容</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell className={classes.content} style={{width:'15%'}} component="th" scope="row">{row.time}</TableCell>
                            <TableCell className={classes.content} style={{width:'20%'}}>{row.title}</TableCell>
                            <TableCell className={classes.content}>{row.content}</TableCell>
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