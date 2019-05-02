import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Upload from '@material-ui/icons/CreateNewFolderRounded';
import { withStyles } from '@material-ui/core/styles';
import { fromJS, List, Map } from 'immutable'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import XLSX from 'xlsx';

const styles = theme => ({
    button: {
        backgroundColor: '#111B24',
        color: 'white',
    },
    UploadIcon: {
        margin: '0 auto',
    },
    input: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        outline: 'none',
        opacity: 0,
    },
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
    },
    content: {
        fontSize: '14pt',
    },
    editButton:{
        border:'#FFBF5F 1px solid',
        float:'right',
        marginLeft: theme.spacing.unit * 2,
    }
});

let id = 0;
function createData(date, origin, real) {
    id += 1;
    return { id, date, origin, real };
}

class Progresspage extends Component {
    state = {
        rows: [],
    }

    onImportExcel = file => {
        const { files } = file.target;
        const fileReader = new FileReader();
        fileReader.onload = event => {
            try {
                const { result } = event.target;
                const workbook = XLSX.read(result, { type: 'binary' });
                let data = [];
                for (const sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                        // break;
                    }
                }
                this.setState({ data });
                const progress_date = this.state.data.map((data, index) => data['progress_date']);
                const progress_origin = this.state.data.map((data, index) => data['progress_origin']);
                const progress_real = this.state.data.map((data, index) => data['progress_real']);
                for (var index = 0; index < id; index++) {
                    data.push(createData(progress_date[index], progress_origin[index], progress_real[index]));

                }

                this.setState({ rows: data });
                console.log(data);
                console.log(data[0]);
                console.log(data[0].date);
                console.log(data[0].origin);
            } catch (e) {
                // message.error('文件類型不正确！');
            }
        };
        fileReader.readAsBinaryString(files[0]);
    }
    render() {

        const { classes } = this.props;
        const { rows } = this.state;

        return (
            <div style={{ borderColor: '#FFBF5F' }}>
                <Button className={classes.button}>
                    <Upload type='upload' />
                    <input className={classes.input} type='file' accept='.xlsx, .xls' onChange={this.onImportExcel} />
                    <span>匯入教學進度</span>
                </Button>
                <Button className={classes.editButton}>
                    儲存
                </Button>
                <Button className={classes.editButton}>
                    編輯
                </Button>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead >
                            <TableRow>
                                <TableCell className={classes.head}>日期</TableCell>
                                <TableCell className={classes.head} >預先排定進度</TableCell>
                                <TableCell className={classes.head} >實際教授進度</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell className={classes.content} style={{ width: '20%' }} component="th" scope="row">{row.date}</TableCell>
                                    <TableCell className={classes.content}>{row.origin}</TableCell>
                                    <TableCell className={classes.content}>{row.real}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>

            </div>
        );
    }
}

export default withStyles(styles)(Progresspage);


{/* {
                    data.length ?
                        <ul>
                            {data.map((el, index) => (
                                <li key={index}>{el.name}</li>
                            ))}
                        </ul> :
                        <div>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" component="span" className={classes.button}>
                                    <Upload className={classes.UploadIcon} />
                                    匯入學生資料
                        </Button>
                            </label>
                        </div>
                } */}