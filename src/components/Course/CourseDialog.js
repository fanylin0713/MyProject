import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from '@material-ui/core/styles';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import { fetchPostCourse } from '../../api';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const tableTeacher = base('Teacher');
const tableClassRoom = base('ClassRoom');
const tableClassDay = base('ClassDay');

let counter = 0;
function createData(classroom, area) {
    counter += 1;
    return { id: classroom, area };
}

const styles = theme => ({
    root: {
        width: '800px',
        margin: 'auto',
    },
    formControl: {
        minWidth: 120,
        width: 220,
        marginTop: theme.spacing.unit * 3,
    },
    container: {
        width: '400px',
        paddingLeft:'22%',
    },
    textField: {
        width: 220,
        marginTop: theme.spacing.unit * 3,
    },
    add:{
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 150,
        borderRadius:'10px',
    },
});

class FormDialog extends React.Component {
    state = {
        course: '',
        teacher: '',
        teacherValue:[],
        classroom: '',
        classroomInit:[],
        classroomValue:[],
        day: '',
        dayValue:["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
        time: '',
        labelWidth: 0,
        open: false,
        listNameFromParent: ''
    };

    
    componentWillReceiveProps(nextProps) {
        if (nextProps.listNameFromParent !== this.state.listNameFromParent) {
            var count = this.state.classroomInit.length;
            var temp = [];
            for (var index = 0; index < count; index++) {
                if (nextProps.listNameFromParent === this.state.classroomInit[index].area) {
                    temp.push(this.state.classroomInit[index]);
                    this.setState({ classroomValue: temp });
                }
            }
            this.setState({ listNameFromParent: nextProps.listNameFromParent });
        }
    }

    componentDidMount() {    
        //Teacher
        tableTeacher.select({
          view: "Grid view",
          }).eachPage((records, fetchNextPage) => {
            this.setState({records});
            var temp=[];
            const teacher_name = this.state.records.map((record, index) => record.fields['teacher_name']); 
            for(var index = 0; index < teacher_name.length; index++){
                temp.push(teacher_name[index]);
            }   
            
            this.setState({teacherValue : temp});
            fetchNextPage(); 
          }
          );

        //ClassRoom
        tableClassRoom.select({
            view: "Grid view",
            }).eachPage((records, fetchNextPage) => {
              this.setState({records});
              var temp=[];
              const classroom_id = this.state.records.map((record, index) => record.fields['classroom_id']); 
              const class_area = this.state.records.map((record, index) => record.fields['class_area']); 
              for(var index = 0; index < classroom_id.length; index++){
                  temp.push(createData(classroom_id[index], class_area[index]));
              }
              this.setState({classroomInit : temp});
              this.setState({classroomValue : temp});
              fetchNextPage(); 
            }
            );
      }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button className={classes.add} variant="outlined" onClick={this.handleClickOpen}>
                    新增課程
                </Button>
                <Dialog className={classes.root}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">新增課程資料</DialogTitle>
                    <DialogContent>
                        <form className={classes.container} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    id="outlined-course"
                                    label="課程名稱"
                                    className={classes.textField}
                                    value={this.state.course}
                                    onChange={this.handleChange('course')}
                                    variant="outlined"
                                />
                            </div>
                            <div>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel
                                        ref={ref => {
                                            this.InputLabelRef = ref;
                                        }}
                                        htmlFor="outlined-teacher-simple"
                                    >
                                        授課老師
                                </InputLabel>
                                    <Select
                                        value={this.state.teacher}
                                        onChange={this.handleChange('teacher')}
                                        input={
                                            <OutlinedInput
                                                labelWidth={this.state.labelWidth}
                                                name="teacher"
                                                id="outlined-teacher-simple"
                                            />
                                        }
                                    >
                                        <MenuItem value="">
                                            <em>選擇老師</em>
                                        </MenuItem>
                                        {(this.state.teacherValue).map((n, index) => {
                                            return (
                                                <MenuItem value={n}>{n}</MenuItem>
                                            );
                                        })}
                                        {/* <MenuItem value={10}>蔡萌志</MenuItem>
                                        <MenuItem value={20}>胡俊之</MenuItem>
                                        <MenuItem value={30}>陳子立</MenuItem> */}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel
                                        ref={ref => {
                                            this.InputLabelRef = ref;
                                        }}
                                        htmlFor="outlined-classroom-simple"
                                    >
                                        教室
                                </InputLabel>
                                    <Select
                                        value={this.state.classroom}
                                        onChange={this.handleChange('classroom')}
                                        input={
                                            <OutlinedInput
                                                labelWidth={this.state.labelWidth}
                                                name="classroom"
                                                id="outlined-classroom-simple"
                                            />
                                        }
                                    >
                                        <MenuItem value="">
                                            <em>選擇教室</em>
                                        </MenuItem>
                                        {(this.state.classroomValue).map((n, index) => {
                                            return (
                                                <MenuItem value={n.id}>{n.id}</MenuItem>
                                            );
                                        })}
                                        {/* <MenuItem value={10}>BS336</MenuItem>
                                        <MenuItem value={20}>BS440</MenuItem>
                                        <MenuItem value={30}>LM503</MenuItem> */}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel
                                        ref={ref => {
                                            this.InputLabelRef = ref;
                                        }}
                                        htmlFor="outlined-day-simple"
                                    >
                                        星期
                                </InputLabel>
                                    <Select
                                        value={this.state.day}
                                        onChange={this.handleChange('day')}
                                        input={
                                            <OutlinedInput
                                                labelWidth={this.state.labelWidth}
                                                name="day"
                                                id="outlined-day-simple"
                                            />
                                        }
                                    >
                                        <MenuItem value="">
                                        </MenuItem>
                                        {(this.state.dayValue).map((n, index) => {
                                            return (
                                                <MenuItem value={n}>{n}</MenuItem>
                                            );
                                        })}
                                        {/* <MenuItem value={10}>星期一</MenuItem>
                                        <MenuItem value={20}>星期二</MenuItem>
                                        <MenuItem value={30}>星期三</MenuItem> */}
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel
                                        ref={ref => {
                                            this.InputLabelRef = ref;
                                        }}
                                        htmlFor="outlined-day-simple"
                                    >
                                        時間
                                </InputLabel>
                                    <Select
                                        value={this.state.time}
                                        onChange={this.handleChange('day')}
                                        input={
                                            <OutlinedInput
                                                labelWidth={this.state.labelWidth}
                                                name="day"
                                                id="outlined-day-simple"
                                            />
                                        }
                                    >
                                        <MenuItem value="">
                                        </MenuItem>
                                        <MenuItem value={10}>21:00</MenuItem>
                                        <MenuItem value={20}>22:00</MenuItem>
                                        <MenuItem value={30}>19:00</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">取消</Button>
                        <Button onClick={this.handleClose} color="primary">新增課程</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(FormDialog);