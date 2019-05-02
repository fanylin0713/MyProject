import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Upload from '@material-ui/icons/CreateNewFolderRounded';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { NavLink } from "react-router-dom";
import { fromJS, List, Map } from 'immutable'
import XLSX from 'xlsx';
import ArrowIcon from '@material-ui/icons/ArrowForwardRounded';

const styles = theme => ({
    root: {
        margin: '0 auto',
        marginTop: theme.spacing.unit,
        backgroundColor: '#212832',
        border: 'white 1px solid',
        overflowX: 'auto',
    },
    head: {
        fontSize: '14pt',
        color: '#FFBF5F',
    },
    content: {
        fontSize: '12pt',
    },
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
});

let id = 0;
function createData(time, title, content) {
    id += 1;
    return { id, time, title, content };
}

const data = [
    createData('405401360', '林ＸＸ', <NavLink style={{ textDecoration: 'none' }} activeClassName="active" to="/student"><Button>更多資訊<ArrowIcon/></Button></NavLink>),
    createData('405401360', '林ＸＸ', <NavLink style={{ textDecoration: 'none' }} activeClassName="active" to="/student"><Button>更多資訊<ArrowIcon/></Button></NavLink>),
    createData('405401360', '林ＸＸ', <NavLink style={{ textDecoration: 'none' }} activeClassName="active" to="/student"><Button>更多資訊<ArrowIcon/></Button></NavLink>),
]

class Studentpage extends Component {
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
                // message.success('上傳成功！')
                console.log(data);
            } catch (e) {
                // message.error('文件類型不正确！');
            }
        };
        fileReader.readAsBinaryString(files[0]);
    }
    render() {
        const { classes } = this.props;
        return (
            <div style={{ borderColor: '#FFBF5F' }}>
                <div>
                    <Button className={classes.button}>
                        <Upload type='upload' />
                        <input className={classes.input} type='file' accept='.xlsx, .xls' onChange={this.onImportExcel} />
                        <span>匯入學生資料</span>
                    </Button>
                </div>
                {
                    data.length
                        ?
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead >
                                    <TableRow>
                                        <TableCell className={classes.head}>學號</TableCell>
                                        <TableCell className={classes.head}>姓名</TableCell>
                                        <TableCell className={classes.head}>個人頁面</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map(row => (
                                        <TableRow key={row.id}>
                                            <TableCell className={classes.content} style={{ width: '15%' }} component="th" scope="row">{row.time}</TableCell>
                                            <TableCell className={classes.content} style={{ width: '20%' }}>{row.title}</TableCell>
                                            <TableCell className={classes.content}>{row.content}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                        :
                        <div></div>
                }
            </div>
        );
    }
}

export default withStyles(styles)(Studentpage);
