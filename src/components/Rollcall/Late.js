import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
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
        minWidth: 800,
    },
    download:{
        width:'80%',
        height:'40px',
        margin:'auto',
    },
    btn:{
        backgroundColor:'#111B24',
        color:'white',
        border:'solid 1px #FFBF5F',
        borderRadius:'10%',
        float:'right',
        marginTop: theme.spacing.unit,
    }
});

//let id = 0;
function createData(name, id, phone, parent) {
    //id += 1;
    return { name, id, phone, parent};
}

class LateTable extends React.Component {
    state={
        absent:[],
        rows:[]
    }
    componentDidMount(){
        var temp=[];
        for(var i = 0; i < this.props.location.aboutProps.name.length; i++ ){
            temp.push(createData(this.props.location.aboutProps.name[i].name, this.props.location.aboutProps.name[i].id,
                this.props.location.aboutProps.name[i].phone, this.props.location.aboutProps.name[i].parent));
        }
        this.setState({rows : temp});
    }
    render() {
        //console.log(this.props.location.aboutProps.name);
        const { classes } = this.props;
        const { rows } = this.state;

        return (
            <div>
                <AppBar />
                <div className={classes.download}>
                <ExcelFile element={<button className={classes.btn}>匯出遲到名單</button>} >
                    <ExcelSheet data={rows} name="Employees"  >
                        <ExcelColumn label="Name" value="name" />
                        <ExcelColumn label="id" value="id" />
                        <ExcelColumn label="phone" value="phone" />
                        <ExcelColumn label="parent phone" value="parent" />
                    </ExcelSheet>
                </ExcelFile>
                </div>
                <div>
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
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="center">{row.phone}</TableCell>
                                    <TableCell align="center">{row.parent}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                </div>
            </div>
        );
    }
}

LateTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LateTable);