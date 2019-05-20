import React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar, Toolbar, Button, InputBase,
    FormControl, Select, MenuItem,
    Dialog, DialogActions, DialogContent, DialogTitle,
    Input, IconButton,
    Snackbar, SnackbarContent
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from "react-router-dom";
import Airtable from 'airtable';
import classNames from 'classnames';

import pin from './pin.png';
import Drawer from '../Drawer/Drawer';

//icon
import SearchIcon from '@material-ui/icons/Search';
import Home from '@material-ui/icons/HomeRounded';
import LogoutIcon from '@material-ui/icons/DirectionsWalkOutlined';
import Face from '@material-ui/icons/FaceOutlined';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

import axios from 'axios';

const base = new Airtable({ apiKey: 'keyA7EKdngjou4Dgy' }).base('appcXtOTPnE4QWIIt');
const TABLE_NAME = 'Student';
const table = base(TABLE_NAME);
const IP = "http://localhost:8080";

// this.Axios = axios.create({
//         baseURL: IP,
//         headers:{'content-type':'application/json','Access-Control-Allow-Origin':'*'}
//       });


const variantIcon = {
    warning: InfoIcon,
};
//snackBar
const styles1 = theme => ({
    warning: {
        backgroundColor: '#FFBF5F',
    },
    check: {
        fontSize: 20,
        color: '#111B24',
    },
    close: {
        fontSize: 20,
        color: '#111B24',
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        color: '#111B24',
    },
});

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
    const {stu_id}=props;
    console.log(props);
    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            message={
                <span className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={onClose}
                >
                    <NavLink className={classes.check}style={{ textDecoration: 'none' }} 
                    activeClassName="active" to={{pathname:'/student', 
                    aboutProps:{name:stu_id}}}>
                        <CheckIcon />
                    </NavLink>
                </IconButton>,
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={onClose}
                >
                    <CloseIcon className={classes.close} />
                </IconButton>
            ]}
            {...other}
        />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);


//Appbar
const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 6,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },

    button: {
        color: "white",
    },

    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 5,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 90,
            '&:focus': {
                width: 120,
            },
        },
    },

    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

class SearchAppBar extends React.Component {

    state = {
        open: false,
        openSnack: false,
        classData: [],
        data: '',
        finalValue: '',
        stu_id: '',
        stu_name: '',
        face_id: '',
    };


    componentDidUpdate(prevProps){
        if (this.state.face_id !== prevProps.face_id && this.state.openSnack===true) {
            console.log(this.state.face_id);
            console.log(prevProps.face_id);
        axios.create({
            baseURL: IP,
            headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        }).get("/real")
            .then((response) => {
            var face_id = response.data.split("!")[0];
            //console.log("in real");
            //console.log(response.data);
            this.setState({ face_id: face_id });
            //console.log("faceid is " + this.state.face_id);
            const fileterSentence = 'AND(student_id = ' + this.state.face_id + ')'
            table.select({
              filterByFormula: fileterSentence,
              view: "Grid view",
              //maxRecords: 1
            }).eachPage((records, fetchNextPage) => {
              this.setState({ records });
    
              const student_name = this.state.records.map((record, index) => record.fields['student_name']);
              const student_id = this.state.records.map((record, index) => record.fields['student_id']);
    
              this.setState({ stu_id: student_id, stu_name: student_name });

    

          })
        })
          .catch((error) =>
            console.error(error)
          );
        }
      }

    componentDidMount() {
        base('ClassRoom').select({ view: 'Grid view' })
            .eachPage(
                (records, fetchNextPage) => {
                    this.setState({ records });
                    console.log(records);
                    const class_area = this.state.records.map((record, index) => record.fields['class_area']);
                    var count = class_area.length;
                    var temp = [];
                    var temp2 = [];
                    for (var index = 0; index < count; index++) {
                        temp.push(class_area[index]);
                    }

                    var classResult = temp.filter(function (element, index, arr) {
                        return arr.indexOf(element) === index;
                    });

                    for (index = 0; index < classResult.length; index++) {
                        temp2.push(classResult[index]);
                    }
                    this.setState({ classData: temp2 });

                    fetchNextPage();
                }
            );

    }

    //select
    handleChange = event => {
        this.setState({ data: event.target.value });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };



    //snack
    handleClickSnack = () => {
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
              this.setState({ face_id: response.data });
              console.log("faceid is " + this.state.face_id);
              const fileterSentence = 'AND(student_id = ' + this.state.face_id + ')'
              table.select({
                filterByFormula: fileterSentence,
                view: "Grid view",
                //maxRecords: 1
              }).eachPage((records, fetchNextPage) => {
                this.setState({ records });
      
                const student_name = this.state.records.map((record, index) => record.fields['student_name']);
                const student_id = this.state.records.map((record, index) => record.fields['student_id']);
      
                this.setState({ stu_id: student_id, stu_name: student_name});
      
              }
              );
      
            })
            .catch((error) =>
              console.error(error)
            );
        this.setState({ openSnack: true });
    };

    handleCloseSnack = () => {
        axios.create({
            baseURL: IP,
            headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
          }).get("/terminate")
        this.setState({ openSnack: false });
    };

    handleSubmit = () => {
        this.setState({ finalValue: this.state.data });
        this.props.callbackFromParent(this.state.data);
        this.setState({ open: false });
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
    handleMerge = () => {
        axios.create({
            baseURL: IP,
            headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        }).post("/merge")
            .then((response) => {
                console.log("merge");
            })
            .catch((error) =>
                console.error(error)
            );
    }


    render() {

        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" style={{ backgroundColor: '#111B24' }}>
                    <Toolbar>
                        {/* <SideBarIcon className={classes.menuButton} onClick={this.toggleDrawer('left', true)} /> */}
                        <Drawer />
                        <img src={pin} height="26" alt="location"></img>
                        {/* <Selector /> */}
                        {/* 校區選擇 */}
                        <div>
                            <Button onClick={this.handleClickOpen}>{this.state.finalValue || '校區選擇'}</Button>
                            <Dialog
                                disableBackdropClick
                                disableEscapeKeyDown
                                open={this.state.open}
                                onClose={this.handleClose}
                            >
                                <DialogTitle>選擇校區</DialogTitle>
                                <DialogContent>
                                    <form className={classes.container}>
                                        <FormControl className={classes.formControl}>
                                            <Select
                                                value={this.state.data}
                                                onChange={this.handleChange}
                                                input={<Input id="area-simple" />}
                                            >
                                                <MenuItem value="">
                                                    <em>校區</em>
                                                </MenuItem>
                                                {(this.state.classData).map((n, index) => {
                                                    return (
                                                        <MenuItem key={index} value={n}>{n}</MenuItem>
                                                    );
                                                })}
                                                {/* <MenuItem value={10}>北投校區</MenuItem>
                                                <MenuItem value={20}>士林校區</MenuItem>
                                                <MenuItem value={30}>南港校區</MenuItem> */}
                                            </Select>
                                        </FormControl>
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={this.handleSubmit} color="primary">
                                        Ok
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        {/* 校區選擇 */}
                        <NavLink activeClassName="active" to="/">
                            <Button className={classes.button}><Home /></Button></NavLink>
                        {/* 點名button */}
                        <Button className={classes.button} onClick={this.handleClickSnack}><Face /></Button>
                        {/* Merege button */}
                        <Button className={classes.button} onClick={this.handleMerge}><Home /></Button>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={this.state.openSnack}
                            // autoHideDuration={2000}
                            onClose={this.handleCloseSnack}
                        >
                            <MySnackbarContentWrapper

                                onClose={this.handleCloseSnack}
                                variant="warning"
                                message={"學生："+this.state.stu_name+" 學號："+this.state.stu_id}
                                {...this.state}
                            />
                        </Snackbar>
                        <NavLink style={{ textDecoration: 'none' }} activeClassName="active" to="/login">
                            <Button className={classes.button}>
                                <LogoutIcon className={classes.rightIcon} />
                                Log out
                            </Button>
                        </NavLink>
                        <div className={classes.grow} />
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="學號查詢…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}


SearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchAppBar);