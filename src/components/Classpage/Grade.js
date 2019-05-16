import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
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
import Appbar from '../AppBar/Appbar';
import Airtable from 'airtable';
import { fetchPostGrade } from '../../api';

const TABLE_NAME = 'TestScore';
const STU_TABLE_NAME = 'Student';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);
const studentTable = base(STU_TABLE_NAME);

const styles = theme => ({
    card: {
        backgroundColor: '#212832',
        border: '0.8px #FFBF5F solid',
        borderRadius: '2px',
        width: '80%',
        minWidth: '1000px',
        marginTop: theme.spacing.unit * 5,
        margin: '0 auto',
        padding: '3%'
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
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        backgroundColor: '#212832',
        border: 'white 1px solid',
    },
    head: {
        fontSize: '14pt',
        color: '#FFBF5F',
    },
    content: {
        fontSize: '14pt',
    },
    editButton: {
        border: '#FFBF5F 1px solid',
        float: 'right',
        marginLeft: theme.spacing.unit * 2,
    }
});

let id = 0;
function createData(grade_studentName, grade_studentId, grade_studentGrade, grade_studentRank) {
    id += 1;
    return { id, grade_studentName, grade_studentId, grade_studentGrade, grade_studentRank };
}

class Grade extends Component {
    state = {
        rows: [],
        //rowsInit:[],
        class_id:'',
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.class_id !== this.state.class_id) {
    //         var count = this.state.rowsInit.length;
    //         var temp = [];
    //         for (var index = 0; index < count; index++) {
    //             if (nextProps.class_id === this.state.rowsInit[index].class_id) {
    //                 temp.push(this.state.rowsInit[index]);
    //                 this.setState({ rows: temp });
    //             }
    //         }
    //         this.setState({ class_id: nextProps.class_id });
    //     }
    // }

    handleClick = () => {
        if (this.state.rows !== "") {

            for (var index = 0; index < this.state.rows.length; index++) {
                let data = { fields: { class_id: {}, student_id: {}, test_date: {}, test_name:{}, test_score:{}, test_rank:{},
                Q1:{}, Q2:{}, Q3:{}, Q4:{}, Q5:{}, Q6:{}, Q7:{}, Q8:{}, Q9:{}, Q10:{}} };
                data.fields.class_id = this.props.location.aboutProps.class_id;
                data.fields.student_id = (this.state.rows[index].grade_studentId).toString();
                data.fields.test_name = this.props.location.aboutProps.name.split(" ")[1];
                data.fields.test_date = this.props.location.aboutProps.name.split(" ")[0];
                data.fields.test_score = this.state.rows[index].grade_studentGrade;
                data.fields.test_rank = this.state.rows[index].grade_studentRank;
                data.fields.Q1 = this.state.rows[index].Q1;
                data.fields.Q2 = this.state.rows[index].Q2;
                data.fields.Q3 = this.state.rows[index].Q3;
                data.fields.Q4 = this.state.rows[index].Q4;
                data.fields.Q5 = this.state.rows[index].Q5;
                data.fields.Q6 = this.state.rows[index].Q6;
                data.fields.Q7 = this.state.rows[index].Q7;
                data.fields.Q8 = this.state.rows[index].Q8;
                data.fields.Q9 = this.state.rows[index].Q9;
                data.fields.Q10 = this.state.rows[index].Q10;
                console.log(data);

                fetchPostGrade(data);
            }
        }
    }

    //airtable
    componentDidMount() {
        // const fileterSentence = 'AND(test_date="' + this.props.location.aboutProps.name.split(" ")[0] + 
        // '"),AND(test_name="'+ this.props.location.aboutProps.name.split(" ")[1] + '")';
        const fileterSentence = 'AND(test_name="'+ this.props.location.aboutProps.name.split(" ")[1] + '")'

        table.select({
            filterByFormula: fileterSentence,
            view: "Grid view",
            //maxRecords: 1
        }).eachPage((records, fetchNextPage) => {
            this.setState({ records });
            //const class_id = this.state.records.map((record, index) => record.fields['class_id']);
            const student_id = this.state.records.map((record, index) => record.fields['student_id']);
            const test_score = this.state.records.map((record, index) => record.fields['test_score']);
            const test_rank = this.state.records.map((record, index) => record.fields['test_rank']);

            //for stu name
            var temp = [];
            for (var index = 0; index < student_id.length; index++) {
                const student_idR = student_id[index];
                const test_scoreR = test_score[index];
                const test_rankR = test_rank[index];

                studentTable.select({
                    filterByFormula: 'AND(student_id="'+ student_idR + '")',
                    view: "Grid view",
                    //maxRecords: 1
                }).eachPage((records, fetchNextPage) => {
                    this.setState({ records });
                    const student_name = this.state.records.map((record, index) => record.fields['student_name']);
                    temp.push(createData(student_name[0], student_idR, test_scoreR, test_rankR));  
                }
                );
            }
            // var temp = [];
            // for(var index = 0; index < student_id.length; index++) {
            //     temp.push(createData("namee",student_id[index],test_score[index],"rank"));  
            // }
            this.setState({ rows : temp });
            console.log(this.state.rows);
            //this.setState({ rowsInit : temp });
            fetchNextPage();
        }
        );
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

                // for (var index = 0; index < id; index++) {
                //     data.push(createData(grade_studentName[index], grade_studentId[index], grade_studentGrade[index], grade_studentRank[index]));

                // }

                this.setState({ rows: data });
                 console.log(data);
                // console.log(data[0]);
                // console.log(data[0].grade_studentName);
                // console.log(data[0].grade_studentId);
            } catch (e) {
                // message.error('文件類型不正确！');
            }
        };
        fileReader.readAsBinaryString(files[0]);
    }
    render() {
        //console.log(this.props.location.aboutProps.class_id);
        const { classes } = this.props;
        // const { rows } = this.state;
        //console.log(this.state.rows);

        return (
            <div>
                <Appbar />
                <div>
                    <Card className={classes.card} >
                        <div style={{ borderColor: '#FFBF5F' }}>
                            <Button className={classes.button}>
                                <Upload type='upload' />
                                <input className={classes.input} type='file' accept='.xlsx, .xls' onChange={this.onImportExcel} />
                                <span>成績上傳</span>
                            </Button>
                            <Button className={classes.editButton} onClick={this.handleClick}>
                                儲存
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
                                        {(this.state.rows).map((row,index) => {
                                            return(
                                            <TableRow hover key={index}>
                                                <TableCell className={classes.content} style={{ width: '25%' }} component="th" scope="row">{row.grade_studentName}</TableCell>
                                                <TableCell className={classes.content}>{row.grade_studentId}</TableCell>
                                                <TableCell className={classes.content}>{row.grade_studentGrade}</TableCell>
                                                <TableCell className={classes.content}>{row.grade_studentRank}</TableCell>
                                            </TableRow>
                                        );})}
                                    </TableBody>
                                </Table>
                            </Paper>

                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Grade);
