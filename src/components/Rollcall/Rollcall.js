import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../AppBar/Appbar';
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  Typography,
  TextField
} from '@material-ui/core';
import { Button } from '@material-ui/core';

import Add from '@material-ui/icons/AddBoxOutlined';

import Rabbit from './rabbit.jpg';
import axios from 'axios';
import Airtable from 'airtable';

const TABLE_NAME = 'Student';
const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const table = base(TABLE_NAME);

const IP = "http://localhost:8080";

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
    marginLeft: '20%',
  },
  formControl: {
    margin: 'auto 0',
    marginLeft: '13%',
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
    marginLeft: '35%',
    marginTop: theme.spacing.unit * 5,
  },
  textField: {

  },
  addIcon: {
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
  yes:{
    backgroundColor:'green',
  },
  no:{
    backgroundColor:'red',
  }
});

class Rollcall extends React.Component {
  // props = {
  //   face_id:'',
  // }

  state = {
    value: '',
    nowClass: '',
    start: false,
    end: true,
    stu_id:'',
    stu_name:'',
    stu_img:'',
    face_id:'',
  };
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.face_id !== this.state.face_id) {

//         // var count = this.state.dataInit.length;
//         // var temp = [];
//         // for (var index = 0; index < count; index++) {
//         //     if (nextProps.listNameFromParent === this.state.dataInit[index].area) {
//         //         temp.push(this.state.dataInit[index]);
//         //         this.setState({ data: temp });
//         //     }
//         // }
//         this.setState({ face_id: nextProps.face_id });
//     }
// }

  // componentDidMount() {
  //   //console.log();
  //   table.select({
  //     filterByFormula: 'AND(student_id = 405401152)',
  //     view: "Grid view",
  //     maxRecords: 1
  //     }).eachPage((records, fetchNextPage) => {
  //       this.setState({records});

  //       //const class_id = this.state.records.map((record, index) => record.fields['class_id']);
  //       const student_name = this.state.records.map((record, index) => record.fields['student_name']);
  //       const student_id = this.state.records.map((record, index) => record.fields['student_id']);
  //       const student_img = this.state.records.map((record, index) => record.fields['student_img'][0].url); 


  //       this.setState({ stu_id : student_id, stu_name : student_name, stu_img : student_img });
  //       fetchNextPage(); 
  //     }
  //     );
  // }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

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
            console.log("in real");
            console.log(response.data);
            this.setState({face_id : response.data});
            console.log( "faceid is "+this.state.face_id);
            const fileterSentence = 'AND(student_id = ' + this.state.face_id + ')'
            table.select({
              filterByFormula: fileterSentence,
              view: "Grid view",
            //maxRecords: 1
            }).eachPage((records, fetchNextPage) => {
              this.setState({records});
        
                
              const student_name = this.state.records.map((record, index) => record.fields['student_name']);
              const student_id = this.state.records.map((record, index) => record.fields['student_id']);
              const student_img = this.state.records.map((record, index) => record.fields['student_img'][0].url); 
        
        
              this.setState({ stu_id : student_id, stu_name : student_name, stu_img : student_img });
        
            }
            );

        })
        .catch((error) =>
            console.error(error)
        );

       
        // console.log( "faceid is "+this.state.face_id);
        // table.select({
        // filterByFormula: 'AND(student_id = ' + this.state.face_id + ")",
        // view: "Grid view",
        // //maxRecords: 1
        // }).eachPage((records, fetchNextPage) => {
        //   this.setState({records});
    
            
        //   const student_name = this.state.records.map((record, index) => record.fields['student_name']);
        //   const student_id = this.state.records.map((record, index) => record.fields['student_id']);
        //   const student_img = this.state.records.map((record, index) => record.fields['student_img'][0].url); 
    
    
        //   this.setState({ stu_id : student_id, stu_name : student_name, stu_img : student_img });
    
        // }
        // );
      
    

    this.setState({ start: true})
    this.setState({ end: false})
  };



  handleClickAdd = name => e => {
  }

  handleEnd = e => {
    this.setState({ start: false})
    this.setState({ end: true})
  };


  handleYes = e => {
    axios.create({
      baseURL: IP,
      headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    }).get("/real")
    
      .then((response) => {
          console.log("in real");
          console.log(response.data);
          this.setState({face_id : response.data});
      })
      .catch((error) =>
          console.error(error)
      );
 
  };

  handleNo = e => {
  };

  handleClickAdd = name => e => {
  }

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
              onChange={this.handleChange('nowClass')}
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
              <MenuItem value={10}>英文Ａ班</MenuItem>
              <MenuItem value={20}>數學Ａ班</MenuItem>
              <MenuItem value={30}>國文Ｂ班</MenuItem>
            </Select>
          </FormControl>

          <Button disabled={this.state.start} className={classes.buttonStart} onClick={this.handleStart}>開始點名</Button>
          <Button disabled={this.state.end} className={classes.buttonEnd} onClick={this.handleEnd}>結束點名</Button>

        </div>

        <div className={classes.info}>
          <img className={classes.photo} src={this.state.stu_img} alt="location" />
          <pre><Typography className={classes.studentInfo}>姓名：{this.state.stu_name}     學號：{this.state.stu_id} </Typography></pre>
          
          <TextField
            id="filled-with-placeholder"
            label="輸入學號"
            className={classes.textField}
            margin="normal"
            variant="filled"
          />
          <Add className={classes.addIcon} onClick={this.handleClickAdd} />
          <Button onClick={this.handleYes} className={classes.yes} >Yes</Button>
          <Button onClick={this.handleNo} className={classes.no}>NO</Button>
        </div>
      </div>
    )
  }

}

export default withStyles(styles)(Rollcall);