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
import { fetchPostSchedule } from '../../api';
import Airtable from 'airtable';

const TABLE_NAME = 'Schedule';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);

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
function createData(date, origin, real, class_id) {
    id += 1;
    return { id, date, origin, real, class_id };
}

class Progresspage extends Component {
    state = {
        rows: [],
        noClick: false,
        rowsInit: [],
        class_id: '',
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.class_id !== this.state.class_id) {
            var count = this.state.rowsInit.length;
            var temp = [];
            for (var index = 0; index < count; index++) {
                if (nextProps.class_id === this.state.rowsInit[index].class_id) {
                    temp.push(this.state.rowsInit[index]);
                    this.setState({ rows: temp });
                }
            }
            this.setState({ class_id: nextProps.class_id });
        }
    }

    //airtable
    componentDidMount() {

        table.select({
            //filterByFormula: fileterSentence,
            view: "Grid view",
            //maxRecords: 1
        }).eachPage((records, fetchNextPage) => {
            this.setState({ records });

            const schedule_date = this.state.records.map((record, index) => record.fields['schedule_date']);
            const schedule_expect = this.state.records.map((record, index) => record.fields['schedule_expect']);
            const schedule_real = this.state.records.map((record, index) => record.fields['schedule_real']);
            const class_id = this.state.records.map((record, index) => record.fields['class_id']);
            var temp = [];
            for (var index = 0; index < schedule_date.length; index++) {
                temp.push(createData(schedule_date[index], schedule_expect[index], schedule_real[index], class_id[index]));
            }

            this.setState({ rows: temp });
            this.setState({ rowsInit: temp });
            fetchNextPage();
        }
        );
    }

    handleClick = () => {
        if (this.state.rows !== "") {

            for (var index = 0; index < this.state.rows.length; index++) {
                let data = { fields: { class_id: {}, schedule_date: {}, schedule_expect: {} } };
                data.fields.schedule_date = this.state.rows[index].date;
                data.fields.schedule_expect = this.state.rows[index].origin;
                data.fields.class_id = this.state.class_id;
                fetchPostSchedule(data);
            }
        }
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
                // for (var index = 0; index < progress_date.length; index++) {
                //     data.push(createData(progress_date[index], progress_origin[index], progress_real[index]));
                // }               
                this.setState({ rows: data });

                // console.log(data[0]);
                // console.log(data[0].date);
                // console.log(data[0].origin);
            } catch (e) {
                // message.error('文件類型不正确！');
            }
        };
        fileReader.readAsBinaryString(files[0]);
    }
    render() {
        const { classes } = this.props;
        const { rows, noClick } = this.state;

        return (
            <div style={{ borderColor: '#FFBF5F' }}>
                <Button disabled={noClick} className={classes.button}>
                    <Upload type='upload' />
                    <input className={classes.input} type='file' accept='.xlsx, .xls' onChange={this.onImportExcel} />
                    <span>匯入教學進度</span>
                </Button>
                <Button className={classes.editButton} onClick={this.handleClick}>
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