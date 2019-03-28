import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Myclass from './Myclass';
import { Card, Button } from '@material-ui/core';
import CameraIcon from '@material-ui/icons/CameraAltRounded';

const styles = theme => ({
    container: {
        color: 'white',

    },
    textFieldLeft: {
        marginLeft: theme.spacing.unit * 18,
        marginTop:theme.spacing.unit * 2,
        color: 'white',
        width: '260px',
    },
    textFieldRight: {
        marginLeft: theme.spacing.unit * 6,
        marginTop:theme.spacing.unit * 2,
        color: 'white',
        width: '260px',
    },
    textFieldFull: {
        marginLeft: theme.spacing.unit * 18,
        marginTop:theme.spacing.unit * 2,
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

    state = {
        name: '',
        number: '',
        grade: '',
        birthday: '1998-07-13',
        class: '',
        school: '',
        phone: '',
        email: '',
        address: '',
        parent: '',
        parentPhone: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <div>
                    <Card style={{ width: '200px', height: '260px', margin: '40px auto' }} />
                    <Button className={classes.button}>
                        Train
                    <CameraIcon className={classes.rightIcon} />
                    </Button>
                </div>
                <div>
                    <TextField
                        id="outlined-helperText"
                        label="姓名"
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        className={classes.textFieldLeft}
                        helperText="*Required"
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-helperText"
                        label="學號"
                        value={this.state.number}
                        onChange={this.handleChange('number')}
                        className={classes.textFieldRight}
                        helperText="*Required"
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
                        onChange={this.handleChange('grade')}
                        className={classes.textFieldLeft}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="date"
                        label="生日"
                        type="date"
                        value={this.state.birthday}
                        onChange={this.handleChange('birthday')}
                        className={classes.textFieldRight}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div>
                    <Myclass />
                </div>
                <div>
                    <TextField
                        id="outlined-name"
                        label="學校"
                        value={this.state.school}
                        onChange={this.handleChange('school')}
                        className={classes.textFieldLeft}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="手機"
                        value={this.state.phone}
                        onChange={this.handleChange('phone')}
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
                        onChange={this.handleChange('email')}
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
                        onChange={this.handleChange('address')}
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
                        onChange={this.handleChange('parent')}
                        className={classes.textFieldLeft}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="聯絡人手機"
                        value={this.state.parentPhone}
                        onChange={this.handleChange('parentPhone')}
                        className={classes.textFieldRight}
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <Button className={classes.button} style={{width:300,margin:'20px auto',}}>
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
