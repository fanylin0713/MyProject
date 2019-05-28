import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../AppBar/Appbar';
import {
  FormControlLabel,
  FormGroup,
  Switch,
  Radio,
  RadioGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@material-ui/core';
import { Button } from '@material-ui/core';

import Add from '@material-ui/icons/AddBoxOutlined';

import NoFace from './noFace.jpg';
import nostu from './nostu.png';
import arrived from './arrived.png';
import axios from 'axios';
import Airtable from 'airtable';
import { fetchPostAttend } from '../../api';
import { NavLink } from "react-router-dom";

//icon
import Lock from '@material-ui/icons/LockOutlined';
import LockOpen from '@material-ui/icons/LockOpenOutlined';


const TABLE_NAME = 'Student';
const CLASS_TABLE_NAME = 'ClassDay';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);
const classTable = base(CLASS_TABLE_NAME);

const IP = "http://localhost:8080";

function createData(classid, grade) {
  return { id: classid, grade };
}

function createStuData(stu_id, name, image, phone, parent) {
  return { id: stu_id, name, image, phone, parent };
}
function createallStuData(stu_id, name, link) {
  return { id: stu_id, name, link };
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const styles = theme => ({
  selectBar: {
    width: '80%',
    margin: 'auto',
    marginTop: theme.spacing.unit * 5,
    border: '#FFBF5F solid 0.8px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'row',
    minWidth: '900px',
  },
  radio: {
    marginLeft: '7%',
    width: '10%',
  },
  homework: {
    marginLeft: '5%',
    width: '10%',
  },
  formControl: {
    margin: 'auto 0',
    marginLeft: '7%',
  },
  label: {
    fontSize: '14pt',
  },
  select: {
    width: '180px'
  },
  buttonStart: {
    fontSize: '16pt',
    height: '50px',
    width: '12%',
    border: '#FFBF5F solid 0.8px',
    borderRadius: '10px',
    margin: 'auto 0',
    marginLeft: '10%',
  },

  info: {
    width: '80%',
    minWidth: '900px',
    margin: 'auto',
  },

  photo: {
    width: '200px',
    height: '200px',
    marginLeft: '40%',
    marginTop: theme.spacing.unit * 10,
  },

  studentInfo: {
    fontSize: '16pt',
    marginLeft: '35%',
    marginTop: theme.spacing.unit * 5,
  },
  textField: {
    float: 'right',
  },
  addIcon: {
    float: 'right',
    color: '#FFBF5F',
    fontSize: '40pt',
    marginTop: theme.spacing.unit * 2,
  },
  buttonEnd: {
    float: 'right',
    fontSize: '16pt',
    height: '50px',
    width: '12%',
    border: '#FFBF5F solid 0.8px',
    borderRadius: '10px',
    margin: 'auto 0',
    marginLeft: theme.spacing.unit,
  },
  yes: {
    marginLeft: '42%',
    marginTop: theme.spacing.unit * 2,
    height: '50px',
    width: '140px',
    backgroundColor: '#39dc0d',
    "&:hover": {
      backgroundColor: "#1ec613",
    }
  },

  finish: {
    float: 'right',
    marginTop: '26.5%',
    marginRight: '10%',
  }
});

class Rollcall extends React.Component {
  // props = {
  //   face_id:'',
  // }

  state = {
    value: '',
    nowClass: '',
    nowClassKey: '',
    start: false,
    end: true,
    stu_id: '',
    stu_name: '',
    stu_img: NoFace,
    face_id: '',
    facepath: '',
    this_faceid: '',
    open: false,
    traintwo: true,
    canyes: true,
    // face_time: '',
    classDataInit: [],
    classData: [],
    stuDataInit: [],
    AllstuData: [],
    class_id: '',
    checkedHomework: true,
    checkedFinish: true,
    age: '',
    absent: [],
    ta: false,
    taopen: false,
    error: false,
    errorMessage: '',
    password: '',
    notTa: false,
  };


  componentDidUpdate(prevProps) {
    //console.log(this.state.face_id);
    if (this.state.face_id !== prevProps.face_id && this.state.end === false) {
      axios.create({
        baseURL: IP,
        headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      }).get("/real")
        .then((response) => {
          var face_id = response.data;
          // var face_id = response.data.split("!")[0];
          // var face_time = response.data.split("!")[1];

          this.setState({ face_id: face_id });
          //this.setState({ face_time: face_time });


          var count = 0;
          for (var index = 0; index < this.state.stuDataInit.length; index++) {
            if (this.state.stuDataInit[index].id == this.state.face_id) {
              count++;
            }
          }
          var countthis = 0;
          for (var index = 0; index < this.state.absent.length; index++) {
            if (this.state.absent[index].id == this.state.face_id) {
              countthis++;
            }
          }
          console.log(count);
          for (var index = 0; index < this.state.stuDataInit.length; index++) {
            if (countthis == 0 && count !== 0 && face_id !== 'none' && face_id !== '') {
              this.setState({
                stu_id: this.state.stuDataInit[index].id,
                stu_name: this.state.stuDataInit[index].name,
                stu_img: arrived,
                canyes: false,
              });

            }
            else if (this.state.stuDataInit[index].id == this.state.face_id) {
              this.setState({
                stu_id: this.state.stuDataInit[index].id,
                stu_name: this.state.stuDataInit[index].name,
                stu_img: this.state.stuDataInit[index].image
              });
            }
            else if (count == 0 && face_id !== 'none' && face_id !== '') {
              for (var i = 0; i < this.state.AllstuData.length; i++) {
                if (this.state.AllstuData[i].id == this.state.face_id) {
                  this.setState({
                    stu_id: this.state.AllstuData[i].id,
                    stu_name: this.state.AllstuData[i].name,
                    stu_class: this.state.AllstuData[i].link,
                    stu_img: nostu,
                    canyes: false,
                  });
                }
              }
            }

          }
        })
        .catch((error) =>
          console.error(error)
        );
    }
    if (this.state.end === false) {
      axios.create({
        baseURL: IP,
        headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      }).get("/again")
        .then((response) => {
          var face_path = response.data.split("!")[0];
          var this_faceid = response.data.split("!")[1];
          if (response.data !== 'no!') {
            this.setState({ facepath: face_path });
            this.setState({ this_faceid: this_faceid });
          }
          //console.log(this.state.facepath)
        })
        .catch((error) =>
          console.error(error)
        );
    }
  }

  componentDidMount() {

    classTable.select({
      //filterByFormula: fileterSentence,
      view: "Grid view",
      //maxRecords: 1
    }).eachPage((records, fetchNextPage) => {
      this.setState({ records });

      const class_id = this.state.records.map((record, index) => record.fields['class_id']);
      const class_grade_id = this.state.records.map((record, index) => record.fields['class_grade_id']);
      var temp = [];
      for (var index = 0; index < class_id.length; index++) {
        temp.push(createData(class_id[index], class_grade_id[index]));
      }
      this.setState({ classDataInit: temp });
      this.setState({ classData: temp });
    }
    );
    table.select({
      view: "Grid view",
    }).eachPage((records, fetchNextPage) => {
      this.setState({ records });

      const student_name = this.state.records.map((record, index) => record.fields['student_name']);
      const student_id = this.state.records.map((record, index) => record.fields['student_id']);

      const class_id_link = this.state.records.map((record, index) => record.fields['strlink']);
      var temp1 = [];
      for (var index = 0; index < student_name.length; index++) {
        temp1.push(createallStuData(student_id[index], student_name[index], class_id_link[index]));
      }
      this.setState({ AllstuData: temp1 });

    }
    );

  }


  //選國高中
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    var temp = [];
    if (event.target.value == "國中") {
      for (var index = 0; index < this.state.classDataInit.length; index++) {
        if (this.state.classDataInit[index].grade == "middle") {
          temp.push(this.state.classDataInit[index]);
        }
      }
      this.setState({ classData: temp });

    } else if (event.target.value == "高中") {
      for (var index = 0; index < this.state.classDataInit.length; index++) {
        if (this.state.classDataInit[index].grade == "high") {
          temp.push(this.state.classDataInit[index]);
        }
      }
      this.setState({ classData: temp });
    }
  };

  //選擇班級
  handleClassChange = name => event => {
    this.setState({ [name]: event.target.value });
    this.setState({ class_id: event.target.value });
    const fileterSentence = 'AND(class_id_link="' + event.target.value + '")'
    table.select({
      filterByFormula: fileterSentence,
      view: "Grid view",
      //maxRecords: 1
    }).eachPage((records, fetchNextPage) => {
      this.setState({ records });

      const student_name = this.state.records.map((record, index) => record.fields['student_name']);
      const student_id = this.state.records.map((record, index) => record.fields['student_id']);
      const student_img = this.state.records.map((record, index) => record.fields['student_img'][0].url);
      const student_phone = this.state.records.map((record, index) => record.fields['student_phone']);
      const student_parent_phone = this.state.records.map((record, index) => record.fields['student_parent_phone']);
      var temp = [];
      var temp2 = [];
      for (var index = 0; index < student_name.length; index++) {
        temp.push(createStuData(student_id[index], student_name[index], student_img[index], student_phone[index], student_parent_phone[index]));
        temp2.push(createStuData(student_id[index], student_name[index], student_img[index], student_phone[index], student_parent_phone[index]));
      }
      this.setState({ stuDataInit: temp });
      //console.log(this.state.stuDataInit);
      this.setState({ absent: temp2 });

    }
    );

  };

  //助教解鎖
  handleOpenLock = e => {
    this.setState({ ta: true })
    this.setState({ taopen: true })
  }

  //助教鎖著
  handleLock = e => {
    this.setState({ notTa: true })
    this.setState({ ta: false })
  }

  //開始點名
  handleStart = e => {
    axios.create({
      baseURL: IP,
      headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    }).get("/retrieveface")
      .then((response) => {
        console.log("in response");
        console.log('open :', response.status, '\nopen camera', new Date());
      })
      .catch((error) =>
        console.error(error)
      );

    // axios.create({
    //   baseURL: IP,
    //   headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    // }).get("/real")
    //   .then((response) => {
    //   })
    //   .catch((error) =>
    //     console.error(error)
    //   );

    this.setState({ start: true })
    this.setState({ notTa: true })

    let data = { fields: { class_id: {}, student_id: {}, attend_hw: {} } };
    data.fields.class_id = this.state.class_id;
    data.fields.student_id = 'admin';
    data.fields.attend_hw = this.state.checkedHomework;

    fetchPostAttend(data);
  };

  //要不要交作業
  handleHomework = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  //有沒有教作業
  handleFinish = name => event => {
    this.setState({ [name]: event.target.checked });
  };




  //結束點ㄇㄧㄥˊ
  handleEnd = e => {
    this.setState({ open: true })
  };


  handleYes = e => {
    const formdata = new FormData();
    // console.log(this.state.facepath)
    // console.log(this.state.this_faceid)
    formdata.set('face_path', this.state.facepath);
    formdata.set('faceid', this.state.stu_id);
    if (this.state.traintwo === true || this.state.stu_id === this.state.this_faceid) {
      axios({
        method: 'post',
        url: 'http://localhost:8080/trainagain',
        data: formdata,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
        .then((response) => {
          console.log("in")
        })
        .catch((error) =>
          console.error(error)
        );
    }


    // data.fields.attend_time = (this.state.face_time.split(" ")[1]).split(":")[0] + ":" +
    //   (this.state.face_time.split(" ")[1]).split(":")[1];
    if (this.state.canyes === true) {
      let data = { fields: { class_id: {}, student_id: {}, attend_hw: {} } };
      data.fields.class_id = this.state.class_id;
      data.fields.student_id = this.state.stu_id;
      data.fields.attend_hw = this.state.checkedFinish;
      fetchPostAttend(data);
    }

    this.setState({
      stu_id: '',
      stu_name: '',
      stu_img: NoFace
    });

    for (var i = 0; i < this.state.absent.length; i++) {
      //console.log(this.state.absent);
      if (this.state.stu_id == this.state.absent[i].id) {
        //delete this.state.absent[i];
        (this.state.absent).splice(i, 1);
      }
    }

  };

  // handleAbsent = e => {
  //   console.log(this.state.absent);
  // };

  handleClickAdd = name => event => {
    for (var index = 0; index < this.state.stuDataInit.length; index++) {
      if (this.state.stuDataInit[index].id == this.state.age) {
        this.setState({
          stu_id: this.state.stuDataInit[index].id,
          stu_name: this.state.stuDataInit[index].name,
          stu_img: this.state.stuDataInit[index].image
        });
      }
    }
    this.setState({ traintwo: false })
    //console.log(this.state.age);

  };
  // handleChange = name => event => {
  //   this.setState({ [name]: event.target.value });
  // };

  //取消結束點名
  handleNotEnd = e => {
    this.setState({ open: false })
  }

  //真的結束點名
  handleRealEnd = e => {
    axios.create({
      baseURL: IP,
      headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    }).get("/terminate")
      .then((response) => {
        console.log("in terminate");
      })
      .catch((error) =>
        console.error(error)
      );

    this.setState({ start: false })
    this.setState({ end: true })
    this.setState({ open: false })
  }

  //助教Dialog
  handleTa = e => {
    if (this.state.password === '123') {
      this.setState({ notTa: false })
      this.setState({ taopen: false });
      this.setState({ end: false })
    }
    else {
      this.setState({
        error: true,
        errorMessage: '密碼錯誤'
      })
    }
  }

  handlePassword = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleClick = e => {
    this.setState({
      error: false,
      errorMessage: '',
    })
  }

  handleCloseTa = e => {
    this.setState({ taopen: false })
  }

  //關結束Dialog
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { error, errorMessage } = this.state
    const { classes } = this.props;
    return (
      <div>
        {this.state.notTa === true ?
          <div />
          : <AppBar />
        }
        <div className={classes.selectBar}>
          <FormControl className={classes.radio} component="fieldset">
            <RadioGroup
              aria-label="area"
              name="area"
              className={classes.group}
              value={this.state.value}
              onChange={this.handleChange('value')}
            >
              <FormControlLabel classes={{ label: classes.label, }} value="國中" control={<Radio />} label="國中" />
              <FormControlLabel classes={{ label: classes.label, }} value="高中" control={<Radio />} label="高中" />
            </RadioGroup>
          </FormControl>
          <FormGroup className={classes.homework} row>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.checkedHomework}
                  onChange={this.handleHomework('checkedHomework')}
                />
              }
              label="作業繳交"
            />
          </FormGroup>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="outlined-nowClass-simple"
            >
              班級
                    </InputLabel>
            <Select
              value={this.state.nowClass}
              onChange={this.handleClassChange('nowClass')}
              className={classes.select}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  name="nowClass"
                  id="outlined-nowClass-simple"
                />
              }
            >
              <MenuItem value="">
                <em>班級</em>
              </MenuItem>
              {(this.state.classData).map((n, index) => {
                return (
                  <MenuItem key={n.id} value={n.id}>{n.id}</MenuItem>
                );
              })}
              {/* <MenuItem value={10}>英文Ａ班</MenuItem>
              <MenuItem value={20}>數學Ａ班</MenuItem>
              <MenuItem value={30}>國文Ｂ班</MenuItem> */}
            </Select>
          </FormControl>

          <Button disabled={this.state.start} className={classes.buttonStart} onClick={this.handleStart}>開始點名</Button>
          <Button disabled={this.state.end} className={classes.buttonEnd} onClick={this.handleEnd}>結束點名</Button>

          {this.state.ta === false ?
            <Button onClick={this.handleOpenLock}><Lock /></Button>
            :
            <Button onClick={this.handleLock}><LockOpen /></Button>
          }

          {/* 助教dialog */}
          <Dialog
            open={this.state.taopen}
            onClose={this.handleClose}
          >
            <DialogTitle >輸入密碼</DialogTitle>
            <DialogContent>
              <TextField
                id='password'
                error={error}
                helperText={errorMessage}
                value={this.state.password}
                onClick={this.handleClick}
                onChange={this.handlePassword}
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseTa} color="primary">取消</Button>
              <Button onClick={this.handleTa} color="primary">確定</Button>
            </DialogActions>
          </Dialog>

          {/* 結束點名 */}
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
          >
            <DialogTitle >是否結束點名？</DialogTitle>
            <DialogActions>
              <Button onClick={this.handleNotEnd} color="primary">取消</Button>
              <NavLink style={{ textDecoration: 'none' }} activeClassName="active" to={{ pathname: '/late', aboutProps: { name: this.state.absent } }}>
                <Button onClick={this.handleRealEnd} color="primary">確定</Button>
              </NavLink>
            </DialogActions>
          </Dialog>

        </div>


        {
          this.state.start === true ?
            <div className={classes.info}>
              <img className={classes.photo} src={this.state.stu_img} alt="location" />
              {this.state.checkedHomework === true && this.state.notTa === false ?
                <FormGroup className={classes.finish}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.checkedFinish}
                        onChange={this.handleFinish('checkedFinish')}
                      />
                    }
                    label="確認繳交"
                  />
                </FormGroup>
                :
                <div></div>
              }
              <pre>
                <Typography className={classes.studentInfo}>姓名：{this.state.stu_name}     學號：{this.state.stu_id}</Typography>
                <Typography className={classes.studentInfo}>{this.state.stu_class}</Typography>
              </pre>
              <Button onClick={this.handleYes} className={classes.yes} >確認！</Button>
              {this.state.notTa === false ?
                <div>
                  <Add className={classes.addIcon} onClick={this.handleClickAdd()} />
                  <TextField
                    id="filled-with-placeholder"
                    label="輸入學號"
                    className={classes.textField}
                    value={this.state.age}
                    onChange={this.handleChange('age')}
                    margin="normal"
                    variant="filled"
                  />
                </div>
                :
                <div />
              }
            </div> :
            <div></div>
        }


      </div>
    )
  }

}

export default withStyles(styles)(Rollcall);