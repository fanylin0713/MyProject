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

const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');

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

function createData(time, title, body) {
    id += 1;
    //time = time.split("-")[0] + "/" + time.split("-")[1] + "/" + time.split("-")[2];
    time = time.split("T")[0];
    return { id, time, title, body};
}

// const rows = [
//     createData('2019/02/27', '颱風天停課！'),
//     createData('2019/03/02', '國文Ａ班改到302教室'),
//     createData('2019/03/04', 'XXXXXXXXXXXXX'),
//     createData('2019/03/09', 'XXXXXXXXXX'),
//     createData('2019/04/01', 'XXXXXXXXXXXXXXXXXXXXXXXXX'),
// ];
class SimpleTable extends React.Component {
    state = {
        rows :[],
    }
    componentDidMount() { 
        base('Announcement').select({view: 'Grid view'})
        .eachPage(
          (records, fetchNextPage) => {
            this.setState({records});
            console.log(records);
            const announce_date = this.state.records.map((record, index) => record.fields['announce_date']);
            const announce_title = this.state.records.map((record, index) => record.fields['announce_title']);
            const announce_body = this.state.records.map((record, index) => record.fields['announce_body']);
    
            var count = announce_title.length;
            var temp=[];


            for(var index = 0; index < count; index++) {
              temp.push(createData(announce_date[index],announce_title[index], announce_body[index]));
              
            }
            this.setState({ rows : temp });
    
            fetchNextPage();
          }
        );
    
    }
    render(){
        const { classes } = this.props;
        const { rows } = this.state;


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
                                <TableCell className={classes.content} style={{width:'20%'}} component="th" scope="row">{row.time}</TableCell>
                                <TableCell className={classes.content}>{row.title}</TableCell>
                                <TableCell className={classes.content}>{row.body}</TableCell>
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
//                 <TableHead >
//                     <TableRow>
//                         <TableCell className={classes.head}>發佈日期</TableCell>
//                         <TableCell className={classes.head} >標題</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {rows.map(row => (
//                         <TableRow key={row.id}>
//                             <TableCell className={classes.content} style={{width:'15%'}} component="th" scope="row">{row.time}</TableCell>
//                             <TableCell className={classes.content}>{row.title}</TableCell>
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