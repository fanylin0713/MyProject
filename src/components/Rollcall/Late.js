import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AppBar from '../AppBar/Appbar';

//excel
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const styles = theme => ({
    root: {
        width: '80%',
        minWidth: '900px',
        margin: '0 auto',
        marginTop: theme.spacing.unit,
        backgroundColor: '#212832',
        border: 'white 1px solid',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class LateTable extends React.Component {
    state={
        absent:[]
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar />
                <ExcelFile>
                    <ExcelSheet data={this.state.absent} name="Employees">
                        <ExcelColumn label="Name" value="name" />
                        <ExcelColumn label="id" value="id" />
                        <ExcelColumn label="phone" value="phone" />
                        <ExcelColumn label="parent phone" value="parent" />
                    </ExcelSheet>
                </ExcelFile>

                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>學生姓名</TableCell>
                                <TableCell align="center">學號</TableCell>
                                <TableCell align="center">學生電話</TableCell>
                                <TableCell align="center">學生家長電話</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">{row.calories}</TableCell>
                                    <TableCell align="center">{row.fat}</TableCell>
                                    <TableCell align="center">{row.carbs}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

LateTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LateTable);