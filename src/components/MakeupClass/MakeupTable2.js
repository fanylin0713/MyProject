import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Airtable from 'airtable';
const TABLE_NAME = 'ReserveStudent';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);
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

// const rows = [
//     createData('王小明', 405401360 , '國文A班 02/13'),
//     createData('孫小美', 405401360 , '國文A班 02/13'),
//     createData('王小明', 405401360 , '國文A班 02/13'),
//     createData('孫小美', 405401360 , '國文A班 02/13'),
//     createData('王小明', 405401360 , '國文A班 02/13'),
// ];
class SimpleTable extends React.Component {
    state={
        rows:[],
    }
        //airtable
    componentDidMount() {
        table.select({
            filterByFormula:'AND(reserve_time="13:30",todaytaipei="1")',
            view: "Grid view",
        }).eachPage((records, fetchNextPage) => {
            this.setState({ records });

            const student_id = this.state.records.map((record, index) => record.fields['student_id']);
            const reserve_date = this.state.records.map((record, index) => record.fields['reserve_date']);
            const reserve_address = this.state.records.map((record, index) => record.fields['reserve_address']);
            //const reserve_time = this.state.records.map((record, index) => record.fields['reserve_time']);
            const reserve_class = this.state.records.map((record, index) => record.fields['reserve_class']);
            
            var temp=[];
            for(var index = 0; index < student_id.length; index++) {
                temp.push(createData(student_id[index],reserve_class[index],reserve_date[index]));
            }

            this.setState({rows : temp});
            fetchNextPage();
        }
        );
    }
    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>學號</TableCell>
                            <TableCell className={classes.head} align="center">補課項目</TableCell>
                            <TableCell className={classes.head} align="center">補課日期</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rows.map(row => (
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
}
// function SimpleTable(props) {
//     const { classes } = props;

//     return (
//         <Paper className={classes.root}>
//             <Table className={classes.table}>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell className={classes.head}>姓名</TableCell>
//                         <TableCell className={classes.head} align="center">學號</TableCell>
//                         <TableCell className={classes.head} align="center">補課項目</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {rows.map(row => (
//                         <TableRow key={row.id}>
//                             <TableCell component="th" scope="row">
//                                 {row.student}
//                             </TableCell>
//                             <TableCell align="center">{row.number}</TableCell>
//                             <TableCell align="center">{row.project}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </Paper>
//     );
// }

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);