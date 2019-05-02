import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Upload from '@material-ui/icons/CreateNewFolderRounded';
import { withStyles } from '@material-ui/core/styles';
// import { fromJS, List, Map } from 'immutable'
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
});

let id = 0;
function createData(name, number, grade, rank) {
    id += 1;
    return { id, name, number, grade, rank };
}

class Progresspage extends Component {
    state = {
        rows: [],
    }

    onImportExcel = file => {
        // 獲取上傳的文件對象
        const { files } = file.target;
        // 通過FileReader讀取文件
        const fileReader = new FileReader();
        fileReader.onload = event => {
            try {
                const { result } = event.target;
                // 以二進制方式讀取得到整份excel表格
                const workbook = XLSX.read(result, { type: 'binary' });
                // 儲存獲取到的數據
                let data = [];
                // 對每張工作表行行讀取（預設只讀取第一張表）
                for (const sheet in workbook.Sheets) {
                    // esline-disable-next-line
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        // 利用 sheet_to_json 方法將 excel 轉成 json 數據
                        data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                        // break;
                    }
                }
                // 最終獲取到且格式化的 json 數據
                this.setState({ data });
                const grade_studentName = this.state.data.map((data, index) => data['grade_studentName']);
                const grade_studentId = this.state.data.map((data, index) => data['grade_studentId']);
                const grade_studentGrade = this.state.data.map((data, index) => data['grade_studentGrade']);
                const grade_studentRank = this.state.data.map((data, index) => data['grade_studentRank']);
                
                for (var index = 0; index < id; index++) {
                    data.push(createData(grade_studentName[index], grade_studentId[index], grade_studentGrade[index],grade_studentRank[index]));

                }

                this.setState({ rows: data });
                console.log(data);
                console.log(data[0]);
                console.log(data[0].grade_studentName);
                console.log(data[0].grade_studentId);
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
                    <span>成績上傳</span>
                </Button>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead >
                            <TableRow>
                                <TableCell className={classes.head} style={{ width: '25%' }}>學生姓名</TableCell>
                                <TableCell className={classes.head} >學號</TableCell>
                                <TableCell className={classes.head} >分數</TableCell>
                                <TableCell className={classes.head} >排名</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow hover key={row.id}>
                                    <TableCell className={classes.content} style={{ width: '25%' }} component="th" scope="row">{row.grade_studentName}</TableCell>
                                    <TableCell className={classes.content}>{row.grade_studentId}</TableCell>
                                    <TableCell className={classes.content}>{row.grade_studentGrade}</TableCell>
                                    <TableCell className={classes.content}>{row.grade_studentRank}</TableCell>
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
