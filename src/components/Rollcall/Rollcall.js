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
  DialogTitle
} from '@material-ui/core';
import { Button } from '@material-ui/core';

import Add from '@material-ui/icons/AddBoxOutlined';

import NoFace from './noFace.jpg';
import axios from 'axios';
import Airtable from 'airtable';
import { fetchPostAttend } from '../../api';
import { NavLink } from "react-router-dom";


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
    marginLeft: '10%',
  },
  homework:{
    marginLeft: '5%',
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
    border: '#FFBF5F solid 0.8px',
    borderRadius: '10px',
    margin: 'auto 0',
    marginLeft: '15%',
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
    marginLeft: '45%',
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
    border: '#FFBF5F solid 0.8px',
    borderRadius: '10px',
    margin: 'auto 0',
    marginLeft: theme.spacing.unit,
  },
  yes: {
    marginLeft: '36.5%',
    marginTop: theme.spacing.unit * 2,
    height: '50px',
    width: '140px',
    backgroundColor: 'green'
  },
  no: {
    marginLeft: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 2,
    height: '50px',
    width: '140px',
    backgroundColor: 'red',
  },

  finish:{
    float:'right',
    marginTop:'26.5%',
    marginRight:'10%',
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
    open:false,
    // face_time: '',
    classDataInit: [],
    classData: [],
    stuDataInit: [],
    class_id: '',
    checkedHomework: true,
    checkedFinish: true,
    age:'',
    absent: [],
  };

  componentDidUpdate(prevProps) {
    console.log(this.state.face_id);
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

          for (var index = 0; index < this.state.stuDataInit.length; index++) {
            if (this.state.stuDataInit[index].id == this.state.face_id) {
              this.setState({
                stu_id: this.state.stuDataInit[index].id,
                stu_name: this.state.stuDataInit[index].name,
                stu_img: this.state.stuDataInit[index].image
              });
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
      var face_path = response.data;
      if(response.data !=='no'){
      this.setState({ facepath: face_path });
      }
      console.log(this.state.facepath)
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
  }

  
  //選國高中
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    var temp = [];
    if (event.target.value === "國中") {
      for (var index = 0; index < this.state.classDataInit.length; index++) {
        if (this.state.classDataInit[index].grade == "middle") {
          temp.push(this.state.classDataInit[index]);
        }
      }
      this.setState({ classData: temp });
      
    } else if (event.target.value === "高中") {
      for (var index = 0; index < this.state.classDataInit.length; index++) {
        if (this.state.classDataInit[index].grade == "high") {
          temp.push(this.state.classDataInit[index]);
        }
      }
      this.setState({ classData: temp });
    }
  };
  
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
      for (var index = 0; index < student_name.length; index++) {
        temp.push(createStuData(student_id[index], student_name[index], student_img[index], student_phone[index], student_parent_phone[index]));
      }
      this.setState({ stuDataInit: temp });
      this.setState({ absent: temp });
      
    }
    );
    
  };
  

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
    
    axios.create({
      baseURL: IP,
      headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    }).get("/real")
    .then((response) => {
    })
    .catch((error) =>
    console.error(error)
    );
    
    this.setState({ start: true })
    this.setState({ end: false })

    let data = { fields: { class_id: {}, student_id: {}, attend_hw: {}} };
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
    this.setState({open: true})
  };


  handleYes = e => {
    // axios.create({
    //   baseURL: IP,
    //   headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    // }).get("/again")
    // .then((response) => {
    // })
    // .catch((error) =>
    // console.error(error)
    // );
    
    const formdata = new FormData();
        console.log(this.state.facepath)
        formdata.set('face_path', this.state.facepath);     
        formdata.set('faceid', this.state.stu_id);

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
          
    // let data = { fields: { class_id: {}, attend_date: {}, student_id: {}, attend_time: {} } };
    // data.fields.class_id = this.state.class_id;
    // data.fields.attend_date = this.state.face_time.split(" ")[0];
    // data.fields.student_id = this.state.stu_id;
    // data.fields.attend_time = (this.state.face_time.split(" ")[1]).split(":")[0] + ":" +
    //   (this.state.face_time.split(" ")[1]).split(":")[1];
    let data = { fields: { class_id: {}, student_id: {}, attend_hw: {}} };
    data.fields.class_id = this.state.class_id;
    data.fields.student_id = this.state.stu_id;
    data.fields.attend_hw = this.state.checkedFinish;

    fetchPostAttend(data);

    
    for(var i = 0; i < this.state.absent.length; i++){
      //console.log(this.state.absent);
      if(this.state.stu_id == this.state.absent[i].id){
        //delete this.state.absent[i];
        (this.state.absent).splice(i, 1);
      }
    }

  };

  handleNo = e => {
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
    //console.log(this.state.age);

  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  //取消結束點名
  handleNotEnd = e =>{
    this.setState({ open: false })
  }

  //真的結束點名
  handleRealEnd = e =>{
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

  //關Dialog
  handleClose = () => {
    this.setState({ open: false });
};

  render() {
    const { classes } = this.props;
    return (
      <div>

        <AppBar />
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

          <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle >是否結束點名？</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleNotEnd} color="primary">取消</Button>
                        <NavLink style={{textDecoration:'none'}} activeClassName="active" to={{pathname:'/late', aboutProps:{name:this.state.absent}}}>
                        <Button onClick={this.handleRealEnd} color="primary">確定</Button>
                        </NavLink>
                    </DialogActions>
                </Dialog>

        </div>


        {
          this.state.start === true ?
            <div className={classes.info}>
              <img className={classes.photo} src={this.state.stu_img} alt="location" />
              {this.state.checkedHomework === true ?
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
                </pre>
              <Button onClick={this.handleYes} className={classes.yes} >Yes</Button>
              <Button onClick={this.handleNo} className={classes.no}>NO</Button>
              {/* <Button ></Button> */}
              <Add className={classes.addIcon} onClick={this.handleClickAdd()}/>
              <TextField
                id="filled-with-placeholder"
                label="輸入學號"
                className={classes.textField}
                value={this.state.age}
                onChange={this.handleChange('age')}
                margin="normal"
                variant="filled"
              />
            </div> :
            <div></div>
        }


      </div>
    )
  }

}

export default withStyles(styles)(Rollcall);