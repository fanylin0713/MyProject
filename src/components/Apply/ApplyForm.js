import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Myclass from './ApplyFormClass';
import { Card, Button } from '@material-ui/core';
import CameraIcon from '@material-ui/icons/CameraAltRounded';
import { fetchPostStudent, fetchPostClassMember } from '../../api';
import axios from 'axios';
const IP = "http://192.168.79.1:8080";

const styles = theme => ({
    container: {
        color: 'white',

    },
    textFieldLeft: {
        marginLeft: theme.spacing.unit * 18,
        marginTop: theme.spacing.unit * 2,
        color: 'white',
        width: '260px',
    },
    textFieldRight: {
        marginLeft: theme.spacing.unit * 6,
        marginTop: theme.spacing.unit * 2,
        color: 'white',
        width: '260px',
    },
    textFieldFull: {
        marginLeft: theme.spacing.unit * 18,
        marginTop: theme.spacing.unit * 2,
        color: 'white',
        width: '570px',
    },
    button: {
        display: 'flex',
        border: '1px #FFBF5F solid',
        borderRadius: '30px',
        color: '#FFBF5F',
        margin: 'auto',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class OutlinedTextFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            class_id: null,
            student_name: '',
            student_id: '',
            student_grade: '',
            student_phone: '',
            student_birth: '1998-07-13',
            student_school: '',
            student_email: '',
            student_parent: '',
            student_parent_phone: '',
            student_address: '',
            error1: false,
            error2: false,
            errorMessage1: '',
            errorMessage2: '',
        };
    }
    //https://medium.com/@ruthmpardee/passing-data-between-react-components-103ad82ebd17
    myCallback = (dataFromChild) => {
        this.setState({ class_id: dataFromChild });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
        //console.log(this.state);
    };


    handleSubmit = (e) => {
        e.preventDefault()

        console.log(this.state);
        // changed here
        //let data = {fields:{student_name:{},student_id:{},student_grade:{},student_phone:{},student_birth:{}}};
        let data = { fields: { student_name: {}, student_id: {}, student_grade: {}, student_phone: {}, student_birth: {}, student_school: {}, student_email: {}, student_parent: {}, student_parent_phone: {}, student_address: {} } };
        data.fields.student_name = this.state.student_name;
        data.fields.student_id = this.state.student_id;
        data.fields.student_grade = this.state.student_grade;
        data.fields.student_phone = this.state.student_phone;
        data.fields.student_birth = this.state.student_birth;
        data.fields.student_school = this.state.student_school;
        data.fields.student_email = this.state.student_email;
        data.fields.student_parent = this.state.student_parent;
        data.fields.student_parent_phone = this.state.student_parent_phone;
        data.fields.student_address = this.state.student_address;
        console.log(data);
        if (this.state.student_name !== '' && this.state.student_id !== '') {
            fetchPostStudent(data);
            let memberData = { fields: { class_id: {}, student_id: {} } };
            //memberData.fields = this.state.class_id + this.state.student_name;
            var count = this.state.class_id.length;
            for (var index = 0; index < count; index++) {
                memberData.fields.student_id = this.state.student_id
                memberData.fields.class_id = this.state.class_id[index]
            }
            fetchPostClassMember(memberData);
            console.log('hey')
            console.log(this.state.student_id)
            console.log(this.state.student_name)
        }
        else{
            if(this.state.student_name === ''){
                this.setState({error1: true ,errorMessage1:'*此欄位必填'})
            }
            else if(this.state.student_id === ''){
                this.setState({error2: true,errorMessage2:'*此欄位必填'})
            }
            console.log('hi')
        }


        //train
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


    };

    handleClick = () => {
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
    }



    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        const { error1, error2 , errorMessage1, errorMessage2 } = this.state
        const { classes } = this.props;

        return (
            <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
                <div>
                    <Card style={{ width: '200px', height: '260px', margin: '40px auto' }} />
                    <Button className={classes.button} onClick={this.handleClick}>
                        Open Camera
                    <CameraIcon className={classes.rightIcon} />
                    </Button>
                    <Button className={classes.button}>
                        Train
                    </Button>
                </div>
                <div>
                    <TextField
                        id="outlined-helperText"
                        label="姓名"
                        value={this.state.name}
                        error={error1}
                        helperText={errorMessage1}
                        onChange={this.handleChange('student_name')}
                        className={classes.textFieldLeft}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-helperText"
                        label="學號"
                        value={this.state.number}
                        error={error2}
                        helperText={errorMessage2}
                        onChange={this.handleChange('student_id')}
                        className={classes.textFieldRight}
                        margin="normal"
                        variant="outlined"
                        placeholder="Placeholder"
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-name"
                        label="年級"
                        value={this.state.grade}
                        onChange={this.handleChange('student_grade')}
                        className={classes.textFieldLeft}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="date"
                        label="生日"
                        type="date"
                        value={this.state.student_birth}
                        onChange={this.handleChange('student_birth')}
                        className={classes.textFieldRight}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div>
                    <Myclass callbackFromParent={this.myCallback} />
                </div>
                <div>
                    <TextField
                        id="outlined-name"
                        label="學校"
                        value={this.state.school}
                        onChange={this.handleChange('student_school')}
                        className={classes.textFieldLeft}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="手機"
                        value={this.state.phone}
                        onChange={this.handleChange('student_phone')}
                        className={classes.textFieldRight}
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-email-input"
                        label="Email"
                        value={this.state.email}
                        onChange={this.handleChange('student_email')}
                        className={classes.textFieldFull}
                        type="email"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-name"
                        label="住址"
                        value={this.state.address}
                        onChange={this.handleChange('student_address')}
                        className={classes.textFieldFull}
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-name"
                        label="聯絡人"
                        value={this.state.parent}
                        onChange={this.handleChange('student_parent')}
                        className={classes.textFieldLeft}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="聯絡人手機"
                        value={this.state.parentPhone}
                        onChange={this.handleChange('student_parent_phone')}
                        className={classes.textFieldRight}
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <Button type="submit" className={classes.button} style={{ width: 300, margin: '20px auto', }}>
                    送出
                </Button>
            </form>
        );
    }
}

OutlinedTextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);
